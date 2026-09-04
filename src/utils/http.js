import axios from "axios";
import { apis, baseURL } from "./URL";
import { clearSession, getToken, getUserId, setSession } from "./session";

// Send the refresh cookie with our own API calls, never with third-party ones.
const isOwnApi = (url = "") => url.startsWith(baseURL);

axios.interceptors.request.use((config) => {
  if (!isOwnApi(config.url || "")) return config;

  config.withCredentials = true;

  const token = getToken();
  config.headers = {
    ...(config.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return config;
});

// Ends the session only when a live one actually died. A 401 on a visitor who
// was never signed in is normal — the privacy policy, the terms page and the
// account-deletion link from the confirmation email are all public.
//
// Clearing the session is the whole job. ProtectedRoute subscribes to it and
// swaps in the login screen at the current URL, so there is no navigation and
// the address bar keeps pointing at the page the user was on. Sending the
// browser to /login instead rewrote the URL on every reload and lost the deep
// link the user had open.
const endSession = () => {
  if (!getToken()) return;
  clearSession();
};

// Single-flight refresh so a burst of expired calls triggers one rotation.
let refreshPromise = null;

// Resolves to { token, rejected }. `rejected` is true only when the backend
// actively refused the refresh token (expired, revoked, rotated away) — that is
// the one case that ends the session. A 429 from the auth rate limiter, a 5xx
// or a dead connection leaves `rejected` false: the refresh token is still
// valid, so the user keeps their session and the next call retries.
export const refreshAccessToken = async () => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = axios
    .post(apis.refreshToken, {}, { withCredentials: true, _skipAuthRefresh: true })
    .then((res) => {
      const token = res?.data?.token;
      if (!token) return { token: null, rejected: true };
      setSession({ token });
      return { token, rejected: false };
    })
    .catch((err) => {
      const status = err?.response?.status;
      return { token: null, rejected: status === 401 || status === 403 };
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error?.config;
    const status = error?.response?.status;
    const code = error?.response?.data?.code;

    if (
      status === 401 &&
      code === "TOKEN_EXPIRED" &&
      original &&
      !original._retried &&
      !original._skipAuthRefresh
    ) {
      original._retried = true;
      const { token, rejected } = await refreshAccessToken();
      if (token) {
        original.headers = {
          ...(original.headers || {}),
          Authorization: `Bearer ${token}`,
        };
        return axios(original);
      }
      // Only a refused refresh token ends the session. A rate-limited or
      // unreachable refresh must not log the user out.
      if (rejected) endSession();
      return Promise.reject(error);
    }

    // Missing, revoked or tampered token: the session is over.
    if (status === 401 && !original?._skipAuthRefresh) {
      endSession();
    }

    return Promise.reject(error);
  }
);

// Called once on boot: turns the refresh cookie back into an access token so a
// page reload does not log the user out.
//
// The refresh cookie is httpOnly and cannot be read here, so the stored user id
// is used as the hint that a session is worth restoring. Without it, a visitor
// on a public page would spend a slot of the backend's strict auth rate limit
// on a refresh that cannot succeed — enough of those and the genuine call that
// follows (an account-deletion confirmation, a login) comes back 429.
export const bootstrapSession = async () => {
  if (!getUserId()) return false;
  const { token } = await refreshAccessToken();
  return !!token;
};

// A failed request has no `response` when the browser refused the connection
// (server down, CORS rejected, TLS certificate not trusted). Reading
// `error.response.data` in that case throws inside the catch block and the
// user is left with a silent screen, so always go through this.
export const errorMessage = (error, fallback = "Something went wrong") => {
  if (error?.response) return error.response.data?.message || fallback;
  if (error?.code === "ECONNABORTED") return "The server took too long to respond.";
  return "Cannot reach the server. Check your connection and try again.";
};

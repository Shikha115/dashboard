// Dashboard session state.
//
// The access token is held in memory only: anything in localStorage is
// readable by any XSS on the page. The refresh token lives in an httpOnly
// cookie the JavaScript here cannot touch, and is what survives a reload.

let accessToken = null;
let userId = null;

const listeners = new Set();

const notify = () => listeners.forEach((fn) => fn(!!accessToken));

export const onAuthChange = (fn) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const getToken = () => accessToken;
export const getUserId = () => userId || localStorage.getItem("id");
export const isAuthenticated = () => !!accessToken;

export const setSession = ({ token, id }) => {
  accessToken = token || null;
  if (id) {
    userId = id;
    // Not a credential: just which profile to load after a refresh.
    localStorage.setItem("id", id);
  }
  notify();
};

export const clearSession = () => {
  accessToken = null;
  userId = null;
  localStorage.removeItem("id");
  // Remove the pre-hardening token if an old build left one behind.
  localStorage.removeItem("token");
  notify();
};

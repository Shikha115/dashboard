import axios from "axios";
import { create } from "zustand";
import { apis } from "../utils/URL";
import { clearSession, getUserId } from "../utils/session";

const useAuthStore = create((set) => ({
  token: "",
  setToken: (data) => set({ token: data }),

  // False until the boot-time refresh call has resolved.
  authChecked: false,
  setAuthChecked: (data) => set({ authChecked: data }),

  showToast: false,
  setShowToast: (data) => set({ showToast: data }),

  toastData: { color: "#33b0e0", message: "Welcome" },
  setToastData: (data) => set({ toastData: data }),

  theme: "light",
  setTheme: (data) => {
    localStorage.setItem("theme", JSON.stringify(data));
    set({ theme: data });
  },
  getTheme: () => {
    const items = JSON.parse(localStorage.getItem("theme"));
    set({ theme: items });
  },

  loading: true,
  setLoading: (data) => set({ loading: data }),

  currentPath: "",
  setCurrentPath: (data) => set({ currentPath: data }),

  defaultSidebar: "default",
  setDefaultSidebar: (data) => set({ defaultSidebar: data }),

  profile: {},
  getProfileWeb: async () => {
    const id = getUserId();

    // The axios interceptor attaches the bearer token and handles refresh and
    // logout on 401, so no token juggling is needed here.
    return axios
      .post(apis.getProfileWeb, { id })
      .then((e) => {
        set({ profile: e.data.data, loading: false });
      })
      .catch((err) => {
        set({ loading: false });
        if (err?.response?.status === 401) {
          clearSession();
        }
      });
  },

  // Called on logout. Theme and sidebar are UI preferences, not session data,
  // so they survive. authChecked stays true: the session state is known (logged
  // out), and flipping it back would leave ProtectedRoute stuck on the loader.
  reset: () =>
    set({
      token: "",
      profile: {},
      currentPath: "",
      loading: false,
      authChecked: true,
    }),
}));

export default useAuthStore;

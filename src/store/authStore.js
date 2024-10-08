import axios from "axios";
import { create } from "zustand";
import { apis, config } from "../utils/URL";

const useAuthStore = create((set) => ({
  token: "",
  setToken: (data) => set({ token: data }),

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
    let token = localStorage.getItem("token");
    let id = localStorage.getItem("id");

    axios
      .post(apis.getProfileWeb, { id }, config(token))
      .then((e) => {
        set({ profile: e.data.data, loading: false });
      })
      .catch((err) => {
        console.log(err.response.data.message);

        if (
          err.response.data.message === "Access denied!!!. No token provided" ||
          err.response.data.message === "Invalid token!!!!"
        ) {
          localStorage.removeItem("token");
        }
      });
  },
}));

export default useAuthStore;

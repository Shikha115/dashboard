import axios from "axios";
import { create } from "zustand";
import { apis, config } from "../utils/URL";

const useAuthStore = create((set) => ({
  token: "",
  setToken: (data) => set({ token: data }),
  showToast: false,
  setShowToast: (data) => set({ showToast: data }),
  toastData: { color: "#33b0e0", message: "Default message" },
  setToastData: (data) => set({ toastData: data }),
  loading: true,
  setLoading: (data) => set({ loading: data }),
  profile: {},
  getProfileWeb: async () => {
    let token = await localStorage.getItem("token");
    let id = await localStorage.getItem("id");

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

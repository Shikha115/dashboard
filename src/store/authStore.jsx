import axios from "axios";
import { create } from "zustand";
import { apis } from "../utils/URL";

const useAuthStore = create((set) => ({
  token: "",
  setToken: (data) => set({ token: data }),
  getToken: async (data) => {
    await axios
      .post(apis.login, data)
      .then((e) => {
        console.log(e);
      })
      .catch((err) => console.log(err));
  },
}));

export default useAuthStore;

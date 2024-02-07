import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: "",
  setToken: (data) => set({ token: data }),
}));

export default useAuthStore;

import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: "",
  setToken: (data) => set({ token: data }),
  loading: true,
  setLoading: (data) => set({ loading: data }),
}));

export default useAuthStore;

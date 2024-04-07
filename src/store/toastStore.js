import { create } from "zustand";
const DATA = { color: "#33b0e0", message: "Welcome" };
const useToastStore = create((set) => ({
  showToast: false,
  setShowToast: (data) => set({ showToast: data }),
  toastData: DATA,
  setToastData: (data) => set({ toastData: { ...DATA, ...data } }),
}));

export default useToastStore;

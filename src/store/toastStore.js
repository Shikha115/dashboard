import { create } from "zustand";
const DATA = { color: "#33b0e0", message: "" };
const useToastStore = create((set) => ({
  showToast: false,
  setShowToast: (data) => set({ showToast: data }),
  toastData: DATA,
  setToastData: (data) => set({ toastData: { ...DATA, ...data } }),
}));

export default useToastStore;

// red = #d03f3f
//green = #47ad77
//yellow = #edc755

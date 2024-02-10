import { create } from "zustand";

const useDataStore = create((set) => ({
  bank: "",
  setBank: (data) => set({ bank: data }),
  credit: "",
  setCredit: (data) => set({ credit: data }),
}));

export default useDataStore;

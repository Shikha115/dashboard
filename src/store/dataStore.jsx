import { create } from "zustand";

const useDataStore = create((set) => ({
  bank: "",
  setBank: (data) => set({ bank: data }),
  credit: "",
  setCredit: (data) => set({ credit: data }),
  saving: "",
  setSaving: (data) => set({ saving: data }),
  loan: "",
  setLoan: (data) => set({ loan: data }),
  lead: "",
  setLead: (data) => set({ lead: data }),
}));

export default useDataStore;

import axios from "axios";
import { create } from "zustand";
import { apis } from "../utils/URL";

const useDataStore = create((set) => ({
  bank: "",
  setBank: (data) => set({ bank: data }),
  getAllBank: async () => {
    const res = await axios.get(apis.getAllBanks);
    console.log(res.data?.data);
    set({ bank: res.data?.data });
  },
  allOffer: [],
  getAllOffer: async () => {
    const res = await axios.get(apis.getallOffers);
    console.log(res.data?.data);
    set({ allOffer: res.data?.data });
    set({
      credit: res.data?.data.filter((item) => (item.type = "credit_card")),
    });
  },
  credit: "",
  setCredit: (data) => set({ credit: data }),
  saving: "",
  setSaving: (data) => set({ saving: data }),
  loan: "",
  setLoan: (data) => set({ loan: data }),
  lead: "",
  setLead: (data) => set({ lead: data }),
  mutualFund: "",
  setMutualFund: (data) => set({ mutualFund: data }),
  demat: "",
  setDemat: (data) => set({ demat: data }),
  fixedDeposit: "",
  setFixedDeposit: (data) => set({ fixedDeposit: data }),
  users: "",
  setUsers: (data) => set({ users: data }),
}));

export default useDataStore;

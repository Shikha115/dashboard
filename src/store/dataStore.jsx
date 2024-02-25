import axios from "axios";
import { create } from "zustand";
import { apis } from "../utils/URL";

const useDataStore = create((set) => ({
  bank: [],
  allOffer: [],
  credit: [],
  saving: [],
  loan: [],
  lead: [],
  demat: [],
  fixedDeposit: [],
  mutualFund: [],
  selectedUser: {},
  users: [],
  category: [],

  setBank: (data) => set({ bank: data }),
  getAllBank: async () => {
    const res = await axios.get(apis.getAllBanks);
    set({ bank: res.data?.data });
  },

  setCategory: (data) => set({ category: data }),
  getAllCategory: async () => {
    const res = await axios.get(apis.getCategories);
    set({ category: res.data?.data });
  },

  getAllOffer: async () => {
    const res = await axios.get(apis.getallOffers);
    set({ allOffer: res.data?.data });
    set({
      credit: res.data?.data.filter((item) => (item.type = "credit_card")),
    });
  },

  setCredit: (data) => set({ credit: data }),
  setSaving: (data) => set({ saving: data }),
  setLoan: (data) => set({ loan: data }),

  setLead: (data) => set({ lead: data }),
  getAlLeads: async () => {
    const res = await axios.get(apis.getAllLeads);
    console.log(res.data?.data);
    set({ lead: res.data?.data });
  },

  setMutualFund: (data) => set({ mutualFund: data }),
  setDemat: (data) => set({ demat: data }),
  setFixedDeposit: (data) => set({ fixedDeposit: data }),
  setUsers: (data) => set({ users: data }),
  getAllUsers: async () => {
    const res = await axios.get(apis.getAllLUsers);
    set({ users: res.data?.data });
  },

  setSelectedUser: (data) => {
    set({ selectedUser: data });
  },
}));

export default useDataStore;

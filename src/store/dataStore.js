import axios from "axios";
import { create } from "zustand";
import { apis } from "../utils/URL";

const useDataStore = create((set, getState) => ({
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
  isLoading: true,
  setIsLoading: (data) => set({ isLoading: data }),

  setBank: (data) => set({ bank: data }),
  getAllBank: async (override) => {
    if (getState()?.bank.length > 1 && !override) {
      return;
    }
    const res = await axios.get(apis.getAllBanks);
    set({ bank: res.data?.data, isLoading: false });
  },

  setCategory: (data) => set({ category: data }),
  getAllCategory: async () => {
    const res = await axios.get(apis.getCategories);
    set({ category: res.data?.data });
  },

  getAllOffer: async () => {
    const res = await axios.get(apis.getallOffers);
    set({ allOffer: res.data?.data });
  },

  getCredit: async () => {
    const res = await axios.post(apis.getSpecificOffer, {
      id: "65c4bb05058cfc0846d4685c",
    });
    set({ credit: res.data?.data });
  },
  setCredit: (data) => set({ credit: data }),

  getSaving: async () => {
    const res = await axios.post(apis.getSpecificOffer, {
      id: "65c4bb05058cfc0846d4685d",
    });
    set({ saving: res.data?.data });
  },
  setSaving: (data) => set({ saving: data }),

  setLoan: (data) => set({ loan: data }),

  setLead: (data) => set({ lead: data }),
  getAlLeads: async () => {
    const res = await axios.get(apis.getAllLeads);
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

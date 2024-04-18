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
  banner: [],
  templates: [],

  setIsLoading: (data) => set({ isLoading: data }),

  setBank: (data) => set({ bank: data }),
  getAllBank: async (override) => {
    if (getState()?.bank.length > 1 && !override) {
      return;
    }
    const res = await axios.get(apis.getAllBanks);
    set({ bank: res.data?.data, isLoading: false });
  },

  getTemplates: async () => {
    const res = await axios.get(apis.getAllTemplates);
    set({ templates: res.data?.data });
  },

  getBanks: async () => {
    const res = await axios.get(apis.getAllBanks);
    set({ bank: res.data?.data, isLoading: false });
  },

  setCategory: (data) => set({ category: data }),
  getAllCategory: async () => {
    const res = await axios.get(apis.getCategories);
    res?.data?.data.sort((a, b) => a?.rank - b?.rank);
    set({ category: res.data?.data });
  },

  getCategory: async (id) => {
    const res = await axios.get(apis.getCategoryById + "/" + id);
    return res.data.data;
  },

  getAllOffer: async (status = false) => {
    const res = await axios.get(apis.getallOffers);
    let data = res?.data?.data;
    if (status) {
      data = data.filter((e) => e.status);
    }
    set({ allOffer: data });
  },

  getOfferbyId: async (id) => {
    const res = await axios.post(apis.getSpecificOffer, {
      id,
    });
    set({ allOffer: res.data?.data });
  },

  setLead: (data) => set({ lead: data }),
  getAlLeads: async () => {
    const res = await axios.get(apis.getAllLeads);
    set({ lead: res.data?.data });
  },
  getAllBanners: async () => {
    const res = await axios.post(apis.getAllBanners);
    set({ banner: res.data?.data });
  },

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

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
  allOrders: [],
  banner: [],
  sponsor: [],
  templates: [],
  tutorials: [],

  setIsLoading: (data) => set({ isLoading: data }),

  setBank: (data) => set({ bank: data }),
  getAllBank: async (override = false) => {
    if (getState().bank.length > 1 && !override) return;
    const res = await axios.get(apis.getAllBanks);
    set({ bank: res.data?.data, isLoading: false });
  },

  getTemplates: async () => {
    const res = await axios.get(apis.getAllTemplates);
    set({ templates: res.data?.data });
  },

  setCategory: (data) => set({ category: data }),
  getAllCategory: async () => {
    try {
      const res = await axios.get(apis.getCategories);
      const list = Array.isArray(res?.data?.data) ? [...res.data.data] : [];
      list.sort((a, b) => a?.rank - b?.rank);
      set({ category: list });
    } catch (err) {
      // The sidebar renders empty rather than taking the app down: this runs
      // fire-and-forget on boot and right after login, so a throw here would
      // surface as an unhandled rejection with no UI to catch it.
      set({ category: [] });
    }
  },

  getCategory: async (id) => {
    const res = await axios.get(`${apis.getCategoryById}/${id}`);
    return res.data.data;
  },

  getAllOffer: async (status = false) => {
    set({ isLoading: true });
    const res = await axios.get(apis.getallOffers);
    let data = res?.data?.data;

    // Optional: Sort based on status
    if (status) {
      data = data?.sort((a, b) => {
        if (a.status === true && b.status === false) return -1;
        if (a.status === false && b.status === true) return 1;
        return 0;
      });
    }

    set({ allOffer: data, isLoading: false });
    return data;
  },

  getAllOrders: async (params = "") => {
    const res = await axios.post(`${apis.getOrdersByUid}?${params}`);
    const data = res?.data?.data;
    set({ allOrders: data });
    return res?.data;
  },

  getOfferbyId: async (id) => {
    const res = await axios.post(apis.getSpecificOffer, { id });
    set({ allOffer: res.data?.data });
    return res.data.data;
  },

  setLead: (data) => set({ lead: data }),
  getAlLeads: async () => {
    const res = await axios.get(apis.getAllLeads);
    set({ lead: res.data?.data });
    return res.data;
  },

  getMyLeads: async (params) => {
    const res = await axios.get(`${apis.getAllLeads}?${params}`);
    return res?.data;
  },

  getAllBanners: async () => {
    const res = await axios.get(apis.getAllBanners);
    set({ banner: res.data?.data });
  },

  getAllSponsors: async () => {
    const res = await axios.get(apis.getAllSponsor);
    set({ sponsor: res.data?.data });
  },

  setUsers: (data) => set({ users: data }),
  getAllUsers: async () => {
    const res = await axios.get(apis.getAllLUsers);
    set({ users: res.data?.data });
  },

  setSelectedUser: (data) => {
    set({ selectedUser: data });
  },

  setTutorial: async (data) => {
    set({ tutorials: data })
  },

  // Called on logout: every list here is data fetched for the account that is
  // signing out, so none of it may leak into the next session.
  reset: () =>
    set({
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
      allOrders: [],
      banner: [],
      sponsor: [],
      templates: [],
      tutorials: [],
      isLoading: false,
    }),
}));

export default useDataStore;

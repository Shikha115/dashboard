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

  // getBanks: async () => {
  //   const res = await axios.get(apis.getAllBanks);
  //   set({ bank: res.data?.data, isLoading: false });
  // },

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
    set({ isLoading: true });
    const res = await axios.get(apis.getallOffers);
    let data = res?.data?.data;
    if (status) {
      data = await data?.sort((a, b) => {
        if (a.status === true && b.status === false) {
          return -1; // a comes before b
        }
        if (a.status === false && b.status === true) {
          return 1; // b comes before a
        }
        return 0; // Keep the original order if both have the same status
      });
    }
    console.log(data);

    set({ allOffer: data, isLoading: false });
    return data;
  },

  getAllOrders: async (params = "") => {
    const res = await axios.post(apis.getOrdersByUid + "?" + params);
    let data = res?.data?.data;
    set({ allOrders: data });
    return res?.data;
  },

  getOfferbyId: async (id) => {
    const res = await axios.post(apis.getSpecificOffer, {
      id,
    });
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
    const res = await axios.get(apis.getAllLeads + "?" + params);
    return res?.data;
    // set({ lead: res.data?.data });
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
}));

export default useDataStore;

let r = {
  _id: "669ba0984e17bb99c2863221",
  amount: 500,
  status: "approved",
  settled: true,
  offer_id: "661e397c799f8ed26e88e333",
  referral_id: "86L01",
  click_id: "18554115207",
  created: "2024-07-20T11:33:44.881Z",
  updated: "2024-07-20T11:33:59.228Z",
  user_id: "664f2f3d8dd17af59ed33cbb",
  lead_id: "669b8d6b4e17bb99c2862ddf",
  __v: 0,
  pdf: "https://api.prod.rojgarapp.in/pdf/1721475239226669ba0984e17bb99c2863221.pdf",
  offer_info: {
    status: true,
    mobile_data: {
      title: "IndusInd Bank",
      earning: "500",
      product_image:
        "https://api.prod.rojgarapp.in/image/c_1719838620028_Indus_Saving.png",
      apply_link: "https://oralfish.o18.click/c?o=20993274&m=1446&a=590410",
      benefit:
        "<ul><li>Earn up to 6.75% interest on your savings account.</li><li>Enjoy guaranteed returns of up to 7.75% on Fixed Deposits (FDs).</li><li>Senior citizens benefit from a special interest rate of up to 8.25%.</li><li>Access a Virtual Debit Card.</li><li>Fund your account and receive a complimentary 3-month Times Prime membership.</li><li>Utilize Digital Banking with online support.</li><li>Benefit from a Zero Balance Account option.</li><li>Debit Card Charges are ₹590.</li><li>The initial funding or deposit amount required is ₹2000.</li></ul>",
      who_can_apply:
        "<ol><li>Age : 18 to 45 years</li><li>Salaried and Self employed</li></ol>",
      how_to_process:
        '<ul><li><strong class="ql-size-large">Objective</strong>: Open an IndusInd Bank Savings Account and deposit INR 2000 to earn INR 500.</li><li><span style="color: rgb(0, 0, 0);">Click on Apply now or Share now option.</span></li><li>The customer enters their name and mobile number, then clicks "Submit".</li><li>The customer is redirected to the IndusInd website.</li><li>Enter their mobile number and verify the OTP.</li><li>Provide Aadhaar and PAN numbers.</li><li>Verify using the OTP sent to their mobile.</li><li>Enter personal details.</li><li>Choose a savings account variant.</li><li>Set up digital access by creating an MPIN.</li><li>Review and confirm details carefully.</li><li>Deposit an initial funding of INR 2000.</li><li>Additional Information:</li><li>Verification will be added after completing the process.</li><li>Required documents: PAN Card and Aadhaar Card.</li><li>Video KYC is mandatory for IndusInd Bank savings account verification.</li><li>Only one IndusInd Bank account should be open on the same device.</li><li>A minimum one-time deposit of INR 2000 is mandatory.</li></ul>',
      marketing:
        "<ol><li>WhatsApp</li><li>Facebook</li><li>Instagram</li><li>Telegram</li></ol>",
      "t&c":
        "<ul><li>This offer is only for people who are new to Indusind Bank, not those who already have an account.</li><li>To qualify, the person you refer must open a savings account with Indusind Bank using the special link we give you.</li><li>If you start the account opening process but can't finish it for any reason, you must complete it using the same link. Otherwise, we won't accept your referral.</li><li>You must complete an online verification process (VKYC) to get paid. If you do the verification through a bank agent instead, you won't receive any payment.</li><li>The customer's phone number must be linked to their Aadhaar Card.</li><li>You need to deposit at least ₹2000 in your account .</li><li>You can't open multiple accounts using the same device.</li></ul>",
      rank: "16",
      product_image_web:
        "https://api.prod.rojgarapp.in/image/1717058932184_Indusland_Bank.png",
    },
    type_id: "66162e18143be4b8e5abe322",
    offer_data: [
      {
        key: "Title",
        required: true,
        can_delete: false,
        value: "IndusInd Bank",
      },
      {
        key: "Earning",
        required: true,
        can_delete: false,
        value: "500",
      },
      {
        key: "Product Image",
        required: true,
        can_delete: false,
        value:
          "https://api.prod.rojgarapp.in/image/c_1719838620028_Indus_Saving.png",
      },
      {
        key: "Apply Link",
        required: true,
        can_delete: false,
        value: "https://oralfish.o18.click/c?o=20993274&m=1446&a=590410",
      },
      {
        key: "Benefit",
        required: true,
        can_delete: false,
        value:
          "<ul><li>Earn up to 6.75% interest on your savings account.</li><li>Enjoy guaranteed returns of up to 7.75% on Fixed Deposits (FDs).</li><li>Senior citizens benefit from a special interest rate of up to 8.25%.</li><li>Access a Virtual Debit Card.</li><li>Fund your account and receive a complimentary 3-month Times Prime membership.</li><li>Utilize Digital Banking with online support.</li><li>Benefit from a Zero Balance Account option.</li><li>Debit Card Charges are ₹590.</li><li>The initial funding or deposit amount required is ₹2000.</li></ul>",
      },
      {
        key: "Who can apply",
        required: true,
        can_delete: false,
        value:
          "<ol><li>Age : 18 to 45 years</li><li>Salaried and Self employed</li></ol>",
      },
      {
        key: "How to process",
        required: true,
        can_delete: false,
        value:
          '<ul><li><strong class="ql-size-large">Objective</strong>: Open an IndusInd Bank Savings Account and deposit INR 2000 to earn INR 500.</li><li><span style="color: rgb(0, 0, 0);">Click on Apply now or Share now option.</span></li><li>The customer enters their name and mobile number, then clicks "Submit".</li><li>The customer is redirected to the IndusInd website.</li><li>Enter their mobile number and verify the OTP.</li><li>Provide Aadhaar and PAN numbers.</li><li>Verify using the OTP sent to their mobile.</li><li>Enter personal details.</li><li>Choose a savings account variant.</li><li>Set up digital access by creating an MPIN.</li><li>Review and confirm details carefully.</li><li>Deposit an initial funding of INR 2000.</li><li>Additional Information:</li><li>Verification will be added after completing the process.</li><li>Required documents: PAN Card and Aadhaar Card.</li><li>Video KYC is mandatory for IndusInd Bank savings account verification.</li><li>Only one IndusInd Bank account should be open on the same device.</li><li>A minimum one-time deposit of INR 2000 is mandatory.</li></ul>',
      },
      {
        key: "Marketing",
        required: true,
        can_delete: false,
        value:
          "<ol><li>WhatsApp</li><li>Facebook</li><li>Instagram</li><li>Telegram</li></ol>",
      },
      {
        key: "T&C",
        required: true,
        can_delete: false,
        value:
          "<ul><li>This offer is only for people who are new to Indusind Bank, not those who already have an account.</li><li>To qualify, the person you refer must open a savings account with Indusind Bank using the special link we give you.</li><li>If you start the account opening process but can't finish it for any reason, you must complete it using the same link. Otherwise, we won't accept your referral.</li><li>You must complete an online verification process (VKYC) to get paid. If you do the verification through a bank agent instead, you won't receive any payment.</li><li>The customer's phone number must be linked to their Aadhaar Card.</li><li>You need to deposit at least ₹2000 in your account .</li><li>You can't open multiple accounts using the same device.</li></ul>",
      },
      {
        key: "Rank",
        required: true,
        can_delete: false,
        value: "16",
      },
      {
        key: "Status",
        required: true,
        can_delete: false,
      },
      {
        key: "Card Type",
        required: true,
        can_delete: false,
      },
      {
        key: "Product Image Web",
        required: true,
        can_delete: false,
        value:
          "https://api.prod.rojgarapp.in/image/1717058932184_Indusland_Bank.png",
      },
    ],
    __v: 0,
    rank: 3,
    featured: true,
  },
  lead_info: {
    offer_id: "661e397c799f8ed26e88e333",
    user_id: "664f2f3d8dd17af59ed33cbb",
    category_id: "66162e18143be4b8e5abe322",
    click_id: "18554115207",
    customer_url:
      "https://bfsiportal.com/my-leads?oid=661e397c799f8ed26e88e333&uid=664f2f3d8dd17af59ed33cbb&afid=86L01",
    apply_link: "https://oralfish.o18.click/c?o=20993274&m=1446&a=590410",
    status: "settled",
    isComplete: "approved",
    remarks: "",
    earning: "0",
    link_with_click_id:
      "https://oralfish.o18.click/c?o=20993274&m=1446&a=590410&sub_aff_id=86L01_18554115207",
    affiliate_id: "86L01",
    name: "Rahul Meena",
    email: "meena rahul@gmail.com",
    phone: "7529652852",
    created: "2024-07-20T10:11:55.479Z",
    updated: "2024-07-20T11:33:58.276Z",
    __v: 0,
  },
};

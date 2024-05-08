export const AppInfo = {
  baseUrlAPI: "http://localhost:5001", // Rojgar Dev
  // baseUrlAPI: "https://api.dev.rojgarapp.in", // Rojgar Dev
  // baseUrlAPI: "https://api.prod.rojgarapp.in", // Rojgar Prod
  apiVersion: "api/v1",
};

const baseURL = AppInfo.baseUrlAPI + "/" + AppInfo.apiVersion;

export const config = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
};

export const apis = {
  loginWithOtp: `${baseURL}/auth/login-via-otp`,
  verifyOTP: `${baseURL}/auth/verify-otp`,
  login: `${baseURL}/auth/login`,
  register: `${baseURL}/auth/register`,
  accountDeletionRequest: `${baseURL}/auth/request-account-deletion`,

  getCategories: `${baseURL}/category/get-all-categories`,
  getCategoryById: `${baseURL}/category/get-category`,
  updateCategory: `${baseURL}/category/update-category`,
  deleteCategory: `${baseURL}/category/delete-category`,
  createCategory: `${baseURL}/category/create-category`,

  getAllBanners: `${baseURL}/banner/get-all-banners`,
  addBanner: `${baseURL}/banner/add-banner`,
  editBanner: `${baseURL}/banner/edit-banner`,
  deletBanner: `${baseURL}/banner/delete-banner`,

  getAllSponsor: `${baseURL}/sponsor/get-all-sponsors`,
  addSponsor: `${baseURL}/sponsor/add-sponsor`,
  editSponsor: `${baseURL}/sponsor/edit-sponsor`,
  deletSponsor: `${baseURL}/sponsor/delete-sponsor`,
  getProfileWeb: `${baseURL}/profile/get-profile-web`,

  updateProfile: `${baseURL}/profile/update-profile`,
  getAllLUsers: `${baseURL}/profile/get-all-profiles`,
  approveProfile: `${baseURL}/profile/approve-profile`,

  getallOffers: `${baseURL}/offers/get-all-offers-web`,
  getSpecificOffer: `${baseURL}/offers/get-selected-offers-web`,
  createOffer: `${baseURL}/offers/create-offer`,
  updateOffer: `${baseURL}/offers/update-offer`,
  updateOfferStatus: `${baseURL}/offers/update-offer-status`,
  getOfferWeb: `${baseURL}/offers/get-offer-web`,
  updateOfferRank: `${baseURL}/offers/update-offer-rank`,
  deleteOffer: `${baseURL}/offers/delete-offer`,

  createLead: `${baseURL}/lead/create-lead`,
  getAllLeads: `${baseURL}/lead/get-all-leads`,
  settleLeads: `${baseURL}/lead/settle-leads`,

  getSelectedOrders: `${baseURL}/order/get-selected-orders`,

  getAllBanks: `${baseURL}/bank/get-all-banks`,
  addBank: `${baseURL}/bank/create-bank`,
  editBank: `${baseURL}/bank/update-bank`,
  deleteBank: `${baseURL}/bank/delete-bank`,

  uploadImage: `${baseURL}/upload/upload-image`,

  bulkNotification: `${baseURL}/notification/bulk-notification`,
  multiNotification: `${baseURL}/notification/multi-notification`,
  singleNotification: `${baseURL}/notification/single-notification`,

  getAllTemplates: `${baseURL}/template/get-all-templates`,
  createTemplate: `${baseURL}/template/create-template`,
  updateTemplate: `${baseURL}/template/update-template`,
  deleteTemplate: `${baseURL}/template/delete-template`,
};

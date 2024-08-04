export const AppInfo = {
  // baseUrlAPI: "http://localhost:5001", // Rojgar Dev local
  // webUrl: "http://localhost:3000",

  baseUrlAPI: "https://api.dev.rojgarapp.in", // Rojgar Dev
  webUrl: "https://web.dev.rojgarapp.in",

  // baseUrlAPI: "https://api.prod.rojgarapp.in", // Rojgar Prod
  // webUrl: "https://bfsiportal.com",

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
  //---------------- Auth ------------- //
  loginWithOtp: `${baseURL}/auth/login-via-otp`,
  verifyOTP: `${baseURL}/auth/verify-otp`,
  login: `${baseURL}/auth/login`,
  register: `${baseURL}/auth/register`,
  accountDeletionRequest: `${baseURL}/auth/request-account-deletion`,

  //---------------- category ------------- //
  getCategories: `${baseURL}/category/get-all-categories`,
  getCategoryById: `${baseURL}/category/get-category`,
  updateCategory: `${baseURL}/category/update-category`,
  deleteCategory: `${baseURL}/category/delete-category`,
  createCategory: `${baseURL}/category/create-category`,

  //---------------- banner ------------- //
  getAllBanners: `${baseURL}/banner/get-all-banners`,
  addBanner: `${baseURL}/banner/add-banner`,
  editBanner: `${baseURL}/banner/edit-banner`,
  deleteBanner: `${baseURL}/banner/delete-banner`,

  //---------------- sponsor ------------- //
  getAllSponsor: `${baseURL}/sponsor/get-all-sponsors`,
  addSponsor: `${baseURL}/sponsor/add-sponsor`,
  editSponsor: `${baseURL}/sponsor/edit-sponsor`,
  deleteSponsor: `${baseURL}/sponsor/delete-sponsor`,
  getProfileWeb: `${baseURL}/profile/get-profile-web`,

  //---------------- profile ------------- //
  updateProfile: `${baseURL}/profile/update-profile`,
  getAllLUsers: `${baseURL}/profile/get-all-profiles`,
  approveProfile: `${baseURL}/profile/approve-profile`,

  //---------------- offer ------------- //
  getallOffers: `${baseURL}/offers/get-all-offers-web`,
  getSpecificOffer: `${baseURL}/offers/get-selected-offers-web`,
  createOffer: `${baseURL}/offers/create-offer`,
  updateOffer: `${baseURL}/offers/update-offer`,
  updateOfferStatus: `${baseURL}/offers/update-offer-status`,
  getOfferWeb: `${baseURL}/offers/get-offer-web`,
  updateOfferRank: `${baseURL}/offers/update-offer-rank`,
  updateIfFeatured: `${baseURL}/offers/update-featured`,
  updateIfConverting: `${baseURL}/offers/update-converting`,
  deleteOffer: `${baseURL}/offers/delete-offer`,
  featuredOffer: `${baseURL}/offers/get-featured`,

  //---------------- lead ------------- //
  createLead: `${baseURL}/lead/create-lead`,
  getAllLeads: `${baseURL}/lead/get-all-leads`,
  downloadAllLeads: `${baseURL}/lead/download-all-leads`,
  settleLeads: `${baseURL}/lead/settle-leads`,

  //---------------- order ------------- //
  getSelectedOrders: `${baseURL}/order/get-selected-orders`,
  approveOrders: `${baseURL}/order/approve-orders`,
  getOrdersByUid: `${baseURL}/order/get-orders-by-uid`,
  downloadAllOrders: `${baseURL}/order/download-all-orders`,

  //---------------- bank ------------- //
  getAllBanks: `${baseURL}/bank/get-all-banks`,
  addBank: `${baseURL}/bank/create-bank`,
  editBank: `${baseURL}/bank/update-bank`,
  deleteBank: `${baseURL}/bank/delete-bank`,

  //---------------- image ------------- //
  uploadImage: `${baseURL}/upload/upload-image`,

  //---------------- notification ------------- //
  bulkNotification: `${baseURL}/notification/bulk-notification`,
  multiNotification: `${baseURL}/notification/multi-notification`,
  singleNotification: `${baseURL}/notification/single-notification`,

  //---------------- template ------------- //
  getAllTemplates: `${baseURL}/template/get-all-templates`,
  createTemplate: `${baseURL}/template/create-template`,
  updateTemplate: `${baseURL}/template/update-template`,
  deleteTemplate: `${baseURL}/template/delete-template`,
};

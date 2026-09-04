// API endpoint. Override per environment with REACT_APP_API_BASE_URL in a
// .env file (see ENV_SETUP.md) instead of editing this file.
//
//   local   http://localhost:5001              (.env.development)
//   prod    https://api.prodv.rojgarapp.in     (.env.production, hardened API)
//
// Only the hardened API can serve this build: it keeps the access token in
// memory and relies on the httpOnly refresh cookie that only that backend
// issues. api.prod.rojgarapp.in and api.dev.rojgarapp.in still run the legacy
// backend — they answer /auth/refresh with 404, so a session dies on the first
// page reload.
//
// Whichever host is used must list this origin in the backend's CORS_ORIGINS
// and serve a CA-signed certificate. A cert the browser rejects surfaces as a
// bare "Network Error" with no response and no status code.
export const AppInfo = {
  baseUrlAPI: process.env.REACT_APP_API_BASE_URL || "http://localhost:5001",
  webUrl: process.env.REACT_APP_WEB_URL || "https://bfsiportal.com",
  apiVersion: process.env.REACT_APP_API_VERSION || "api/v1",
};

export const baseURL = AppInfo.baseUrlAPI + "/" + AppInfo.apiVersion;

// The axios interceptor in utils/http.js attaches the bearer token to every
// call to our API, so callers no longer need to pass one. Kept for existing
// call sites.
export const config = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

export const apis = {
  //---------------- Auth ------------- //
  loginWithOtp: `${baseURL}/auth/login-via-otp`,
  verifyOTP: `${baseURL}/auth/verify-otp`,
  login: `${baseURL}/auth/login`,
  refreshToken: `${baseURL}/auth/refresh`,
  logoutWeb: `${baseURL}/auth/logout-web`,
  me: `${baseURL}/auth/me`,
  confirmAccountDeletion: `${baseURL}/auth/confirm-account-deletion`,
  register: `${baseURL}/auth/register`,
  deleteUser: `${baseURL}/auth/delete-user`,
  deleteWebUser: `${baseURL}/auth/delete-web-user`,
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
  updateProfileWeb: `${baseURL}/profile/update-profile-web`,
  getAllLUsers: `${baseURL}/profile/get-all-profiles`,
  getAllWebUsers: `${baseURL}/profile/get-all-web-profiles`,
  approveProfile: `${baseURL}/profile/approve-profile`,
  bulkApproveProfile: `${baseURL}/profile/bulk-approve-profile`,
  downloadProfile: `${baseURL}/profile/download-csv`,
  bulkDownloadProfile: `${baseURL}/profile/download-all-csv`,

  //---------------- offer ------------- //
  getallOffers: `${baseURL}/offers/get-all-offers-web`,
  getSpecificOffer: `${baseURL}/offers/get-selected-offers-web`,
  createOffer: `${baseURL}/offers/create-offer`,
  updateOffer: `${baseURL}/offers/update-offer`,
  updateOfferStatus: `${baseURL}/offers/update-offer-status`,
  getOfferWeb: `${baseURL}/offers/get-offer-web`,
  getOfferByIdWeb: `${baseURL}/offers/get-offer-by-id-web`,
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
  getSelectedLeads: `${baseURL}/lead/get-selected-leads`,
  getSelectedLeadsById: `${baseURL}/lead/get-selected-leads-by-id`,
  rejectLead: `${baseURL}/lead/reject-lead`,

  //---------------- objection ------------- //
  updateObjection: `${baseURL}/lead/update-objection`,
  deleteObjection: `${baseURL}/lead/delete-objection`,
  getAllObjections: `${baseURL}/lead/get-all-objections`,
  getObjectionsById: `${baseURL}/lead/reject-lead`,
  getObjectionsByLeadId: `${baseURL}/lead/reject-lead`,

  //---------------- order ------------- //
  getSelectedOrders: `${baseURL}/order/get-selected-orders`,
  approveOrders: `${baseURL}/order/approve-orders`,
  getOrdersByUid: `${baseURL}/order/get-orders-by-uid`,
  downloadAllOrders: `${baseURL}/order/download-all-orders`,

  //---------------- payment ------------- //
  createPayment: `${baseURL}/payment/create-payment`,
  getAllPayment: `${baseURL}/payment/get-all-payments`,
  settlePaymentOffline: `${baseURL}/payment/settle-bulk-payment-offline`,
  settlePaymentOnline: `${baseURL}/payment/settle-payment-online`,

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
  saveNotification: `${baseURL}/notification/save-notification`,

  //---------------- template ------------- //
  getAllTemplates: `${baseURL}/template/get-all-templates`,
  createTemplate: `${baseURL}/template/create-template`,
  updateTemplate: `${baseURL}/template/update-template`,
  deleteTemplate: `${baseURL}/template/delete-template`,

  //---------------- tutorial ------------- //
  getAllTutorials: `${baseURL}/tutorial/get-all-tutorial-web`,
  createTutorial: `${baseURL}/tutorial/create-tutorial`,
  updateTutorial: `${baseURL}/tutorial/update-tutorial`,
  deleteTutorial: `${baseURL}/tutorial/delete-tutorial`,

  //---------------- settings ------------- //
  getSettings: `${baseURL}/settings`,
  updateSettings: `${baseURL}/settings/update`,

  //---------------- backup ------------- //
  getBackupCollections: `${baseURL}/backup/collections`,
  getBackups: `${baseURL}/backup`,
  runBackup: `${baseURL}/backup/run`,
  downloadBackup: `${baseURL}/backup/download`,

  //---------------- contact ------------- //
  getAllContacts: `${baseURL}/contact/get-all-contact`,
  createContact: `${baseURL}/contact/create`,
  updateContact: `${baseURL}/contact/update`,
  deleteContact: `${baseURL}/contact/delete`,
};

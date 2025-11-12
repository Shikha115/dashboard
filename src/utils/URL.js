export const AppInfo = {
  baseUrlAPI: process.env.REACT_APP_API_BASE_URL,
  webUrl: process.env.REACT_APP_WEB_URL,
  apiVersion: process.env.REACT_APP_API_VERSION,
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

  //---------------- contact ------------- //
  getAllContacts: `${baseURL}/contact/get-all-contact`,
  createContact: `${baseURL}/contact/create`,
  updateContact: `${baseURL}/contact/update`,
  deleteContact: `${baseURL}/contact/delete`,
};

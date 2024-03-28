export const AppInfo = {
  // baseUrlAPI: "http://localhost:5001", // Rojgar Dev
  baseUrlAPI: "https://api.dev.rojgar.new-india-consultants.com", // Rojgar Dev
  // baseUrlAPI: "https://api.prod.rojgar.new-india-consultants.com", // Rojgar Prod
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
  updateCategory: `${baseURL}/category/update-category`,

  getAllBanners: `${baseURL}/banner/get-all-banners`,

  getProfileWeb: `${baseURL}/profile/get-profile-web`,

  updateProfile: `${baseURL}/profile/update-profile`,
  getAllLUsers: `${baseURL}/profile/get-all-profiles`,

  getallOffers: `${baseURL}/offers/get-all-offers-web`,
  getSpecificOffer: `${baseURL}/offers/get-selected-offers-web`,
  createOffer: `${baseURL}/offers/create-offer`,
  updateOffer: `${baseURL}/offers/update-offer`,
  updateOfferStatus: `${baseURL}/offers/update-offer-status`,
  getOfferWeb: `${baseURL}/offers/get-offer-web`,

  createLead: `${baseURL}/lead/create-lead`,
  getAllLeads: `${baseURL}/lead/get-all-leads`,
  settleLeads: `${baseURL}/lead/settle-leads`,

  getAllBanks: `${baseURL}/bank/get-all-banks`,

  multiNotification: `${baseURL}/notification/multi-notification`,
};

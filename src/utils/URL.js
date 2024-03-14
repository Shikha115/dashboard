export const AppInfo = {
  baseUrlAPI: "http://localhost:5001", // Rojgar Dev
  // baseUrlAPI: "https://api.dev.rojgar.new-india-consultants.com", // Rojgar Dev
  // baseUrlAPI: "https://api.prod.rojgar.new-india-consultants.com", // Rojgar Prod
  apiVersion: "api/v1",
};

const baseURL = AppInfo.baseUrlAPI + "/" + AppInfo.apiVersion;

export const apis = {
  loginWithOtp: `${baseURL}/auth/login-via-otp`,
  verifyOTP: `${baseURL}/auth/verify-otp`,
  login: `${baseURL}/auth/login`,
  register: `${baseURL}/auth/register`,

  getCategories: `${baseURL}/category/get-all-categories`,

  getAllBanners: `${baseURL}/banner/get-all-banners`,

  getProfile: `${baseURL}/profile/get-profile`,
  getAllLUsers: `${baseURL}/profile/get-all-profiles`,
  updateProfile: `${baseURL}/profile/update-profile`,
  getallOffers: `${baseURL}/offers/get-all-offers-web`,
  getSpecificOffer: `${baseURL}/offers/get-selected-offers-web`,
  createOffer: `${baseURL}/offers/create-offer`,
  updateOffer: `${baseURL}/offers/update-offer`,
  updateOfferStatus: `${baseURL}/offers/update-offer-status`,
  getOfferWeb: `${baseURL}/offers/get-offer-web`,

  createLead: `${baseURL}/lead/create-lead`,
  getAllLeads: `${baseURL}/lead/get-all-leads`,
  getAllBanks: `${baseURL}/bank/get-all-banks`,
};

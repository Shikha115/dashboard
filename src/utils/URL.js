export const AppInfo = {
  // baseUrlAPI: "http://localhost:5001", // Rojgar Dev
  baseUrlAPI: "https://api.dev.rojgar.new-india-consultants.com", // Rojgar Dev
  apiVersion: "api/v1",
};
const baseURL = AppInfo.baseUrlAPI + "/" + AppInfo.apiVersion;

export const apis = {
  loginWithOtp: `${baseURL}/auth/login-via-otp`,
  verifyOTP: `${baseURL}/auth/verify-otp`,
  getallOffers: `${baseURL}/offers/get-all-offers`,
  getCategories: `${baseURL}/category/get-all-categories`,
  getAllBanners: `${baseURL}/banner/get-all-banners`,
  getProfile: `${baseURL}/profile/get-profile`,
  updateProfile: `${baseURL}/profile/update-profile`,
  getAllBanks: `${baseURL}/bank/get-all-banks`,
  login: `${baseURL}/auth/login`,
  register: `${baseURL}/auth/register`,
  getOfferWeb: `${baseURL}/offers/get-offer-web`,
};

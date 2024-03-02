const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email) => {
  if (emailRegex.test(email)) {
    return true;
  }
  return false;
};

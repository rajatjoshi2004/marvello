export const isMobileValid = (mobile: string) => {
  return /^\d{10}$/.test(mobile);
};

export const formatMobileNumber = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 10);
};
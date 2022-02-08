const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const isEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

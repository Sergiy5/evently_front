export const statusPassword = (password: string) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password); // Checks for at least one digit (0-9)

  return {
    hasUppercase,
    hasSpecialChar,
    hasMinLength,
    hasNumber,
  };
}

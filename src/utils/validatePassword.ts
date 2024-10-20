export const validatePassword = (password: string): boolean | string => {
  // Regular expression to check for at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,}$/;
   // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; old patern
  
  if (!pattern.test(password)) {
    return 'Невірний пароль';
  }

  return true;
};

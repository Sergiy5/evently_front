export interface LoginUserInterface {
  email: string;
  password: string;
}

export interface RegisterFormInputEmail {
  email: string;
}

export interface RegisterUserInterface {
  name: string;
  email: string;
  password: string;
}
export interface RegisterFormInputsPassword {
  name: string;
  password: string;
  confirmPassword: string;
}

export interface RequiredPasswordInterface {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

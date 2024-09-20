export interface ILoginUser {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IRegisterFormInputEmail {
  email: string;
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  // confirmPassword: string;
}
export interface IRegisterFormInputsPassword {
  name: string;
  password: string;
  confirmPassword: string;
}

export interface IRequiredPassword {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

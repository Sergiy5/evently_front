import { useEffect, useState } from 'react';
import { Modal, SharedInput } from './ui';
import { validateEmail, validatePassword } from '@/utils';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@/hooks/hooks';
import { register } from '@/redux/auth/operations';

export interface UserInterface {
  email: string;
  password: string;
  name: string;
}
interface AuthProps {
  onCloseModal: () => void;
}

export interface IsValidInterface {
  email: boolean | null;
  password: boolean | null;
  passwordMatch: boolean | null;
}
export const Register: React.FC<AuthProps> = ({ onCloseModal }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserInterface | {}>();
  const [isValid, setIsValid] = useState<IsValidInterface>({
    email: null,
    password: null,
    passwordMatch: null,
  });
  const [onInputChangeName, setOnInputChangeName] = useState<string | null>(
    null
  );
  const [onInputChangeEmail, setOnInputChangeEmail] = useState<string>('');
  const [onInputChangePassword, setOnInputChangePassword] =
    useState<string>('');
  const [onInputChangeConfirmPassword, setOnInputChangeConfirmPassword] =
    useState<string>('');

  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    formData.forEach((value, key) => {
      formData.set(key, String(value).trim());
    });

    const data = Object.fromEntries(formData);
    const { email, password, name, 'confirm password': confirmPassword } = data;

    // Chek if all fields are filled
    // Object.keys(data).forEach(key => {
    //   if (data[key] === '') {
    //     return toast.error(`${key} is required`);
    //   }
    // });

    // Validate fields
    const emailIsValid = validateEmail(email as string);
    const passwordIsValid = validatePassword(password as string);
    const passwordsMatch = password === confirmPassword && password !== '';

    if (!emailIsValid) toast.error('Invalid email');
    if (!passwordIsValid) toast.error('Password is invalid');
    if (!passwordsMatch) toast.error('Passwords do not match');
    if (typeof name === 'string' && name.length < 2) {
      toast.error('Name must be at least 2 characters');
    }

    // Set validation states
    setIsValid({
      email: emailIsValid,
      password: passwordIsValid,
      passwordMatch: passwordsMatch,
    });

    if (emailIsValid && passwordIsValid && passwordsMatch && data.name) {
      setUserData({ name, email, password });
    }
  };

  // Validate email
  useEffect(() => {
    if (isValid.email !== null) {
      setIsValid({
        ...isValid,
        email: validateEmail(onInputChangeEmail),
      });
    }
  }, [onInputChangeEmail]);

  // Validate password
  useEffect(() => {
    if (isValid.password !== null) {
      setIsValid({
        ...isValid,
        password: validatePassword(onInputChangePassword),
      });
    }
  }, [onInputChangePassword]);

  // // Check if password matches
  useEffect(() => {
    if (isValid.passwordMatch !== null) {
      setIsValid({
        ...isValid,
        passwordMatch:
          onInputChangePassword === onInputChangeConfirmPassword ?? false,
      });
    }
  }, [onInputChangeConfirmPassword]);

  // Register user ================================================================
  useEffect(() => {
    if (!userData) return;

    const regUser = async (credentials: UserInterface | {}) => {
      setIsLoading(true);
      try {
        const response = await dispatch(register(credentials));

        if (response) {
          console.log('RESPONSE_IN_AUTH', response);
          onCloseModal();
          return toast.success(
            `User ${response.payload.name} registered successfully`
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    regUser(userData);
  }, [userData]);

  // // Show password =================================================================
  // const passwordInput = document.getElementById('password') as HTMLInputElement;
  // const confirmPasswordInput = document.getElementById(
  //   'confirm-password'
  // ) as HTMLInputElement;
  // const showPasswordCheckbox = document.getElementById('show-password');

  // showPasswordCheckbox?.addEventListener('change', () => {
  //    if (passwordInput.type === 'password') {
  //      passwordInput.type = 'text';
  //    } else {
  //      passwordInput.type = 'password';
  //    }
  //   // const isChecked = (showPasswordCheckbox as HTMLInputElement).checked;
  //   // passwordInput.type = isChecked ? 'text' : 'password';
  //   // if (confirmPasswordInput) {
  //   //   confirmPasswordInput.type = isChecked ? 'text' : 'password';
  //   // }
  // });

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col rounded-lg p-6 gap-8 bg-gray-50 w-[480px]"
      >
        <SharedInput
          id="name"
          label="name"
          name="name"
          onInput={setOnInputChangeName}
          autocomplete="on"
          isValid={onInputChangeName ?? null}
          type="text"
        />
        <SharedInput
          id="email"
          label="email"
          name="email"
          autocomplete="on"
          isValid={isValid.email}
          onInput={setOnInputChangeEmail}
          type="email"
        />
        <SharedInput
          id="password"
          label="password"
          name="password"
          onInput={setOnInputChangePassword}
          isValid={isValid.password}
          autocomplete="on"
          type="password"
        />
        <SharedInput
          id="confirm-password"
          label="confirm password"
          name="confirm password"
          onInput={setOnInputChangeConfirmPassword}
          autocomplete="on"
          isValid={isValid.passwordMatch}
          type="password"
        />
        <button
          type="submit"
          // disabled={true} Need to disabled button
          className={`text-light bg-secondary rounded-lg py-2 hover:bg-warning focus:outline-none`}
        >
          Submit
        </button>
      </form>
      {isLoading && (
        <Modal isOpen={isLoading}>
          <div
            className={`flex items-center justify-center w-full h-full text-primary text-3xl`}
          >
            LOADING...
          </div>
        </Modal>
      )}
    </div>
  );
};

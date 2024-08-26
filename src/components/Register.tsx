import { useEffect, useState } from 'react';
import { SharedInput } from './ui';
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
export const Register: React.FC<AuthProps> = ({ onCloseModal }) => {
  const [isValidEmail, setIsValidEmail] = useState<boolean | null>(null);
  const [onInputChangeEmail, setOnInputChangeEmail] = useState<string>('');
  const [isValidPassword, setIsValidPassword] = useState<boolean | null>(null);
  const [onInputChangePassword, setOnInputChangePassword] =
    useState<string>('');
  const [onInputChangeConfirmPassword, setOnInputChangeConfirmPassword] =
    useState<string>('');
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<UserInterface | {}>();
  const [isLoading, setIsLoading] = useState(false);

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
    Object.keys(data).forEach(key => {
      if (data[key] === '') {
        return toast.error(`${key} is required`);
      }
    });

    if (!validateEmail(email as string)) {
      setIsValidEmail(false);

      return toast.error('Invalid email');
    }
    if (!validatePassword(password as string)) {
      setIsValidPassword(false);

      return toast.error(
        'Password must be at least 8 characters, with uppercase, lowercase, digit, and special character.'
      );
    }
    if (password !== confirmPassword && isValidPassword) {
      return toast.error('Passwords do not match');
    }
    if (onInputChangeEmail && isValidPassword && data.name) {
      console.log('SET_USER_DATA');
      setUserData({ name, email, password });
    }
  };

  // Check valid email =======================================================
  useEffect(() => {
    if (isValidEmail === null) return;

    if (!validateEmail(onInputChangeEmail)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  }, [onInputChangeEmail]);

  // Check valid password =======================================================
  useEffect(() => {
    if (isValidPassword === null) return;

    if (!validatePassword(onInputChangePassword)) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  }, [onInputChangePassword]);

  // Check if password matches =======================================================
  useEffect(() => {
    if (isPasswordMatch === null) return;

    if (onInputChangePassword !== onInputChangeConfirmPassword) {
      setIsPasswordMatch(false);
    } else {
      setIsPasswordMatch(true);
    }
  }, [onInputChangeConfirmPassword, onInputChangePassword]);

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
          // autocomplete="on"
          isValid={true}
        />
        <SharedInput
          id="email"
          label="email"
          name="email"
          autocomplete="on"
          isValid={isValidEmail}
          onInput={setOnInputChangeEmail}
        />
        <SharedInput
          id="password"
          label="password"
          name="password"
          onInput={setOnInputChangePassword}
          isValid={isValidPassword}
          autocomplete="on"
        />
        <SharedInput
          id="confirm password"
          label="confirm password"
          name="confirm password"
          onInput={setOnInputChangeConfirmPassword}
          autocomplete="on"
          isValid={isPasswordMatch}
        />
        <button
          type="submit"
          // disabled={true} Need to disabled button
          className={`text-light bg-secondary rounded-lg py-2 hover:bg-warning focus:outline-none`}
        >
          Submit
        </button>
      </form>
      {isLoading && <div>LOADING...</div>}
    </div>
  );
};

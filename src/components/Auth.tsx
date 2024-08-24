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
export const Auth: React.FC<AuthProps> = ({ onCloseModal }) => {
  const [userData, setUserData] = useState<UserInterface | {}>();
  const [isValidData, setIsValidData] = useState<boolean>(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  console.log("first", isValidData);
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    formData.forEach((value, key) => {
      formData.set(key, String(value).trim());
    });

    const data = Object.fromEntries(formData);
    const { email, password, name, 'confirm password': confirmPassword } = data;

    const emptyFields = Object.keys(data).filter(key => data[key] === '');

    if (emptyFields.length === 0) {

      emptyFields.forEach(field => {

        toast.error(`${field} is required`);
      });
    }

    console.log("EMAIL",email)
    if (!validateEmail(email as string)) {
      setIsValidEmail(false);

      toast.error('Invalid email');
    }
    if (!validatePassword(password as string)) {
      setIsValidData(true);

       toast.error(
        'Password must be at least 8 characters, with uppercase, lowercase, digit, and special character.'
      );
    }
    if (password !== confirmPassword) {

       toast.error('Passwords do not match');
    }
    if (data && data.email && data.password && data.name) {
      setUserData({ name, email, password });
    }
  };
 
  useEffect(() => {
    if (!userData) return;

    const regUser = async (credentials: UserInterface | {}) => {
      setIsLoading(true);
      try {
        const response = await dispatch(register(credentials));

        if (response) {
          console.log("RESPONSE_IN_AUTH",response)
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
        className="flex flex-col rounded-lg p-6 gap-8 bg-gray-50 w-[480px]"
      >
        <SharedInput id="name" label="name" name="name" isValid={isValidData} />
        <SharedInput
          id="email"
          label="email"
          name="email"
          isValid={isValidEmail}
        />
        <SharedInput
          id="password"
          label="password"
          name="password"
          autocomplete="password"
          isValid={isValidData}
          type="password"
        />
        <SharedInput
          id="confirm password"
          label="confirm password"
          name="confirm password"
          isValid={isValidData}
          autocomplete="confirm password"
        />
        <button
          type="submit"
          className={`text-light bg-secondary rounded-lg py-2 hover:bg-warning focus:outline-none`}
        >
          Submit
        </button>
      </form>
      {isLoading && <div>LOADING...</div>}
    </div>
  );
};

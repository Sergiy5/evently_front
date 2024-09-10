import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { statusPassword, validatePassword } from '@/utils';
import { SharedInput, SharedStatusBarPassword } from './ui';
import { register as registerUser } from '@/redux/auth/operations';
// import { toast } from 'react-toastify';
import { useAppDispatch } from '@/hooks/hooks';
import { SharedBtn } from './ui/SharedBtn';


export interface RegisterUserInterface {
  name: string;
  email: string;
  password: string;
}
interface RegisterFormInputs {
  name: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterInputPasswordProps {
  onCloseModal: () => void;
  email: string;
}

interface RequiredPasswordInterface {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export const RegisterInputPassword: React.FC<RegisterInputPasswordProps> = ({
  onCloseModal,
  email,
}) => {
    const [userData, setUserData] = useState({ name: '', email: email, password: '' });
    const [onInputPassword, setOnInputPassword] = useState('')
    const [requiredPassword, setRequiredPassword] =
      useState<RequiredPasswordInterface>({
        hasMinLength: false,
        hasUppercase: false,
        hasNumber: false,
        hasSpecialChar: false,
      });


  const dispatch = useAppDispatch();


  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<RegisterFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormInputs) => {
      const { name, password } = data;

    setUserData(prev=>({ ...prev, password, name}));
    // Submit data to API or perform other actions
    
    };
    useEffect(() => {
        const requiredPassword = setRequiredPassword(prev=>({...prev, ...statusPassword(onInputPassword)})); 
        console.log('requiredPassword_>>>>>>>>>>', requiredPassword);
        
    }, [onInputPassword]);

      useEffect(() => {
          if (!userData.email || !userData.password || !userData.name) return;
        
        const onRegisterUser = async () => {
            try {
            const result = await dispatch(
              registerUser(userData as RegisterUserInterface)
            );

            console.log(result);
            // !result?.error
            //   ? toast.success('Welcome!')
            //   : toast.error('You are not logged in');
          } catch (error) {
            console.error(error);
          } finally {
            onCloseModal();
          }
        };
        onRegisterUser();
      }, [userData.password]);

  return (
    <>
      <div className={`flex flex-col p-9`}>
        <h1>Увійти в акаунт</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-8 w-[500px]"
        >
          <SharedInput
            placeholder="Ім'я"
            id="name"
            autocomplete="name"
            type="text"
            register={register}
            validation={{ required: true }}
            errors={errors}
          />
          <SharedInput
            onInput={(value: string) => {
              setOnInputPassword(value);
              console.log('PASSWORD_ON_INPUT', value);
            }}
            placeholder="Пароль"
            id="password"
            autocomplete="current-password"
            type="password"
            register={register}
            validation={{ required: true, validate: validatePassword }}
            errors={errors}
          />
          <ul className="flex">
            <li className={``}>
              <SharedStatusBarPassword
                text="Мінімум 8 символів"
                valid={requiredPassword.hasMinLength}
              />
            </li>
            <li className={``}>
              <SharedStatusBarPassword
                text="Велика літера"
                valid={requiredPassword.hasUppercase}
              />
            </li>
            <li className={``}>
              <SharedStatusBarPassword
                text="Цифра"
                valid={requiredPassword.hasNumber}
              />
            </li>
            <li className={``}>
              <SharedStatusBarPassword
                text="Спеціальний символ"
                valid={requiredPassword.hasSpecialChar}
              />
            </li>
          </ul>
          <SharedInput
            placeholder="Підтвердіть пароль"
            id="confirmPassword"
            autocomplete="new-password"
            type="password"
            register={register}
            validation={{
              required: true,
              validate: value => value === watch('password'),
            }}
            errors={errors}
          />
          <SharedBtn
            type="submit"
            disabled={!isValid}
            text="Створити акаунт"
          ></SharedBtn>
        </form>
      </div>
      <img src="public/images/auth-form.webp" alt="colage_posters" />
    </>
  );
};

import { useEffect, useState } from 'react';
import {
  PrivacyAgreement,
  SharedBtn,
  SharedInput,
  SharedItemStatusBar,
  StatusBarPassword,
} from '../ui';
import { useForm } from 'react-hook-form';
import { IRegisterFormInputsPassword, IRequiredPassword } from '@/types';
import { statusPassword, validatePassword } from '@/utils';
import { sendNewPassword } from '@/api/sendNewPassword';
import { toast } from 'react-toastify';

interface IPasswordRenovat {
  password: string;
  confirmPassword: string;
}

interface PasswordRenovationInputPasswordProps {
  token: string | null;
  onCloseModal: () => void;
}
export const PasswordRenovationInputPassword: React.FC<
  PasswordRenovationInputPasswordProps
> = ({ token, onCloseModal }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isBluredNameInput, setIsBluredNameInput] = useState('');
  const [onInputPassword, setOnInputPassword] = useState('');
  const [requiredPassword, setRequiredPassword] = useState<IRequiredPassword>({
    hasMinLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [renovationToken, setRenovationToken] = useState<string | null>(token);
  // const [userData, setUserData] = useState<IPasswordRenovat>({
  //   password: '',
  //   confirmPassword: '',
  // });

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<IRegisterFormInputsPassword>({
    mode: 'onChange',
  });

  const onSubmit = async (data: IRegisterFormInputsPassword) => {
    const { password } = data;
    if (!renovationToken) return;
    try {
    const response = await sendNewPassword(password, renovationToken);
      console.log('RESPONSE_>>>>>>>>>>>>>>>>', response.statusCode);
      const { message } = response;
      console.log(message)
      response.statusCode = response.statusСode;
      delete response.statusСode;

      console.log(response.statusCode); 
      if (response.statusCode === 200) {
        toast.success(`Вітаю твій пароль успішно змінено!`);
        onCloseModal();
      }
      
    } catch (error) {
      toast.error("Токен недійсний, повторіть спробу з email!");
      console.log(error);
    }
  };

  useEffect(() => {
    setRequiredPassword(prev => ({
      ...prev,
      ...statusPassword(onInputPassword),
    }));
  }, [onInputPassword]);

  // Error handling on blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // setErrorMessage('');
    const { name } = e.target;
   
    if (name === 'confirmPassword') {
      trigger('confirmPassword');
    }
    if (name === 'password') {
      trigger('password');
    }
    setIsBluredNameInput(name);
  };

  return (
    <div className={`flex flex-col h-full justify-between`}>
      <h1 className={`mb-8`}>Відновлення паролю</h1>
      <div className={`flex flex-col h-full justify-between`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-6 w-[500px]"
        >
          <div className="relative">
            <SharedInput
              autofocus
              onInput={(value: string) => {
                setOnInputPassword(value);
              }}
              placeholder="Пароль"
              id="password"
              autocomplete="on"
              type="password"
              isSubmitted={isSubmitted}
              onBlur={e => handleBlur(e)}
              register={register}
              validation={{ required: true, validate: validatePassword }}
              errors={errors}
            />

            {errors.password?.message && (
              <StatusBarPassword
                requiredPassword={requiredPassword}
                className="absolute mt-[4px]"
              />
            )}
          </div>

          <div className={`relative`}>
            <SharedInput
              placeholder="Підтвердіть пароль"
              id="confirmPassword"
              autocomplete="new-password"
              type="password"
              isSubmitted={isSubmitted}
              onBlur={e => handleBlur(e)}
              register={register}
              validation={{
                required: true,
                validate: value => value === watch('password'),
              }}
              errors={errors}
            />
            {(isSubmitted || isBluredNameInput === 'confirmPassword') &&
              errors.confirmPassword && (
                <SharedItemStatusBar
                  valid={false}
                  text="Паролі не співпадають"
                  sizeIcon={``}
                  className={`absolute mt-[4px]`}
                />
              )}
          </div>

          <SharedBtn
            type="submit"
            onClick={() => setIsSubmitted(true)}
            primary
            className={`w-[364px] mt-10 ml-auto mr-auto`}
          >
            Відновити пароль{' '}
          </SharedBtn>
        </form>
        <PrivacyAgreement />
      </div>
    </div>
  );
};

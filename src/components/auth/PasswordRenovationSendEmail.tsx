import { IRegisterFormInputEmail } from '@/types';
import { useForm } from 'react-hook-form';
import { SharedBtn, SharedInput, SharedItemStatusBar } from '../ui';
import { useEffect, useState } from 'react';
import { validateEmail } from '@/utils';
import { renovationPasswordByEmail } from '@/api/renovationPasswordByEmail';
import { toast } from 'react-toastify';

interface PasswordRenovationSendEmailProps {
  onCloseModal: () => void;
}
export const PasswordRenovationSendEmail: React.FC<
  PasswordRenovationSendEmailProps
> = ({ onCloseModal }) => {
  const [emailUser, setEmailUser] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<IRegisterFormInputEmail>({
    mode: 'onChange',
  });

  const onSubmit = async (data: IRegisterFormInputEmail) => {
    if (!data) return;

    const userData = Object.fromEntries(Object.entries(data));
    const email = userData.email;

    setEmailUser(email);
  };

  useEffect(() => {
    if (!emailUser) return;
    const getUser = async (email: string) => {
      console.log('DO_REQUEST!');
      try {
        const { status } = await renovationPasswordByEmail(email);
        console.log(status);

        if (status === 200) {
          // toast.success(`Email надіслано!`);
          setIsEmailSent(true);
          // onCloseModal();
        }
        if (status === 404) {
          setErrorMessage('Такий email не існує');
        }
        if (status === 401) {
          setErrorMessage('Цей email не підтверджено');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser(emailUser);
  }, [emailUser]);

  return (
    <div className={`flex flex-col h-full gap-8`}>
      <h1 className="">Відновлення паролю</h1>
      {isEmailSent ? (
        <p className="text-center text-xl w-[500px]">
          Email на адресу <span className='underline'>{emailUser}</span> надіслано
        </p>
      ) : (
        <>
          {' '}
          <p className="text-start text-xl w-[500px]">
            Введіть адресу електронної пошти, до якої привʼязаний ваш обліковий
            запис.
          </p>
          <div className={`flex flex-col h-full`}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col rounded-lg gap-8 w-[500px]"
            >
              <div className={`relative`}>
                <SharedInput
                  id="email"
                  autofocus
                  isSubmitted={isSubmitted}
                  onInput={async () => {
                    setErrorMessage('');
                    await trigger('email'); // Trigger validation on input
                  }}
                  placeholder="Введіть email"
                  autocomplete="email"
                  type="email"
                  register={register}
                  validation={{ required: true, validate: validateEmail }}
                  errors={errors}
                />
                {(isSubmitted && errors.email?.message) || errorMessage ? (
                  <SharedItemStatusBar
                    valid={false}
                    text={`${errors.email?.message ?? errorMessage}`}
                    sizeIcon={`w-6 h-6`}
                    className={`absolute mt-[4px]`}
                  />
                ) : null}
              </div>

              <SharedBtn
                type="submit"
                onClick={() => setIsSubmitted(true)}
                // disabled={}
                primary
                className="w-[364px] mx-auto mt-8"
              >
                Продовжити
              </SharedBtn>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

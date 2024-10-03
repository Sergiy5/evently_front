import { IRegisterFormInputEmail } from '@/types';
import { set, useForm } from 'react-hook-form';
import {
  PrivacyAgreement,
  SharedBtn,
  SharedInput,
  SharedItemStatusBar,
} from '../ui';
import { useEffect, useState } from 'react';
import { getUserByEmail } from '@/api/getUserByEmail';
import { validateEmail } from '@/utils';

interface PasswordRenovationProps {
  onCloseModal: () => void;
}
export const PasswordRenovation: React.FC<PasswordRenovationProps> = ({
  onCloseModal,
}) => {
  const [emailUser, setEmailUser] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | boolean>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { isValid, errors },
  } = useForm<IRegisterFormInputEmail>({
    mode: 'onChange',
  });

  const onSubmit = async (data: IRegisterFormInputEmail) => {
    if (!data) return;

    const userData = Object.fromEntries(Object.entries(data));
    const email = userData.email;
    //   if (!validateEmail(email)) {
    //     setErrorMessage('Невірний формат електронної пошти');
    //     return;
    //   }
    setEmailUser(email);
  };

  useEffect(() => {
    if (!emailUser) return;
    // console.log('in_use_effect');
    const getUser = async (email: string) => {
      try {
        const response = await getUserByEmail(email);

        if (response.emailExist === true) {
          setErrorMessage('Такий імейл вже існує');
        }

        if (response.emailExist === false) {
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUser(emailUser);
  }, [emailUser]);

  console.log('isValid', isValid);
  return (
    <div className={`flex flex-col h-full justify-between`}>
      <h1 className="mb-16">Відновлення паролю</h1>
      <div className={`flex flex-col h-full gap-8`}>
        <p className="text-start text-xl w-[500px]">
          Введіть адресу електронної пошти або номер, до якої прив`язаний ваш
          обліковий запис.
        </p>
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
                setErrorMessage(false);
                await trigger('email'); // Trigger validation on input
              }}
              placeholder="Імейл"
              autocomplete="email"
              type="email"
              register={register}
              validation={{ required: true, validate: validateEmail }}
              errors={errors}
            />
            {isSubmitted && errors.email?.message ? (
              <SharedItemStatusBar
                valid={!errors.email?.message}
                text={`${errors.email?.message}`}
                sizeIcon={`w-6 h-6`}
                className={`absolute mt-[4px]`}
              />
            ) : (
              errorMessage && (
                <SharedItemStatusBar
                  valid={false}
                  text={errorMessage}
                  sizeIcon={`w-6 h-6`}
                  className={`absolute mt-[4px]`}
                />
              )
            )}
            {/* {isSubmitted && errorMessage && (
              <SharedItemStatusBar
                valid={false}
                text={errorMessage}
                sizeIcon={`w-6 h-6`}
                className={`absolute mt-[4px]`}
              />
            )} */}
          </div>

          <SharedBtn
            type="submit"
            onClick={() => setIsSubmitted(true)}
            // disabled={}
            primary
            className="w-[364px] mx-auto"
          >
            Продовжити
          </SharedBtn>
        </form>
      </div>
      <PrivacyAgreement />
    </div>
  );
};

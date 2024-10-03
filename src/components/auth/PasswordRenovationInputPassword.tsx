import { useEffect, useState } from "react";
import { PrivacyAgreement, SharedBtn, SharedInput, SharedItemStatusBar, StatusBarPassword } from "../ui";
import { useForm } from "react-hook-form";
import { IRegisterFormInputsPassword, IRequiredPassword } from "@/types";
import { statusPassword, validatePassword } from "@/utils";

interface IPasswordRenovat {
    password: string;
    confirmPassword: string;
}
export const PasswordRenovationInputPassword: React.FC = () => {
  const [onInputPassword, setOnInputPassword] = useState('');
  const [requiredPassword, setRequiredPassword] = useState<IRequiredPassword>({
    hasMinLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
    const [userData, setUserData] = useState<IPasswordRenovat>({
      password: '',
      confirmPassword: '',
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<IRegisterFormInputsPassword>({
    mode: 'onChange',
  });

  const onSubmit = async (data: IRegisterFormInputsPassword) => {
    const { password, confirmPassword } = data;

    setUserData(prev => ({ ...prev, password, confirmPassword }));
  };

    useEffect(() => {
      console.log(userData);
    setRequiredPassword(prev => ({
      ...prev,
      ...statusPassword(onInputPassword),
    }));
  }, [onInputPassword]);
    
    

  return (
    <div className={`flex flex-col h-full justify-between`}>
      <h1 className={`mb-16`}>Створити акаунт</h1>
      <div className={`flex flex-col h-full justify-between`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-10 w-[500px]"
        >
          <div className="relative">
            <SharedInput
              onInput={(value: string) => {
                setOnInputPassword(value);
              }}
              placeholder="Пароль"
              id="password"
              autocomplete="on"
              type="password"
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
              register={register}
              validation={{
                required: true,
                validate: value => value === watch('password'),
              }}
              errors={errors}
            />
            {errors.confirmPassword && (
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
            disabled={!isValid}
            primary
            className={`w-[364px] mt-10 ml-auto mr-auto`}
          >
            Створити акаунт
          </SharedBtn>
        </form>
        <PrivacyAgreement />
      </div>
    </div>
  );
};
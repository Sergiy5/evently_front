import { PrivacyAgreement, SharedBtn } from "./ui";

interface RegisterConirmEmailProps {
  setStatusAuth: (status: 'register_email') => void;
}
export const RegisterConirmEmail: React.FC<RegisterConirmEmailProps> = ({
  setStatusAuth,
}) => {
  
  return (
    <div className={`flex flex-col items-end justify-end mb-6 mx-9`}>
      <div className="flex flex-col gap-[60px] w-[500px]">
        <p className="text-center text-xl w-[480px]">
          Для завершення реєстрації перевірте свою електронну пошту та перейдіть
          за посиланням у листі.
        </p>
        <div className="flex justify-between">
          <SharedBtn type="button" className="w-60">
            Відправити повторно
          </SharedBtn>
          <SharedBtn
            onClick={() => setStatusAuth('register_email')}
            type="button"
            transparent
            className="w-60"
          >
            Змінити email
          </SharedBtn>
        </div>
      </div>
      <PrivacyAgreement className="mt-48 h-[38px]" />
    </div>
  );
};
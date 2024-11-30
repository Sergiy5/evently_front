import { PrivacyAgreement, SharedBtn } from '../ui';

interface RegisterConirmEmailProps {
  // eslint-disable-next-line no-unused-vars
  setStatusAuth: (status: 'register_email') => void;
}
export const RegisterConfirmEmail: React.FC<RegisterConirmEmailProps> = ({
  setStatusAuth,
}) => {
  return (
    <div className={`flex flex-col h-full justify-between`}>
      <div className="flex flex-col justify-start gap-[32px] w-[500px]">
        <h1>Активація акаунту</h1>
        <p className="text-start text-xl w-[500px]">
          Для завершення реєстрації перевірте свою електронну пошту та перейдіть
          за посиланням у листі.
        </p>
        <div className="flex justify-between mt-8">
          <SharedBtn type="button" primary className="w-60">
            Відправити повторно
          </SharedBtn>

          <SharedBtn
            onClick={() => setStatusAuth('register_email')}
            type="button"
            secondary
            className="w-60"
          >
            Змінити email
          </SharedBtn>
        </div>
      </div>
      <PrivacyAgreement />
    </div>
  );
};

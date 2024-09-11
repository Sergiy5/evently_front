import { PrivacyAgreement, SharedBtn } from "./ui";

interface RegisterConirmEmailProps {}
export const RegisterConirmEmail: React.FC<RegisterConirmEmailProps> = () => {
    
    return (
      <div>
        <div>
          <p>
            Для завершення реєстрації перевірте свою електронну пошту та
            перейдіть за посиланням у листі.
          </p>
          <div className="flex justify-between">
            <SharedBtn type="button">Відправити повторно</SharedBtn>
            <SharedBtn type="button" transparent>
              Змінити email
            </SharedBtn>
          </div>
        </div>
        <PrivacyAgreement className="mt-12 h-[38px]" />
      </div>
    );
};
import { SharedItemStatusBarPassword} from "."


interface RequiredPasswordInterface {
    hasMinLength: boolean
    hasUppercase: boolean
    hasNumber: boolean
    hasSpecialChar: boolean 
}
interface StatusBarPasswordProps {
  requiredPassword: RequiredPasswordInterface;
  className: string;
}
export const StatusBarPassword: React.FC<StatusBarPasswordProps> = ({
  requiredPassword,
  className,
}) => {
  return (
    <ul className={`flex w-full text-xs justify-between ${className}`}>
      <li className={``}>
        <SharedItemStatusBarPassword
          text="Мінімум 8 символів"
          valid={requiredPassword.hasMinLength}
        />
      </li>
      <li className={``}>
        <SharedItemStatusBarPassword
          text="Велика літера"
          valid={requiredPassword.hasUppercase}
        />
      </li>
      <li className={``}>
        <SharedItemStatusBarPassword
          text="Цифра"
          valid={requiredPassword.hasNumber}
        />
      </li>
      <li className={``}>
        <SharedItemStatusBarPassword
          text="Спеціальний символ"
          valid={requiredPassword.hasSpecialChar}
        />
      </li>
    </ul>
  );
};
import { Link } from 'react-router-dom';

export const PrivacyAgreement = () => {
  return (
    <p className='text-base font-normal w-[520px]'>
      Натискаючи кнопку "Зареєструватися" я погоджуюся з{' '}
      <Link to="/privacy-policy">Політикою конфіденційності</Link> та{' '}
      <Link to="/terms-of-service">Правилами використання</Link> сервісу.
    </p>
  );
};

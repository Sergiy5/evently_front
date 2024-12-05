import { FaInstagram, FaViber } from 'react-icons/fa';
import { FiFacebook } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '../container/Container';
import MainLogo from '../ui/Logo';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  const iconsStyles = 'w-6 h-6 mr-6 hover:[color:#9B8FF3] cursor-pointer';

  return (
    <Container className="flex pl-[90px] pb-[40px]">
      <div className="pr-[159px]">
        <div
          className="background-background cursor-pointer pb-[64px]"
          onClick={() => {
            navigate('/');
          }}
        >
          <MainLogo />
        </div>
        <div>+380(99) 574 56 76</div>
      </div>
      <nav className="pr-[140px]">
        <Link to="/about" className="block pb-6 hover:font-bold">
          Про нас
        </Link>
        <Link to="/organizers" className="block pb-6 hover:font-bold">
          Організаторам
        </Link>
        <Link to="/office" className="block pb-6 hover:font-bold">
          Кабінет
        </Link>
        <Link
          to="/ReturnsAndPayment"
          className="block hover:font-bold w-[180px]"
        >
          Повернення та оплата
        </Link>
      </nav>
      <nav className="pr-[190px]">
        <Link to="/OfferAgreement" className="block pb-6 hover:font-bold">
          Договір-оферта
        </Link>
        <Link to="/PrivacyPolicy" className="block hover:font-bold w-[225px]">
          Політика конфеденційності
        </Link>
      </nav>
      <div>
        Ми у соц. мережах
        <div className="flex mt-6">
          <FaInstagram className={iconsStyles} />
          <FiFacebook className={iconsStyles} />
          <FaViber className={iconsStyles} />
        </div>
      </div>
    </Container>
  );
};

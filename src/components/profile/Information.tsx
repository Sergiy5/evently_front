import { MdEmail } from 'react-icons/md';

import { selectUser } from '@/redux/auth/selectors';

import { useAppSelector } from '@/hooks/hooks';
import { PiPhoneCall } from 'react-icons/pi';

const Information = () => {
  const { name, role, email, phone } = useAppSelector(selectUser);

  return (
    <div>
      <p className="text-xl">Вітаємо у вашому профілі!</p>
      <div>
        <div className="mt-4 flex gap-4">
          <div className="bg-white rounded-full w-16 h-16"></div>
          <div>
            <h2>{name}</h2>
            <p className="text-xs">{role}</p>
          </div>
        </div>
        <p className="mt-5 flex leading-5">
          <span>
            <MdEmail className="w-5 h-5 mr-2" />
          </span>
          {email}
        </p>
        <p className="mt-5 flex leading-5">
          <span>
            <PiPhoneCall className="w-5 h-5 mr-2" />
          </span>
          {phone ? phone : 'Не вказано'}
        </p>
      </div>
    </div>
  );
};

export default Information;

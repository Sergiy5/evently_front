import CellItem from './CellTable';
import { User } from '@/redux/users/usersSlice';
import { TfiLock } from 'react-icons/tfi';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

interface IProps {
  item: User;
  index: number;
  idPopUp?: number;
  openPopUp: (id: number) => void;
  openModal: (variant: 'delete' | 'status') => void;
}

const UserCard: React.FC<IProps> = ({
  item,
  index,
  idPopUp,
  openPopUp,
  openModal,
}) => {
  const formatedDate = item.creationDate
    ? new Date(item.creationDate).toLocaleDateString('uk-UA')
    : 'Не вказанно';

  return (
    <tr key={item.email} className="relative">
      <CellItem>
        <Link
          to={`/evently_front/profile/${item.id}`}
          className="flex justify-between"
        >
          <span>
            {index + 1}. <span className="underline">{item.name}</span>
          </span>
          {item.status === 'BANNED' && (
            <TfiLock className="fill-lightRed w-3 h-3" />
          )}
        </Link>
      </CellItem>
      <CellItem>{item.phone || 'Не вказано'}</CellItem>
      <CellItem>{item.email}</CellItem>
      <CellItem>{formatedDate}</CellItem>
      <CellItem classes="text-center">
        {item.role
          ? item.role === 'ADMIN'
            ? 'Адмін'
            : 'Відвідувач'
          : 'Не вказанно'}
      </CellItem>
      <CellItem>
        <>
          <AiOutlineUserSwitch
            className="w-6 h-6 mx-auto"
            onClick={() => openPopUp(index)}
          />
          {idPopUp === index && (
            <div className="absolute -bottom-[76px] -right-[35px] bg-lightBlue rounded-[20px] w-[236px] py-6 px-5 z-10 text-center flex flex-col text-base">
              <button onClick={() => openModal('status')}>
                {item.status === 'ACTIVE'
                  ? 'Poзблокувати користувача'
                  : 'Заблокувати користувача'}
              </button>
              <button
                className="mt-4 font-bold"
                onClick={() => openModal('delete')}
              >
                Видалити користувача
              </button>
            </div>
          )}
        </>
      </CellItem>
    </tr>
  );
};

export default UserCard;

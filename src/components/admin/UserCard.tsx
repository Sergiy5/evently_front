import { deleteUser } from '@/utils/adminHttp';
import React from 'react';
import { useNavigate } from 'react-router';

interface IProps {
  user: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const UserCard: React.FC<IProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    const data = await deleteUser(user.id);
    data && navigate('/evently_front/admin/users');
  };

  return (
    <div className="my-4 bg-white">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <div>
        <button onClick={handleDeleteUser}>Delete</button>
        <button>Block</button>
      </div>
    </div>
  );
};

export default UserCard;

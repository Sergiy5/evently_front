import { useParams } from 'react-router';

const UserProfile = () => {
  const params = useParams();
  return <p>{params.userId}</p>;
};

export default UserProfile;

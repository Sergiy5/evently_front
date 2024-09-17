import UserCard from '@/components/admin/UserCard';
import { getUsers } from '@/utils/adminHttp';
import { useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router';

const AdminUsers = () => {
  const [filter, setFilter] = useState('');
  const navigation = useNavigation();
  const data = useLoaderData() as any[];

  let filteredData = data.filter(user => {
    if (user.name.includes(filter) || user.email.includes(filter)) {
      return true;
    }
    return false;
  });

  console.log(navigation.state);

  return (
    <main>
      <input
        type="text"
        value={filter}
        onChange={event => setFilter(event.target.value)}
      />
      <ul>
        {filteredData.map(user => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AdminUsers;

export const loader = () => {
  return getUsers();
};

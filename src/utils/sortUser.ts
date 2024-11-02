import { User } from '@/redux/users/usersSlice';

const sortUser = (
  sort: { col: string; direction: boolean },
  cols: string[],
  data: User[]
) => {
  let sortedData = [...data];
  if (sort.col === cols[0]) {
    sortedData = sortedData.sort((user1, user2) =>
      sort.direction
        ? user1.name.localeCompare(user2.name)
        : user2.name.localeCompare(user1.name)
    );
  } else if (sort.col === cols[1]) {
    sortedData = sortedData.sort((user1, user2) => {
      let userPhone1 = user1.location ? user1.location : 'Не вказанно';
      let userPhone2 = user2.location ? user2.location : 'Не вказанно';

      return sort.direction
        ? userPhone1.localeCompare(userPhone2)
        : userPhone2.localeCompare(userPhone1);
    });
  } else if (sort.col === cols[2]) {
    sortedData = sortedData.sort((user1, user2) => {
      return sort.direction
        ? user1.email.localeCompare(user2.email)
        : user2.email.localeCompare(user1.email);
    });
  } else if (sort.col === cols[3]) {
    sortedData = sortedData.sort((user1, user2) => {
      let userCreatedDate1 = user1.creationDate
        ? user1.creationDate.toString()
        : 'Не вказанно';
      let userCreatedDate2 = user2.creationDate
        ? user2.creationDate.toString()
        : 'Не вказанно';

      return sort.direction
        ? userCreatedDate1.localeCompare(userCreatedDate2)
        : userCreatedDate2.localeCompare(userCreatedDate1);
    });
  } else if (sort.col === cols[4]) {
    sortedData = sortedData.sort((user1, user2) => {
      let userRole1 = user1.role ? user1.role : 'Не вказанно';
      let userRole2 = user2.role ? user2.role : 'Не вказанно';

      return sort.direction
        ? userRole1.localeCompare(userRole2)
        : userRole2.localeCompare(userRole1);
    });
  } else if (sort.col === cols[5]) {
    sortedData = sortedData.sort((user1, user2) => {
      let userStatus1 = user1.status ? user1.status : 'Не вказанно';
      let userStatus2 = user2.status ? user2.status : 'Не вказанно';

      return sort.direction
        ? userStatus1.localeCompare(userStatus2)
        : userStatus2.localeCompare(userStatus1);
    });
  } else {
    sortedData = [...data];
  }

  return sortedData;
};

export default sortUser;

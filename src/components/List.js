import React from 'react';
const List = (props) => {
  const { users } = props;
  if (!users || users.length === 0) return <p>No users found</p>;
  return (
    <ul>
      {users.map((user) => {
        return (
          <li key={user.id} className='list'>
            <span>{user.id} </span> - <span>{user.login}</span>
          </li>
        );
      })}
    </ul>
  );
};
export default List;
import React from 'react';
import { useUserContext } from '../context/hooks/useUserContext.ts';
import { Link } from 'react-router-dom';

const UserList: React.FC = () => {
  const { users } = useUserContext();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Список пользователей</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="mb-2">
            <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline">
              {user.name} ({user.email})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
import React from 'react';
import { useUserContext } from '../context/hooks/useUserContext.ts';
import { Link, useNavigate } from 'react-router-dom';

const UserList: React.FC = () => {
  const { users } = useUserContext();
  const navigate = useNavigate(); 

  const onUserAdd = () => navigate('/add');

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-8 bg-gray-100 border rounded-lg shadow-md text-center">
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
      <div className="mt-4">
        <button onClick={onUserAdd} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Добавить пользователя
        </button>
      </div>
    </div>
  );
};

export default UserList;
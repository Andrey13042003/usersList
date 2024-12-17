import React from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../context/hooks/useUserContext.ts';

const UserDetail: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { users } = useUserContext();
  const user = users.find((user) => user.id === parseInt(userId!, 10));

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-8 p-8 bg-gray-100 border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Информация о пользователе</h2>
      <p className="mb-2">
        <span className="text-gray-700 font-bold">Имя: </span> 
        {user.name}
      </p>
      <p className="mb-2">
        <span className="text-gray-700 font-bold">Email: </span> 
        {user.email}
      </p>
      <p className="mb-2"> 
        <span className="text-gray-700 font-bold">Телефон: </span> 
        {user.phone}
      </p>
      <p className="mb-2">
        <span className="text-gray-700 font-bold">Город: </span> 
        {user.city}
      </p>
    </div>
  );
};

export default UserDetail;
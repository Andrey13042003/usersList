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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Информация о пользователе</h2>
      <p>Имя: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Телефон: {user.phone}</p>
      <p>Город: {user.city}</p>
    </div>
  );
};

export default UserDetail;
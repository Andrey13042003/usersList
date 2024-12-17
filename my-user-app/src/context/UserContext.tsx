import React, { useState, useEffect } from 'react';
import { USERS_LIST } from '../data/users.config.js';
import { UserContext } from './hooks/useUserContext.ts';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
}

export interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  deleteUser: (id: number) => void;
}

export const UserProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // В случае с живыми данными - делаем ассинхронный запрос || через useQuery выносим логику в hooks
    const fetchUsers = async () => {
      if (users.length === 0) {
        setUsers(USERS_LIST);
      }
    };

    fetchUsers();
  }, []);

  const addUser = (newUser: Omit<User, 'id'>) => {
    // Состояние теряется после рефреша страницы либо напрямую при изменении урла. 
    // Конкретно для этой задачи (без бека) я бы использовал браузерный localStorage
    const newId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    setUsers([...users, { ...newUser, id: newId }]);
  };


  const updateUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};
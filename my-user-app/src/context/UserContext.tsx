import React, { useState, useEffect, useMemo, useCallback } from 'react';
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

  const addUser = useCallback((newUser: Omit<User, 'id'>) => {
    // Состояние теряется после рефреша страницы либо напрямую при изменении урла. 
    // Конкретно для этой задачи (без бека) я бы использовал браузерный localStorage
    const newId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    setUsers([...users, { ...newUser, id: newId }]);
  }, [users]);


  const updateUser = useCallback((updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  }, [users]);

  const deleteUser = useCallback((id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  }, [users]);

  const contextValue = useMemo(() => ({ users, addUser, updateUser, deleteUser }), [addUser, deleteUser, updateUser, users]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
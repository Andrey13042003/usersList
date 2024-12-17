import React from 'react';

import UserList from './components/UserList.tsx';
import UserForm from './components/UserForm.tsx';
import UserDetail from './components/UserDetail.tsx';

export const RouteItems = [
    { path: '/', element: <UserList />},
    { path: '/add', element: <UserForm />},
    { path: '/users/:userId', element: <UserDetail />},
]
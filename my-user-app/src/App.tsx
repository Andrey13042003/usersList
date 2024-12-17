import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext.tsx';
import { RouteItems } from './App.config.tsx';


const App: React.FC = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="container mx-auto">
          <Routes>
            {RouteItems.map(({ path, element}) => <Route path={path} element={element} />)}
          </Routes>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;

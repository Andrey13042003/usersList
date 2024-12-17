import { useContext, createContext } from 'react';
import { UserContextType } from '../UserContext.tsx';


export const UserContext = createContext<UserContextType | null>(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    
    if (context === null) {
      throw new Error('useUserContext must be used within a UserProvider');
    }

    return context;
};

// UserProvider.js
import React, { createContext, useEffect, useState, useContext } from 'react';

import { onAuthStateChanged } from 'firebase/auth';
import AuthService from '../services/AuthService';


import {useNavigate} from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(AuthService.auth.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(AuthService.auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

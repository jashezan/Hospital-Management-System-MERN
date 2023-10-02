// src/hooks/useLogout.js
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useLogout = () => {
  const { dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};

export default useLogout;

import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { clearStoreThunk } from '../../store/notebook';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(clearStoreThunk())
    await dispatch(logout());
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;

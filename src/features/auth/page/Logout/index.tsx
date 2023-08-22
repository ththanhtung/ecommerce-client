import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetCredential } from '../../auth-slice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(resetCredential())
    navigate('../login');
  }, []);
  return <div>Logout</div>;
};

export default Logout;

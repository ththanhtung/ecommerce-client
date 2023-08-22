import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Signup from './page/Signup';
import NotFound from '../../components/NotFound';
import Logout from './page/Logout';

const Auth: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Auth;

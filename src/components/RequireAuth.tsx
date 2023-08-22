import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useTypedSelector } from '../app/store';

interface Props {
  allowedRoles: string[];
}

const RequireAuth: React.FC<Props> = ({ allowedRoles }) => {
  const auth = useTypedSelector((state) => state.auth);
  const location = useLocation();
  return auth.user?.roles.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth.accessToken ? (
    <Navigate to="unauthorize" state={{ from: location }} replace />
  ) : (
    <Navigate to="auth/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

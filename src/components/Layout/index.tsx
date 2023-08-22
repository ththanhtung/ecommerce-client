import React from 'react';
import { Outlet } from 'react-router-dom';
import { StyledLayout } from './styledLayout';

const Layout: React.FC = () => {
  return (
    <StyledLayout>
      <Outlet />
    </StyledLayout>
  );
};

export default Layout;

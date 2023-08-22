import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Auth from './features/auth';
import NotFound from './components/NotFound';
import { GlobalStyles } from './app/GlobalStyled';
import Products from './features/products';
import ProductsPage from './features/products/page/Products';
import Cart from './features/cart';
import RequireAuth from './components/RequireAuth';
import UnAuthorize from './components/UnAuthorize';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<ProductsPage />} />
          <Route path="products/*" element={<Products />} />
          <Route path="auth/*" element={<Auth />} />
          <Route path='unauthorize' element={<UnAuthorize/>}/>

          {/* private routes */}
          <Route element={<RequireAuth allowedRoles={['001']} />}>
            <Route path="cart/*" element={<Cart />} />
          </Route>
        </Route>

        {/* not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

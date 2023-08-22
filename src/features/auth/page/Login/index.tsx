import React, { FormEvent, useState } from 'react';
import { useInput } from '../../../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { shopLogin } from '../../auth-slice';
import { unwrapResult } from '@reduxjs/toolkit';
import { Location, useLocation, useNavigate } from 'react-router-dom';

interface LocationProps {
  state: {
    from: Location
  }
}

const Login: React.FC = () => {
  const [email, resetEmail, emailAttrs] = useInput('emailLoginInput', '');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation() as unknown as LocationProps
  const from = location.state?.from?.pathname || '../..'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const actionResult = await dispatch(shopLogin({ email, password }));
    const currentUser = unwrapResult(actionResult);
    if (currentUser.metadata.shop && currentUser.metadata.tokens) {
      navigate(from, {replace: true})
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="user-infor">
          <div className="input-field">
            <label htmlFor="email">email</label>
            <input type="email" id="email" {...emailAttrs} />
          </div>
          <div className="input-field">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

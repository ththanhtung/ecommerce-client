import React, { FormEvent, useState } from 'react';
import { StyledForm } from './styledForm';
import { StyledContainer } from './stlyledContainer';
import { useInput } from '../../../../hooks/useInput';
import { useDispatch } from 'react-redux';
import { createNewShop } from '../../auth-slice';
import { AppDispatch, useTypedSelector } from '../../../../app/store';
import { unwrapResult } from '@reduxjs/toolkit';

const Signup: React.FC = () => {
  const [user, resetUser, userAttrs] = useInput('userInput', '');
  const [email, resetEmail, emailAttrs] = useInput('emailInput', '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { error } = useTypedSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert('password and confirm password do not match!');
      return;
    }

    const signupResult = await dispatch(
      createNewShop({
        name: user,
        email: email,
        password: password,
      })
    );
  };
  return (
    <StyledContainer>
      <div className="form-container">
        <h2>sign up</h2>
        <StyledForm onSubmit={handleSubmit}>
          <div className="user-infor">
            <div className="input-field">
              <label htmlFor="email">email</label>
              <input type="email" id="email" {...emailAttrs} />
            </div>
            <div className="input-field">
              <label htmlFor="username">username</label>
              <input type="text" id="username" {...userAttrs} />
            </div>
            <div className="input-field">
              <label htmlFor="pasword">password</label>
              <input
                type="password"
                id="pasword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-field">
              <label htmlFor="confirm-password">confirm password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="submit-btn">
            <button type="submit">submit</button>
          </div>
        </StyledForm>
      </div>
    </StyledContainer>
  );
};

export default Signup;

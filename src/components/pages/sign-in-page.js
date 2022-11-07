/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BlogApiExceptionCode } from '../../service/service';
import { signIn, authTokenSelector } from '../../store/reducer/userSlice';
import FormContainer from '../forms/form-container';
import SignInForm from '../forms/sign-in-form';

const useNoAuthFilter = () => {
  const authToken = useSelector(authTokenSelector);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authToken) return;
    navigate('/');
  }, []);
};

function SignInPage() {
  useNoAuthFilter();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);

  const handleSignIn = async (data) => {
    try {
      await dispatch(signIn(data)).unwrap();
      navigate('/');
    } catch (e) {
      if (e.code === BlogApiExceptionCode.INVALID_EMAIL_OR_PASSWORD) {
        setAuthFailed(true);
        return;
      }
      throw e;
    }
  };

  return (
    <FormContainer>
      <SignInForm signInFailed={authFailed} onCommit={handleSignIn} />
    </FormContainer>
  );
}

export default SignInPage;

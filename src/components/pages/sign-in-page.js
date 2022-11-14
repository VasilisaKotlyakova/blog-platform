/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { httpStatusCode } from '../../services/service';
import { signIn, authTokenSelector } from '../../store/reducers/userSlice';
import SignInForm from '../forms/sign-in-form';
import styles from '../forms/form-container.module.scss';

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
      if (e.code === httpStatusCode.INVALID_EMAIL_OR_PASSWORD) {
        setAuthFailed(true);
        return;
      }
      throw e;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.body} style={{width: "450px"}}>
        <SignInForm signInFailed={authFailed} onCommit={handleSignIn} />
      </div>
    </div>
  );
}

export default SignInPage;

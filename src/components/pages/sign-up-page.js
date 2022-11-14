/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signUp } from '../../store/reducers/userSlice';
import SignUpForm from '../forms/sign-up-form';
import styles from '../forms/form-container.module.scss';

const useNoAuthFilter = () => {
  const authToken = useSelector((state) => state.user.authToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) return;
    navigate('/');
  }, []);
};

function SignUpPage() {
  useNoAuthFilter();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (data) => {
    await dispatch(signUp(data)).unwrap();
    navigate('/');
  };
  return (
    <div className={styles.container}>
      <div className={styles.body} style={{width: "450px"}}>
        <SignUpForm onCommit={handleSignUp} />
      </div>
    </div>
  );
}

export default SignUpPage;

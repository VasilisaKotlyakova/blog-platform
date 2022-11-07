import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signUp } from '../../store/reducer/userSlice';
import FormContainer from '../forms/form-container';
import SignUpForm from '../forms/sign-up-form';

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
    <FormContainer>
      <SignUpForm onCommit={handleSignUp} />
    </FormContainer>
  );
}

export default SignUpPage;

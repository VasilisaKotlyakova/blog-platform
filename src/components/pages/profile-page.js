import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Api from '../../service/service';
import { profileSelector, authTokenSelector } from '../../store/reducer/userSlice';
import FormContainer from '../forms/form-container';
import ProfileForm from '../forms/profile-form';

export const useAuthFilter = () => {
  const authToken = useSelector(authTokenSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) return;
    navigate('/sign-in');
  }, []);
};

function ProfilePage() {
  useAuthFilter();
  const profile = useSelector(profileSelector);
  const navigate = useNavigate();

  const handleSave = async (user) => {
    await Api.default.editProfile(user);
    navigate('/');
  };

  return (
    <FormContainer>
      <ProfileForm defaultValue={profile} onCommit={handleSave} />
    </FormContainer>
  );
}

export default ProfilePage;

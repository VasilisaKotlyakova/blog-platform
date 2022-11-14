/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { apiConnect } from '../../services/service';
import { profileSelector, authTokenSelector } from '../../store/reducers/userSlice';
import ProfileForm from '../forms/profile-form';
import styles from '../forms/form-container.module.scss';

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
    const res = await apiConnect.editProfile(user);
    if(res.status === 200) {
      navigate('/success');
    } else navigate('/error');
  };

  return (
    <div className={styles.container}>
      <div className={styles.body} style={{width: "450px"}}>
        <ProfileForm defaultValue={profile} onCommit={handleSave} />
      </div>
    </div>
  );
}

export default ProfilePage;

/* eslint-disable */
import { Skeleton, notification } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import Header from '../header/header';
import { fetchProfile } from '../../store/reducers/userSlice';
import { errorSelector } from '../../store/reducers/errorSlice';

import style from './app.module.scss';
import 'antd/dist/antd.css';

export const useSignOut = () => {
  const navigate = useNavigate();
  const store = useStore();
  const prevProfileRef = useRef(store.getState().user.profile);
  useEffect(() => {
    return store.subscribe(() => {
      const currProfile = store.getState().user.profile;
      if (prevProfileRef.current === currProfile) return;
      if (currProfile == null) navigate('/sign-in');
    });
  });
};

export const useErrorNotification = () => {
  const error = useSelector(errorSelector);
  useEffect(() => {
    if (!error) return;
    notification.error({
      message: 'An error occurred',
      description: <p>{String(error)}</p>,
    });
  }, [error]);
};

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useErrorNotification();
  useSignOut();

  useEffect(() => {
    dispatch(fetchProfile()).then(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className={style.loadingContainer}>
          <Skeleton />
        </div>
      ) : (
        <div className={style.contentContainer}>
          <Header />
          <Outlet />
        </div>
      )}
    </>
  );
}

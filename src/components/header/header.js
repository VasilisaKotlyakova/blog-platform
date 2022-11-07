import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { profileSelector, signOut } from '../../store/reducer/userSlice';

import style from './header.module.scss';

function Header() {
  const profile = useSelector(profileSelector);
  return (
    <header className={style.container}>
      <Link to="/" className={style.link}>
        <h2>Realworld Blog</h2>
      </Link>
      {profile ? <SignedInUserControls /> : <SignedOutUserControls />}
    </header>
  );
}

function SignedOutUserControls() {
  return (
    <div className={style.userControls}>
      <SignInButton />
      <SignUpButton />
    </div>
  );
}

function SignedInUserControls() {
  const profile = useSelector(profileSelector);
  return (
    <div className={style.userControls}>
      <NewArticleButton />
      <Link to="/profile" className={style.avatar}>
        <span>{profile.username}</span>
        <img
          src={profile.image}
          alt="Author"
          onError={(e) => {
            e.currentTarget.onerror = null; // prevents looping
            e.currentTarget.src = '../img/avatar.png';
          }}
        />
      </Link>
      <SignOutButton />
    </div>
  );
}

function SignInButton() {
  return (
    <Link to="/sign-in">
      <Button className={style.signButton}>Sign In</Button>
    </Link>
  );
}

function SignUpButton() {
  return (
    <Link to="/sign-up">
      <Button className={style.signButton}>Sign Up</Button>
    </Link>
  );
}

function SignOutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/sign-in');
  };
  return <Button onClick={handleSignOut}>Log Out</Button>;
}

function NewArticleButton() {
  return (
    <Link to="/new-article">
      <Button className={style.createArticle}>Create article</Button>
    </Link>
  );
}

export default Header;

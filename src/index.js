import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Alert } from 'antd';

import App from './components/app';
import store from './store/store';
import ArticleList from './components/pages/article-list';
import SignInPage from './components/pages/sign-in-page';
import SignUpPage from './components/pages/sign-up-page';
import ProfilePage from './components/pages/profile-page';
import NewArticlePage from './components/pages/new-article-page';
import ArticlePage from './components/pages/article-page';
import EditArticlePage from './components/pages/edit-article-page';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<ArticlePage />} />
          <Route path="articles/:slug/edit" element={<EditArticlePage />} />
          <Route path="new-article" element={<NewArticlePage />} />
          <Route path="sign-in" element={<SignInPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route
            path="success"
            element={<Alert className="alert" message="Profile changed successfully" type="success" showIcon />}
          />
          <Route path="error" element={<Alert className="alert" message="Error" type="error" showIcon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

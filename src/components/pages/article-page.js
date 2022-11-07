/* eslint-disable */
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Api from '../../service/service';
import { profileSelector } from '../../store/reducer/userSlice';
import Article from '../article/article';

import style from './article-page.module.scss';

function ArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const profile = useSelector(profileSelector);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    Api.default.fetchArticle(slug).then((article) => setArticle(article.article));
  }, [slug]);

  if (!article) {
    return <Spin size="large" />;
  }

  const handleFavoriteChange = async (isFavorite) => {
    const delta = isFavorite ? 1 : -1;
    const newArticle = {
      ...article,
      favorited: isFavorite,
      favoritesCount: article.favoritesCount + delta,
    };
    setArticle(newArticle);
    await (isFavorite ? Api.default.favorite(article) : Api.default.unvaforite(article));
  };

  const handleDelete = async () => {
    await Api.default.deleteArticle(article);
    navigate('/');
  };

  return (
    <div className={style.container}>
      <Article
        article={article}
        onFavoriteChange={profile ? handleFavoriteChange : null}
        onDelete={handleDelete}
        showBody={true}
        showControls={article.author.username === profile?.username}
      />
    </div>
  );
}

export default ArticlePage;

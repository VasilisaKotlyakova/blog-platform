/* eslint-disable */
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { apiConnect } from '../../services/service';
import ArticleForm from '../forms/article-form';
import styles from "../forms/form-container.module.scss";

function NewArticlePage() {
  const navigate = useNavigate();

  const handleNewArticle = async (article) => {
    const result = await apiConnect.createArticle(article);
    navigate(`/articles/${result.article.slug}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.body} style={{width: "950px"}}>
        <ArticleForm onCommit={handleNewArticle} h2="Create new article" />
      </div>
    </div>
  );
}

export default NewArticlePage;

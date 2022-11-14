/* eslint-disable */
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { apiConnect } from '../../services/service';
import ArticleForm from '../forms/article-form';
import styles from '../forms/form-container.module.scss';

function EditArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    apiConnect
      .fetchArticle(slug)
      .then((article) => article.article)
      .then(setArticle);
  }, [slug]);

  const handleEditArticle = async (data) => {
    const newArticle = { ...article, ...data };
    const result = await apiConnect.updateArticle(newArticle);
    navigate(`/articles/${result.article.slug}`);
  };

  if (!article) {
    return <Spin />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.body} style={{width: "950px"}}>
        <ArticleForm initialValue={article} onCommit={handleEditArticle} h2="Edit article" />
      </div>
    </div>
  );
}

export default EditArticlePage;

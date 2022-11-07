/* eslint-disable */
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Api from '../../service/service';
import ArticleForm from '../forms/article-form';
import FormContainer from '../forms/form-container';

function EditArticlePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    Api.default
      .fetchArticle(slug)
      .then((article) => article.article)
      .then(setArticle);
  }, [slug]);

  const handleEditArticle = async (data) => {
    const newArticle = { ...article, ...data };
    const result = await Api.default.updateArticle(newArticle);
    navigate(`/articles/${result.article.slug}`);
  };

  if (!article) {
    return <Spin />;
  }

  return (
    <FormContainer>
      <ArticleForm initialValue={article} onCommit={handleEditArticle} h2="Edit article" />
    </FormContainer>
  );
}

export default EditArticlePage;

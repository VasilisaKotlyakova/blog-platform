import React from 'react';
import { useNavigate } from 'react-router-dom';

import Api from '../../service/service';
import ArticleForm from '../forms/article-form';
import FormContainer from '../forms/form-container';

function NewArticlePage() {
  const navigate = useNavigate();

  const handleNewArticle = async (article) => {
    const result = await Api.default.createArticle(article);
    navigate(`/articles/${result.article.slug}`);
  };

  return (
    <FormContainer>
      <ArticleForm onCommit={handleNewArticle} h2="Create new article" />
    </FormContainer>
  );
}

export default NewArticlePage;

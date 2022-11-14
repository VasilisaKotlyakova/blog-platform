/* eslint-disable */
import { Pagination, Skeleton } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Article from '../article/article';
import Api, { apiConnect } from '../../services/service';
import { profileSelector } from '../../store/reducers/userSlice';

import style from './article-list.module.scss';

function ArticleList() {
  const profile = useSelector(profileSelector);
  const step = 5;
  const [articles, setArticles] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const loadArticlePage = async (page) => {
    setArticles(null);
    const offset = page * step - step;
    const result = await apiConnect.fetchArticles(offset, step);
    setPageCount(Math.ceil(result.articlesCount / step));
    setArticles(result.articles);
  };
  useEffect(() => {
    loadArticlePage(currentPage);
  }, []);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await loadArticlePage(page);
  };

  const handleFavoriteChange = async (article, isFavorite) => {
    const newArticles = articles.map((item) => {
      if (item.slug !== article.slug) return item;
      const delta = isFavorite ? 1 : -1;
      return { ...item, favorited: isFavorite, favoritesCount: item.favoritesCount + delta };
    });
    setArticles(newArticles);
    await (isFavorite ? apiConnect.favorite(article) : apiConnect.unvaforite(article));
  };

  const handleDelete = async (article) => {
    const newArticles = articles.filter((item) => item.slug !== article.slug);
    setArticles(newArticles);
    await apiConnect.deleteArticle(article);
  };

  if (!articles) {
    return <Skeleton />;
  }

  return (
    <div className={style.container}>
      {articles.map((article) => (
        <Article
          article={article}
          key={article.slug}
          onDelete={() => handleDelete(article)}
          showControls={article.author.username === profile?.username}
          onFavoriteChange={profile ? (isFavorite) => handleFavoriteChange(article, isFavorite) : null}
        />
      ))}
      <Pagination
        current={currentPage}
        total={pageCount}
        defaultPageSize={step}
        hideOnSinglePage={true}
        showSizeChanger={false}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default ArticleList;

import { HeartFilled, HeartOutlined, InfoCircleFilled } from '@ant-design/icons';
import { Button, Dropdown, Row, Space } from 'antd';
import { format } from 'date-fns';
import { parse } from 'marked';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import sanitize from 'sanitize-html';

import style from './article.module.scss';

function Article({ article, onDelete = null, onFavoriteChange = null, showBody = false, showControls = false }) {
  return (
    <article className={style.container}>
      <ArticleHeader article={article} onFavoriteChange={onFavoriteChange} />
      {article.tagList.length > 0 ? <ArticleTags article={article} /> : null}
      <ArticlePreview article={article} showControls={showControls} onDelete={onDelete} />
      {showBody ? <ArticleBody article={article} /> : null}
    </article>
  );
}

function ArticleHeader({ article, onFavoriteChange }) {
  const createDate = useMemo(() => format(new Date(article.createdAt), 'PP'), [article.createdAt]);
  return (
    <header>
      <div className={style.titleBox}>
        <Link className={style.link} to={`/articles/${article.slug}`}>
          <h2>{article.title}</h2>
        </Link>
        <div className={style.likeBox}>
          {article.favorited ? (
            <HeartFilled className={style.heartFilled} onClick={() => onFavoriteChange?.(false)} />
          ) : (
            <HeartOutlined className={style.heartOutlined} onClick={() => onFavoriteChange?.(true)} />
          )}
          {article.favoritesCount > 0 ? <span>{article.favoritesCount}</span> : null}
        </div>
      </div>

      <div className={style.authorBox}>
        <div>
          <h3>{article.author.username}</h3>
          <p>{createDate}</p>
        </div>
        <img src={article.author.image} alt="Author" />
      </div>
    </header>
  );
}

function ArticleTags({ article }) {
  return (
    <ul className={style.tags}>
      {article.tagList.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function ArticlePreview({ article, showControls, onDelete }) {
  return (
    <div className={style.previewContainer}>
      <p className={style.preview}>{article.description}</p>
      {showControls ? (
        <Space>
          <Dropdown overlay={<DeleteArticle onDelete={onDelete} />} trigger="click" placement="bottomLeft" arrow>
            <Button className={style.deleteButton}>Delete</Button>
          </Dropdown>
          <Link to={`/articles/${article.slug}/edit`}>
            <Button className={style.editButton}>Edit</Button>
          </Link>
        </Space>
      ) : null}
    </div>
  );
}

function DeleteArticle({ onDelete }) {
  return (
    <div className={style.deleteArticle}>
      <Row>
        <InfoCircleFilled />
        <p>Are you sure to delete this article?</p>
      </Row>

      <Row justify="end">
        <Space>
          <Button size="small">No</Button>
          <Button type="primary" size="small" onClick={onDelete}>
            Yes
          </Button>
        </Space>
      </Row>
    </div>
  );
}

function ArticleBody({ article }) {
  const content = useMemo(() => sanitize(parse(article.body)), [article.body]);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default Article;

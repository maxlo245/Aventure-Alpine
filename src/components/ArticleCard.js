import React from 'react';

const ArticleCard = ({ article }) => {
  const category = article.category || '';
  const date = article.date ? new Date(article.date).toLocaleDateString() : '';
  const readTime = article.readTime || '';
  const title = article.title || '';
  const excerpt = article.excerpt || article.description || '';
  const author = article.author || '';
  return (
    <article className="card">
      <div className="card-meta">
        <span className="pill">{category}</span>
        <span>{date}</span>
        <span>{readTime ? `${readTime} min` : ''}</span>
      </div>
      <h3>{title}</h3>
      <p>{excerpt}</p>
      <div className="card-footer">Par {author}</div>
    </article>
  );
};

export default ArticleCard;

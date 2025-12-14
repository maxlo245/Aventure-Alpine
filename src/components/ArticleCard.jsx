import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <article className="card">
      <div className="card-meta">
        <span className="pill">{article.category}</span>
        <span>{new Date(article.date).toLocaleDateString()}</span>
        <span>{article.readTime} min</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>
      <div className="card-footer">Par {article.author}</div>
    </article>
  );
};

export default ArticleCard;

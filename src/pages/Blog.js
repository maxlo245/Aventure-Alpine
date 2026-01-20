import React from 'react';
import ExperienceFeed from '../components/ExperienceFeed';
import Articles from './Articles';

const Blog = () => {
  return (
    <section id="blog">
        <h2 className="text-title">Blog & expériences</h2>
        <p className="text-secondary">Retours terrain et contributions de la communauté.</p>
      <Articles />
      <ExperienceFeed />
    </section>
  );
};

export default Blog;

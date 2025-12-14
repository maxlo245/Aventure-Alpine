import React from 'react';
import ExperienceFeed from '../components/ExperienceFeed';
import Articles from './Articles';

const Blog = () => {
  return (
    <section id="blog">
      <h2>Blog & expériences</h2>
      <p>Retours terrain et contributions de la communauté.</p>
      <Articles />
      <ExperienceFeed />
    </section>
  );
};

export default Blog;

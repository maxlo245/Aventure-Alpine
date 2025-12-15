import React from 'react';

const VideoCard = ({ video }) => {
  return (
    <article className="card video-card">
      <div className="video-thumb">
        <img src={video.thumbnail} alt={video.title} />
        <span className="pill pill-dark">{video.duration}</span>
      </div>
      <div className="card-meta">
        <span className="pill">{video.sport}</span>
      </div>
      <h3>{video.title}</h3>
    </article>
  );
};

export default VideoCard;

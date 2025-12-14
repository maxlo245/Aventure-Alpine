import React, { useEffect, useMemo, useState } from 'react';
import { videos as localVideos } from '../data/videos';
import VideoCard from '../components/VideoCard';
import api from '../api/client';

const Videos = () => {
  const [sport, setSport] = useState('Tous');
  const [items, setItems] = useState(localVideos);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/videos');
        setItems(data);
      } catch (err) {
        setError("API indisponible, vidéos locales affichées.");
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    if (sport === 'Tous') return items;
    return items.filter((v) => v.sport === sport);
  }, [sport, items]);

  const sports = ['Tous', ...new Set(items.map((v) => v.sport))];

  return (
    <section id="videos">
      <div className="section-head">
        <div>
          <h2>Vidéos</h2>
          <p>Des images immersives pour préparer ou rêver la prochaine sortie.</p>
        </div>
        <div className="filters">
          <select value={sport} onChange={(e) => setSport(e.target.value)}>
            {sports.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="hint">{error}</p>}
      <div className="adventure-grid">
        {filtered.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
};

export default Videos;

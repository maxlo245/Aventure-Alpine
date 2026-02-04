import React, { useEffect, useState } from 'react';
import api from '../api/client';

const fallbackPosts = [
  { id: 1, author: 'Sofia', title: 'Première sortie en ski de rando', body: 'Belle poudre en forêt, attention aux plaques sous 2200 m.' },
  { id: 2, author: 'Elias', title: 'Arête des Cosmiques', body: 'Vent fort mais super ambiance, prévoir gants techniques.' },
];

const ExperienceFeed = () => {
  const [posts, setPosts] = useState(fallbackPosts);
  const [form, setForm] = useState({ author: '', title: '', body: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/experiences');
        if (Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(fallbackPosts);
        }
      } catch (err) {
        setError("Impossible d'atteindre l'API, données locales affichées.");
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.author || !form.title || !form.body) return;
    const next = { id: Date.now(), ...form };
    setPosts([next, ...posts]);
    setForm({ author: '', title: '', body: '' });
    api.post('/experiences', form).catch(() => {
      // ignore silently, optimistic UI
    });
  };

  return (
    <div className="experience">
      <h3>Partage d'expérience</h3>
      {loading && <p>Chargement...</p>}
      {error && <p className="hint">{error}</p>}
      <form className="experience-form" onSubmit={handleSubmit}>
        <input
          name="author"
          placeholder="Votre prénom"
          value={form.author}
          onChange={handleChange}
        />
        <input
          name="title"
          placeholder="Titre de votre aventure"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="body"
          placeholder="Racontez en quelques lignes..."
          value={form.body}
          onChange={handleChange}
        />
        <button type="submit">Publier</button>
      </form>
      <div className="experience-list">
        {posts.map((post) => (
          <article key={post.id} className="card">
            <div className="card-meta">Par {post.author}</div>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ExperienceFeed;

import React, { useState } from 'react';
import api from './api/client';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Envoi en cours...');
    try {
      await api.post('/contact-messages', formData);
      setStatus('✅ Message envoyé avec succès !');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      setStatus('❌ Erreur lors de l\'envoi. Réessayez ou contactez-nous directement.');
      console.error('Erreur:', error);
    }
  };

  return (
    <section id="contact">
      <h2>Contactez-nous</h2>
      <p>Email: info@aventuresalpines.com</p>
      {status && <p className="hint">{status}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Message:</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </section>
  );
}

export default Contact;
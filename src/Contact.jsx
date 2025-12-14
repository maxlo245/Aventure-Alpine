import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const messageData = { 
      name: formData.name, 
      email: formData.email, 
      message: formData.message 
    };

    // Toujours sauvegarder en local
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    messages.push({
      ...messageData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('contact_messages', JSON.stringify(messages));

    // Essayer d'envoyer à l'API aussi
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      await fetch(`${apiUrl}/api/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });
    } catch (err) {
      console.log('API non disponible, message sauvegardé localement');
    }

    // Toujours afficher succès (car au minimum c'est en localStorage)
    alert(`Merci ${formData.name}, votre message a été reçu !`);
    setFormData({ name: '', email: '', message: '' });
    setLoading(false);
  };

  return (
    <section id="contact">
      <h2>Contactez-nous</h2>
      <p>Email: info@aventuresalpines.com</p>
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
        <button type="submit" disabled={loading}>{loading ? 'Envoi en cours...' : 'Envoyer'}</button>
      </form>
    </section>
  );
}

export default Contact;
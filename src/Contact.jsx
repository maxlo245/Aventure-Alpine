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

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${apiUrl}/api/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: formData.name, 
          email: formData.email, 
          message: formData.message 
        })
      });

      if (response.ok) {
        alert(`Merci ${formData.name}, votre message a été envoyé !`);
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
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
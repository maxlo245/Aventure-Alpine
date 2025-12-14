import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveToLocalStorage = (data) => {
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    messages.push({
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('contact_messages', JSON.stringify(messages));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const messageData = { 
      name: formData.name, 
      email: formData.email, 
      message: formData.message 
    };

    try {
      const response = await fetch(`${apiUrl}/api/contact-messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData)
      });

      if (response.ok) {
        alert(`Merci ${formData.name}, votre message a été envoyé !`);
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Si l'API répond mais erreur, sauvegarder en local aussi
        saveToLocalStorage(messageData);
        alert(`Merci ${formData.name}, votre message a été enregistré localement.`);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      // Si l'API n'est pas accessible, sauvegarder en local
      console.error('Erreur API:', error);
      saveToLocalStorage(messageData);
      alert(`Merci ${formData.name}, votre message a été enregistré (mode hors-ligne).`);
      setFormData({ name: '', email: '', message: '' });
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
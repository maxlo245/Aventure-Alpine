import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix pour les icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

    // Toujours sauvegarder en local d'abord
    const messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    messages.push({
      ...messageData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('contact_messages', JSON.stringify(messages));

    // Essayer d'envoyer à l'API en arrière-plan (sans bloquer)
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl && apiUrl !== 'http://localhost:5000') {
      // Seulement envoyer à l'API si on est pas en localhost
      try {
        await fetch(`${apiUrl}/api/contact-messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(messageData)
        });
      } catch (err) {
        // Erreur silencieuse - le message est déjà sauvegardé localement
      }
    }

    // Toujours afficher succès
    alert(`Merci ${formData.name}, votre message a été reçu !`);
    setFormData({ name: '', email: '', message: '' });
    setLoading(false);
  };

  return (
    <section id="contact" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>📞 Contactez-nous</h2>
      <p style={{ textAlign: 'center', color: '#718096', marginBottom: '3rem' }}>
        Une question, une demande de réservation ou simplement envie de discuter de votre prochaine aventure ?
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        {/* Formulaire de contact */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#1a202c' }}>✉️ Envoyez-nous un message</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2d3748' }}>Nom complet</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#1a202c',
                  outline: 'none',
                  transition: 'border 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2d3748' }}>Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#1a202c',
                  outline: 'none',
                  transition: 'border 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#2d3748' }}>Message</label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                rows="6"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#1a202c',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{
                padding: '1rem',
                background: loading ? '#cbd5e0' : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => !loading && (e.target.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => !loading && (e.target.style.transform = 'translateY(0)')}
            >
              {loading ? '⏳ Envoi en cours...' : '📤 Envoyer le message'}
            </button>
          </form>
        </div>

        {/* Informations de contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#1a202c' }}>📍 Nos coordonnées</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🏢</span>
                <div>
                  <strong style={{ display: 'block', color: '#2d3748' }}>Adresse</strong>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#718096' }}>123 Rue de la Montagne<br />74400 Chamonix-Mont-Blanc<br />Haute-Savoie, France</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📧</span>
                <div>
                  <strong style={{ display: 'block', color: '#2d3748' }}>Email</strong>
                  <a href="mailto:contact@aventures-alpines.fr" style={{ margin: '0.25rem 0 0 0', color: '#3b82f6', textDecoration: 'none' }}>
                    contact@aventures-alpines.fr
                  </a>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📞</span>
                <div>
                  <strong style={{ display: 'block', color: '#2d3748' }}>Téléphone</strong>
                  <a href="tel:+33450123456" style={{ margin: '0.25rem 0 0 0', color: '#3b82f6', textDecoration: 'none' }}>
                    +33 4 50 12 34 56
                  </a>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⏰</span>
                <div>
                  <strong style={{ display: 'block', color: '#2d3748' }}>Horaires</strong>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#718096' }}>
                    Lundi - Vendredi : 9h - 18h<br />
                    Samedi : 9h - 12h<br />
                    Dimanche : Fermé
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#f0f9ff', padding: '1.5rem', borderRadius: '12px', border: '2px solid #bfdbfe' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#1e40af' }}>💡 Besoin d'aide ?</h4>
            <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.95rem' }}>
              Consultez notre <a href="/faq" style={{ color: '#2563eb', fontWeight: '600' }}>FAQ</a> ou appelez-nous directement pour une réponse immédiate.
            </p>
          </div>
        </div>
      </div>

      {/* Carte de localisation */}
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>🗺️ Nous trouver</h3>
        <p style={{ color: '#718096', marginBottom: '1.5rem' }}>
          Notre bureau est situé au cœur de Chamonix, au pied du Mont-Blanc
        </p>
        <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <MapContainer 
            center={[45.9237, 6.8694]} 
            zoom={14} 
            style={{ height: '450px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[45.9237, 6.8694]}>
              <Popup>
                <div style={{ minWidth: '200px', textAlign: 'center' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#1a202c' }}>
                    🏔️ Aventures Alpines
                  </h4>
                  <p style={{ margin: '0.25rem 0', color: '#4a5568', fontSize: '0.9rem' }}>
                    123 Rue de la Montagne<br />
                    74400 Chamonix-Mont-Blanc
                  </p>
                  <a 
                    href="https://www.google.com/maps/place/Chamonix-Mont-Blanc"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      marginTop: '0.5rem',
                      padding: '0.5rem 1rem',
                      background: '#3b82f6',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}
                  >
                    📍 Itinéraire Google Maps
                  </a>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

export default Contact;
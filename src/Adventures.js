import React from 'react';

function Adventures() {
  return (
    <section id="adventures">
      <h2>Nos Aventures</h2>
      <div className="adventure-grid">
        <div className="adventure">
          <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80" alt="Randonnée" />
          <h3>Randonnée en Haute Montagne</h3>
          <p>Parcourez les sentiers les plus spectaculaires.</p>
        </div>
        <div className="adventure">
          <img src="https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=600&q=80" alt="Escalade" />
          <h3>Escalade</h3>
          <p>Conquérez les sommets les plus élevés.</p>
        </div>
      </div>
    </section>
  );
}

export default Adventures;
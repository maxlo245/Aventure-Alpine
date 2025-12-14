import React from 'react';

function Adventures() {
  return (
    <section id="adventures">
      <h2>Nos Aventures</h2>
      <div className="adventure-grid">
        <div className="adventure">
          <img src="https://via.placeholder.com/300x200?text=Randonn%C3%A9e" alt="Randonnée" />
          <h3>Randonnée en Haute Montagne</h3>
          <p>Parcourez les sentiers les plus spectaculaires.</p>
        </div>
        <div className="adventure">
          <img src="https://via.placeholder.com/300x200?text=Escalade" alt="Escalade" />
          <h3>Escalade</h3>
          <p>Conquérez les sommets les plus élevés.</p>
        </div>
      </div>
    </section>
  );
}

export default Adventures;
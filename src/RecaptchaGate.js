import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // Clé de test Google

export default function RecaptchaGate({ onSuccess }) {
  const [verified, setVerified] = useState(false);

  const handleChange = (token) => {
    if (token) {
      setVerified(true);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#fff' }}>
      <h2 style={{ fontWeight: 700, color: '#18181b' }}>Vérification anti-robot</h2>
      <div style={{ filter: 'invert(0)', color: '#18181b', background: '#fff', borderRadius: 8, padding: 8 }}>
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={handleChange}
        />
      </div>
      {!verified && <p style={{ marginTop: '1rem', color: '#18181b' }}>Veuillez valider le reCAPTCHA pour accéder au site.</p>}
    </div>
  );
}

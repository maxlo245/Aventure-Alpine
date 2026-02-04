import React, { useState } from 'react';

const regexPhone = /^(\+33|0)[1-9](\d{2}){4}$/;
const regexEmail = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

export default function RegexTester() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneValid, setPhoneValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneValid(regexPhone.test(value));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailValid(regexEmail.test(value));
  };

  return (
    <section className="page-regex" style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Testeur REGEX</h2>
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ fontWeight: 600 }}>Numéro de téléphone français :</label>
        <input
          type="text"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Ex: 0612345678 ou +33612345678"
          style={{ width: '100%', padding: '0.75rem', marginTop: 8, border: '2px solid #e2e8f0', borderRadius: 6, fontSize: 16 }}
        />
        {phone && (
          <div style={{ marginTop: 8, color: phoneValid ? 'green' : 'red' }}>
            {phoneValid ? 'Numéro valide ✅' : 'Numéro invalide ❌'}
          </div>
        )}
      </div>
      <div>
        <label style={{ fontWeight: 600 }}>Adresse mail :</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Ex: exemple@mail.com"
          style={{ width: '100%', padding: '0.75rem', marginTop: 8, border: '2px solid #e2e8f0', borderRadius: 6, fontSize: 16 }}
        />
        {email && (
          <div style={{ marginTop: 8, color: emailValid ? 'green' : 'red' }}>
            {emailValid ? 'Adresse valide ✅' : 'Adresse invalide ❌'}
          </div>
        )}
      </div>
    </section>
  );
}

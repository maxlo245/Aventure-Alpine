import React, { useState } from 'react';

// Accepte :
// - 0X XX XX XX XX ou 0XXXXXXXXX (X = 0 à 9)
// - +XX X XX XX XX XX ou +XXXXXXXXXXX (XX = 01 à 99, X = 0 à 9)
const regexPhone = /^(0\d{9}|0\d{1}(?: \d{2}){4}|\+(0[1-9]|[1-9][0-9]) ?\d{9}|\+(0[1-9]|[1-9][0-9]) ?\d{1}(?: \d{2}){4})$/;
const regexEmail = /^[\w.-]+@(gmail|outlook)\.(com|fr)$/i;

function phoneError(value) {
  if (!value) return '';
  if (!/^\+(0[1-9]|[1-9][0-9])|^0/.test(value)) return 'Doit commencer par 0 ou +[indicatif pays 01 à 99].';
  if (!/^([\d\s\+]+)$/.test(value)) return 'Ne doit contenir que des chiffres, espaces et +.';
  if (!regexPhone.test(value)) return 'Format attendu : 0X XX XX XX XX, 0XXXXXXXXX, +XX X XX XX XX XX ou +XXXXXXXXXXX (XX = 01 à 99).';
  return '';
}

function emailError(value) {
  if (!value) return '';
  if (!/^[\w.-]+@/.test(value)) return 'Le nom d’utilisateur est incorrect.';
  if (!/@(gmail|outlook)\./i.test(value)) return 'Seuls gmail ou outlook sont autorisés.';
  if (!/\.(com|fr)$/i.test(value)) return 'Seules les extensions .com ou .fr sont autorisées.';
  if (!regexEmail.test(value)) return 'Format incorrect.';
  return '';
}

export default function RegexTester() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const phoneValid = regexPhone.test(phone);
  const emailValid = regexEmail.test(email);
  const phoneMsg = phone ? (phoneValid ? 'Numéro valide ✅' : 'Numéro invalide ❌ ' + phoneError(phone)) : '';
  const emailMsg = email ? (emailValid ? 'Adresse valide ✅' : 'Adresse invalide ❌ ' + emailError(email)) : '';

  return (
    <section className="page-regex" style={{ maxWidth: 420, margin: '2.5rem auto', padding: '2.2rem 1.2rem', background: 'var(--bg-card, #fff)', borderRadius: 16, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', color: '#18181b' }}>
      <h2 style={{ marginBottom: '1.2rem', color: '#2563eb', fontWeight: 700, fontSize: '2rem', textAlign: 'center' }}>Testeur REGEX</h2>
      <div style={{ marginBottom: '1.7rem' }}>
        <label style={{ color: '#2563eb', fontWeight: 600, display: 'block', marginBottom: 6, fontSize: 15 }}>Numéro de téléphone français :</label>
        <input
          type="text"
          id="phone"
          placeholder="Ex: 0612345678 ou +33612345678"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={{ width: '100%', padding: '0.65rem 1rem', marginTop: 6, border: '2px solid #e2e8f0', borderRadius: 8, fontSize: 17, color: '#18181b', background: '#f5f7fa', boxSizing: 'border-box' }}
        />
        <div className="result" style={{ marginTop: 7, fontWeight: 500, fontSize: 14, color: phoneValid ? 'green' : (phone ? 'red' : undefined) }}>{phoneMsg}</div>
      </div>
      <div>
        <label style={{ color: '#2563eb', fontWeight: 600, display: 'block', marginBottom: 6, fontSize: 15 }}>Adresse mail :</label>
        <input
          type="email"
          id="email"
          placeholder="Ex: exemple@mail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '0.65rem 1rem', marginTop: 6, border: '2px solid #e2e8f0', borderRadius: 8, fontSize: 17, color: '#18181b', background: '#f5f7fa', boxSizing: 'border-box' }}
        />
        <div className="result" style={{ marginTop: 7, fontWeight: 500, fontSize: 14, color: emailValid ? 'green' : (email ? 'red' : undefined) }}>{emailMsg}</div>
      </div>
    </section>
  );
}

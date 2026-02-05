
import React, { useState } from 'react';

const regexPhone = /^(0\d{9}|0\d{1}(?: \d{2}){4}|\+33 ?\d{9}|\+33 ?\d{1}(?: \d{2}){4})$/;
const regexEmail = /^[\w.-]+@(gmail|outlook)\.(com|fr)$/i;

function phoneError(value) {
  if (!value) return '';
  if (!/^\+33|^0/.test(value)) return 'Doit commencer par 0 ou +33.';
  if (!/^([\d\s]+)$/.test(value)) return 'Ne doit contenir que des chiffres et des espaces.';
  if (!regexPhone.test(value)) return 'Format attendu : 0X XX XX XX XX, 0XXXXXXXXX, +33 X XX XX XX XX ou +33XXXXXXXXX.';
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
    <section className="page-regex" style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Testeur REGEX</h2>
      <div style={{ marginBottom: '2rem' }}>
        <label>Numéro de téléphone français :</label>
        <input
          type="text"
          id="phone"
          placeholder="Ex: 0612345678 ou +33612345678"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', marginTop: 8, border: '2px solid #e2e8f0', borderRadius: 6, fontSize: 16 }}
        />
        <div className="result" style={{ marginTop: 8, fontWeight: 500, color: phoneValid ? 'green' : (phone ? 'red' : undefined) }}>{phoneMsg}</div>
      </div>
      <div>
        <label>Adresse mail :</label>
        <input
          type="email"
          id="email"
          placeholder="Ex: exemple@mail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ width: '100%', padding: '0.75rem', marginTop: 8, border: '2px solid #e2e8f0', borderRadius: 6, fontSize: 16 }}
        />
        <div className="result" style={{ marginTop: 8, fontWeight: 500, color: emailValid ? 'green' : (email ? 'red' : undefined) }}>{emailMsg}</div>
      </div>
    </section>
  );
}

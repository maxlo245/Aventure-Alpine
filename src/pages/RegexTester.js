import React, { useState } from 'react';

// Accepte :
// - 0X XX XX XX XX ou 0XXXXXXXXX (X = 0 à 9)
// - +XX X XX XX XX XX ou +XXXXXXXXXXX (XX = 01 à 99, X = 0 à 9)
const regexPhone = /^(0\d{9}|0\d{1}(?: \d{2}){4}|\+(0[1-9]|[1-9][0-9]) ?\d{9}|\+(0[1-9]|[1-9][0-9]) ?\d{1}(?: \d{2}){4})$/;
// Accepte gmail, outlook, gouv, yahoo, protonmail, hotmail, live, icloud, orange, sfr, free, laposte et extensions .fr, .de, .be, .lu, .ch, .com, etc.
const regexEmail = /^[\w.-]+@(gmail|outlook|gouv|yahoo|protonmail|hotmail|live|icloud|orange|sfr|free|laposte)\.[a-z]{2,}$/i;

function phoneError(value) {
  if (!value) return '';
  if (!/^\+(0[1-9]|[1-9][0-9])|^0/.test(value)) return 'Erreur [TEL-001] : Le numéro doit commencer par 0 (national) ou +[indicatif pays 01 à 99] (international).';
  if (!/^([\d\s\+]+)$/.test(value)) return 'Erreur [TEL-002] : Seuls les chiffres, espaces et le signe + sont autorisés.';
  // Vérification de la longueur (hors espaces et +)
  const digits = value.replace(/[^\d]/g, '');
  if (value.startsWith('0')) {
    if (digits.length < 10) return 'Erreur [TEL-003] : Numéro national trop court (10 chiffres requis).';
    if (digits.length > 10) return 'Erreur [TEL-004] : Numéro national trop long (10 chiffres requis).';
    if (!/^0[1-9]/.test(value)) return "Erreur [TEL-005] : Le deuxième chiffre après 0 doit être compris entre 1 et 9.";
  }
  if (value.startsWith('+')) {
    if (digits.length < 11) return 'Erreur [TEL-006] : Numéro international trop court (11 chiffres requis après l’indicatif).';
    if (digits.length > 11) return 'Erreur [TEL-007] : Numéro international trop long (11 chiffres requis après l’indicatif).';
    if (!/^\+(0[1-9]|[1-9][0-9])/.test(value)) return "Erreur [TEL-008] : L’indicatif international doit être compris entre +01 et +99.";
  }
  if (!regexPhone.test(value)) return 'Erreur [TEL-009] : Format non reconnu. Exemple attendu : 06 12 34 56 78 ou +33 6 12 34 56 78.';
  return '';
}

function emailError(value) {
  if (!value) return '';
  if (!/^[\w.-]+@/.test(value)) return 'Erreur [MAIL-001] : Le nom d’utilisateur (avant le @) doit contenir uniquement lettres, chiffres, points ou tirets.';
  if (!/@/.test(value)) return "Erreur [MAIL-002] : Le caractère '@' est manquant.";
  if (!/@(gmail|outlook|gouv|yahoo|protonmail|hotmail|live|icloud|orange|sfr|free|laposte)\./i.test(value)) return 'Erreur [MAIL-003] : Domaine non autorisé. Utilisez un fournisseur reconnu (gmail, outlook, gouv, yahoo, protonmail, hotmail, live, icloud, orange, sfr, free, laposte).';
  if (!/\.[a-z]{2,}$/i.test(value)) return 'Erreur [MAIL-004] : Extension de domaine invalide. Utilisez une extension de pays ou .com (ex : .fr, .de, .be, .lu, .ch, .com, etc.).';
  if (!/^[\w.-]+@[\w.-]+\.[a-z]{2,}$/i.test(value)) return 'Erreur [MAIL-005] : Format général de l’adresse email incorrect. Exemple attendu : nom@domaine.fr.';
  if (!regexEmail.test(value)) return 'Erreur [MAIL-006] : Format général de l’adresse email incorrect ou domaine non autorisé.';
  return '';
}

export default function RegexTester() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const phoneValid = regexPhone.test(phone);
  const emailValid = regexEmail.test(email);
  const phoneMsg = phone ? (phoneValid ? 'Numéro valide ' : 'Numéro invalide  ' + phoneError(phone)) : '';
  const emailMsg = email ? (emailValid ? 'Adresse valide ' : 'Adresse invalide  ' + emailError(email)) : '';

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

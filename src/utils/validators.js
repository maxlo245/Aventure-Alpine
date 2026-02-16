// --- Codes d'erreur exhaustifs pour la validation email ---
export const emailErrorCodes = {
  // Structure globale
  MISSING_AT: { code: 'MISSING_AT', family: 'Structure', message: "Absence du caractère '@'." },
  MULTIPLE_AT: { code: 'MULTIPLE_AT', family: 'Structure', message: "Plus d'un '@' détecté." },
  STRING_TOO_LONG: { code: 'STRING_TOO_LONG', family: 'Structure', message: 'Adresse > 254 caractères.' },
  ILLEGAL_CONTROL_CHARS: { code: 'ILLEGAL_CONTROL_CHARS', family: 'Structure', message: 'Caractère de contrôle ASCII non autorisé.' },
  WHITESPACE_DETECTED: { code: 'WHITESPACE_DETECTED', family: 'Structure', message: 'Espace non autorisé.' },
  // Partie locale
  LOCAL_PART_EMPTY: { code: 'LOCAL_PART_EMPTY', family: 'Local', message: 'Rien avant le @.' },
  LOCAL_PART_TOO_LONG: { code: 'LOCAL_PART_TOO_LONG', family: 'Local', message: 'Partie locale > 64 caractères.' },
  LEADING_DOT: { code: 'LEADING_DOT', family: 'Local', message: 'Commence par un point.' },
  TRAILING_DOT: { code: 'TRAILING_DOT', family: 'Local', message: 'Finit par un point avant le @.' },
  CONSECUTIVE_DOTS: { code: 'CONSECUTIVE_DOTS', family: 'Local', message: 'Deux points consécutifs.' },
  INVALID_CHARS_IN_LOCAL: { code: 'INVALID_CHARS_IN_LOCAL', family: 'Local', message: 'Caractère non autorisé dans la partie locale.' },
  UNCLOSED_QUOTED_STR: { code: 'UNCLOSED_QUOTED_STR', family: 'Local', message: 'Guillemets non fermés.' },
  INVALID_ESCAPED_CHAR: { code: 'INVALID_ESCAPED_CHAR', family: 'Local', message: "Caractère d'échappement mal utilisé." },
  // Domaine
  DOMAIN_PART_EMPTY: { code: 'DOMAIN_PART_EMPTY', family: 'Domaine', message: 'Rien après le @.' },
  DOMAIN_TOO_LONG: { code: 'DOMAIN_TOO_LONG', family: 'Domaine', message: 'Domaine > 255 caractères.' },
  DOMAIN_LABEL_TOO_LONG: { code: 'DOMAIN_LABEL_TOO_LONG', family: 'Domaine', message: 'Un segment du domaine > 63 caractères.' },
  DOMAIN_START_HYPHEN: { code: 'DOMAIN_START_HYPHEN', family: 'Domaine', message: 'Un segment commence par un tiret.' },
  DOMAIN_END_HYPHEN: { code: 'DOMAIN_END_HYPHEN', family: 'Domaine', message: 'Un segment finit par un tiret.' },
  MISSING_TOP_LEVEL_DOMAIN: { code: 'MISSING_TOP_LEVEL_DOMAIN', family: 'Domaine', message: "Pas d'extension (TLD)." },
  NUMERIC_TLD: { code: 'NUMERIC_TLD', family: 'Domaine', message: 'Extension purement numérique.' },
  INVALID_IP_LITERAL: { code: 'INVALID_IP_LITERAL', family: 'Domaine', message: 'Adresse IP littérale invalide.' },
  // Cohérence (niveau 2, optionnel)
  TLD_NOT_FOUND: { code: 'TLD_NOT_FOUND', family: 'Cohérence', message: 'TLD non reconnu (IANA).' },
  DISPOSABLE_DOMAIN: { code: 'DISPOSABLE_DOMAIN', family: 'Cohérence', message: 'Domaine jetable.' },
  ROLE_BASED_ACCOUNT: { code: 'ROLE_BASED_ACCOUNT', family: 'Cohérence', message: 'Adresse générique (admin@, info@, etc.).' },
  INVALID_MX_RECORD: { code: 'INVALID_MX_RECORD', family: 'Cohérence', message: 'Pas de serveur mail (MX).' },
  // Compilation Regex
  REGEXP_UNTERMINATED_GROUP: { code: 'REGEXP_UNTERMINATED_GROUP', family: 'Regex', message: 'Parenthèse non fermée.' },
  REGEXP_INVALID_QUANTIFIER: { code: 'REGEXP_INVALID_QUANTIFIER', family: 'Regex', message: 'Quantificateur mal placé.' },
  REGEXP_STACK_OVERFLOW: { code: 'REGEXP_STACK_OVERFLOW', family: 'Regex', message: 'Regex trop complexe.' },
  REGEX_FAIL: { code: 'REGEX_FAIL', family: 'Regex', message: 'Échec de la regex finale.' },
};

export function validateEmailFamilies(email) {
  // 1. Structure globale
  if (!email.includes('@')) return emailErrorCodes.MISSING_AT;
  if ((email.match(/@/g) || []).length > 1) return emailErrorCodes.MULTIPLE_AT;
  if (email.length > 254) return emailErrorCodes.STRING_TOO_LONG;
  if (/[\x00-\x1f]/.test(email)) return emailErrorCodes.ILLEGAL_CONTROL_CHARS;
  if (/\s/.test(email)) return emailErrorCodes.WHITESPACE_DETECTED;

  // 2. Partie locale
  const [local, domain] = email.split('@');
  if (!local) return emailErrorCodes.LOCAL_PART_EMPTY;
  if (local.length > 64) return emailErrorCodes.LOCAL_PART_TOO_LONG;
  if (local.startsWith('.')) return emailErrorCodes.LEADING_DOT;
  if (local.endsWith('.')) return emailErrorCodes.TRAILING_DOT;
  if (local.includes('..')) return emailErrorCodes.CONSECUTIVE_DOTS;
  if (/[^a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]/.test(local)) return emailErrorCodes.INVALID_CHARS_IN_LOCAL;
  if ((local.match(/"/g) || []).length % 2 !== 0) return emailErrorCodes.UNCLOSED_QUOTED_STR;
  if (/\\[^a-zA-Z0-9]/.test(local)) return emailErrorCodes.INVALID_ESCAPED_CHAR;

  // 3. Domaine
  if (!domain) return emailErrorCodes.DOMAIN_PART_EMPTY;
  if (domain.length > 255) return emailErrorCodes.DOMAIN_TOO_LONG;
  if (domain.split('.').some(label => label.length > 63)) return emailErrorCodes.DOMAIN_LABEL_TOO_LONG;
  if (domain.split('.').some(label => label.startsWith('-'))) return emailErrorCodes.DOMAIN_START_HYPHEN;
  if (domain.split('.').some(label => label.endsWith('-'))) return emailErrorCodes.DOMAIN_END_HYPHEN;
  if (!domain.includes('.')) return emailErrorCodes.MISSING_TOP_LEVEL_DOMAIN;
  if (/\.[0-9]+$/.test(domain)) return emailErrorCodes.NUMERIC_TLD;
  if (/^\[.*\]$/.test(domain) && !/\[(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\]$/.test(domain)) return emailErrorCodes.INVALID_IP_LITERAL;

  // 4. Regex finale (pour les cas extrêmes)
  try {
    const regex = /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:[01]?[0-9][0-9]?))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:[01]?[0-9][0-9]?))){3}))\]))$/;
    if (!regex.test(email)) return emailErrorCodes.REGEX_FAIL;
  } catch (e) {
    if (e.message.includes('Unterminated group')) return emailErrorCodes.REGEXP_UNTERMINATED_GROUP;
    if (e.message.includes('Invalid quantifier')) return emailErrorCodes.REGEXP_INVALID_QUANTIFIER;
    if (e.message.includes('Maximum call stack size exceeded')) return emailErrorCodes.REGEXP_STACK_OVERFLOW;
    return { code: 'REGEX_COMPILATION_ERROR', family: 'Regex', message: e.message };
  }
  return null; // OK
}

// Accepte :
// - 0X XX XX XX XX ou 0XXXXXXXXX (X = 0 à 9)
// - +XX X XX XX XX XX ou +XXXXXXXXXXX (XX = 01 à 99, X = 0 à 9)
export const regexPhone = /^(0\d{9}|0\d{1}(?: \d{2}){4}|\+(0[1-9]|[1-9][0-9]) ?\d{9}|\+(0[1-9]|[1-9][0-9]) ?\d{1}(?: \d{2}){4})$/;

export function phoneError(value) {
  if (!value) return '';
  if (!/^\+(0[1-9]|[1-9][0-9])|^0/.test(value)) return 'Erreur [TEL-001] : Le numéro doit commencer par 0 (national) ou +[indicatif pays 01 à 99] (international).';
  if (!/^([\d\s\+]+)$/.test(value)) return 'Erreur [TEL-002] : Seuls les chiffres, espaces et le signe + sont autorisés.';
  const digits = value.replace(/[^\d]/g, '');
  if (value.startsWith('0')) {
    if (digits.length < 10) return 'Erreur [TEL-003] : Numéro national trop court (10 chiffres requis).';
    if (digits.length > 10) return 'Erreur [TEL-004] : Numéro national trop long (10 chiffres requis).';
    if (!/^0[1-9]/.test(value)) return "Erreur [TEL-005] : Le deuxième chiffre après 0 doit être compris entre 1 et 9.";
  }
  if (value.startsWith('+')) {
    if (digits.length < 11) return "Erreur [TEL-006] : Numéro international trop court (11 chiffres requis après l'indicatif).";
    if (digits.length > 11) return "Erreur [TEL-007] : Numéro international trop long (11 chiffres requis après l'indicatif).";
    if (!/^\+(0[1-9]|[1-9][0-9])/.test(value)) return "Erreur [TEL-008] : L'indicatif international doit être compris entre +01 et +99.";
  }
  if (!regexPhone.test(value)) return 'Erreur [TEL-009] : Format non reconnu. Exemple attendu : 06 12 34 56 78 ou +33 6 12 34 56 78.';
  return '';
}

// --- Codes d'erreur pour la validation du mot de passe ---
export const passwordErrorCodes = {
  TOO_SHORT: { code: 'MDP-001', family: 'Longueur', message: 'Le mot de passe doit contenir au moins 6 caractères.' },
  NO_UPPERCASE: { code: 'MDP-002', family: 'Complexité', message: 'Le mot de passe doit contenir au moins une majuscule.' },
  NO_LOWERCASE: { code: 'MDP-003', family: 'Complexité', message: 'Le mot de passe doit contenir au moins une minuscule.' },
  NO_DIGIT: { code: 'MDP-004', family: 'Complexité', message: 'Le mot de passe doit contenir au moins un chiffre.' },
  MISMATCH: { code: 'MDP-005', family: 'Confirmation', message: 'Les mots de passe ne correspondent pas.' },
};

export function validatePassword(password) {
  if (!password) return null;
  if (password.length < 6) return passwordErrorCodes.TOO_SHORT;
  if (!/[A-Z]/.test(password)) return passwordErrorCodes.NO_UPPERCASE;
  if (!/[a-z]/.test(password)) return passwordErrorCodes.NO_LOWERCASE;
  if (!/[0-9]/.test(password)) return passwordErrorCodes.NO_DIGIT;
  return null; // OK
}

export function validatePasswordConfirmation(password, confirmation) {
  if (!confirmation) return null;
  if (password !== confirmation) return passwordErrorCodes.MISMATCH;
  return validatePassword(password);
}

// --- Validation nom d'utilisateur ---
export const usernameErrorCodes = {
  TOO_SHORT: { code: 'USR-001', family: 'Longueur', message: "Le nom d'utilisateur doit contenir au moins 3 caractères." },
  TOO_LONG: { code: 'USR-002', family: 'Longueur', message: "Le nom d'utilisateur ne doit pas dépasser 30 caractères." },
  INVALID_CHARS: { code: 'USR-003', family: 'Format', message: "Seuls les lettres, chiffres, tirets et underscores sont autorisés." },
  STARTS_WITH_SPECIAL: { code: 'USR-004', family: 'Format', message: "Le nom d'utilisateur doit commencer par une lettre ou un chiffre." },
};

export function validateUsername(username) {
  if (!username) return null;
  if (username.length < 3) return usernameErrorCodes.TOO_SHORT;
  if (username.length > 30) return usernameErrorCodes.TOO_LONG;
  if (/^[-_]/.test(username)) return usernameErrorCodes.STARTS_WITH_SPECIAL;
  if (/[^a-zA-Z0-9_-]/.test(username)) return usernameErrorCodes.INVALID_CHARS;
  return null; // OK
}

// =====================================================
// CODES D'ERREUR — VALIDATION EMAIL
// Préfixe : EML-xxx
// =====================================================
export const emailErrorCodes = {
  // --- Structure globale (EML-001 → EML-010) ---
  EMPTY:                 { code: 'EML-001', family: 'Structure', message: "L'adresse email est vide." },
  MISSING_AT:            { code: 'EML-002', family: 'Structure', message: "Absence du caractère '@'." },
  MULTIPLE_AT:           { code: 'EML-003', family: 'Structure', message: "Plus d'un '@' détecté." },
  STRING_TOO_SHORT:      { code: 'EML-004', family: 'Structure', message: "Adresse trop courte (min. 5 caractères : a@b.c)." },
  STRING_TOO_LONG:       { code: 'EML-005', family: 'Structure', message: 'Adresse trop longue (max. 254 caractères).' },
  ILLEGAL_CONTROL_CHARS: { code: 'EML-006', family: 'Structure', message: 'Caractère de contrôle ASCII non autorisé détecté.' },
  WHITESPACE_DETECTED:   { code: 'EML-007', family: 'Structure', message: 'Espace ou tabulation non autorisé.' },
  STARTS_WITH_AT:        { code: 'EML-008', family: 'Structure', message: "L'adresse commence par '@'." },
  ENDS_WITH_AT:          { code: 'EML-009', family: 'Structure', message: "L'adresse finit par '@'." },
  CONSECUTIVE_AT:        { code: 'EML-010', family: 'Structure', message: "Plusieurs '@' consécutifs." },

  // --- Partie locale (EML-101 → EML-115) ---
  LOCAL_PART_EMPTY:      { code: 'EML-101', family: 'Local', message: "Rien avant le '@'." },
  LOCAL_PART_TOO_LONG:   { code: 'EML-102', family: 'Local', message: 'Partie locale > 64 caractères.' },
  LOCAL_PART_TOO_SHORT:  { code: 'EML-103', family: 'Local', message: 'Partie locale trop courte (min. 1 caractère).' },
  LEADING_DOT:           { code: 'EML-104', family: 'Local', message: 'Commence par un point.' },
  TRAILING_DOT:          { code: 'EML-105', family: 'Local', message: "Finit par un point avant le '@'." },
  CONSECUTIVE_DOTS:      { code: 'EML-106', family: 'Local', message: 'Deux points consécutifs détectés.' },
  INVALID_CHARS_IN_LOCAL:{ code: 'EML-107', family: 'Local', message: 'Caractère non autorisé dans la partie locale.' },
  UNCLOSED_QUOTED_STR:   { code: 'EML-108', family: 'Local', message: 'Guillemets non fermés dans la partie locale.' },
  INVALID_ESCAPED_CHAR:  { code: 'EML-109', family: 'Local', message: "Caractère d'échappement mal utilisé." },
  ONLY_DOTS:             { code: 'EML-110', family: 'Local', message: 'La partie locale ne peut contenir que des points.' },
  LEADING_HYPHEN_LOCAL:  { code: 'EML-111', family: 'Local', message: 'La partie locale commence par un tiret.' },
  TRAILING_HYPHEN_LOCAL: { code: 'EML-112', family: 'Local', message: 'La partie locale finit par un tiret.' },

  // --- Domaine (EML-201 → EML-220) ---
  DOMAIN_PART_EMPTY:        { code: 'EML-201', family: 'Domaine', message: "Rien après le '@'." },
  DOMAIN_TOO_LONG:          { code: 'EML-202', family: 'Domaine', message: 'Domaine > 255 caractères.' },
  DOMAIN_TOO_SHORT:         { code: 'EML-203', family: 'Domaine', message: 'Domaine trop court (min. 3 caractères : a.b).' },
  DOMAIN_LABEL_TOO_LONG:    { code: 'EML-204', family: 'Domaine', message: 'Un segment du domaine > 63 caractères.' },
  DOMAIN_LABEL_EMPTY:       { code: 'EML-205', family: 'Domaine', message: 'Segment de domaine vide (double point détecté).' },
  DOMAIN_START_HYPHEN:      { code: 'EML-206', family: 'Domaine', message: 'Un segment du domaine commence par un tiret.' },
  DOMAIN_END_HYPHEN:        { code: 'EML-207', family: 'Domaine', message: 'Un segment du domaine finit par un tiret.' },
  MISSING_TOP_LEVEL_DOMAIN: { code: 'EML-208', family: 'Domaine', message: "Pas d'extension (TLD) — il manque un point dans le domaine." },
  NUMERIC_TLD:              { code: 'EML-209', family: 'Domaine', message: 'Extension (TLD) purement numérique non autorisée.' },
  INVALID_IP_LITERAL:       { code: 'EML-210', family: 'Domaine', message: 'Adresse IP littérale invalide dans le domaine.' },
  TLD_TOO_SHORT:            { code: 'EML-211', family: 'Domaine', message: 'Extension (TLD) trop courte (min. 2 caractères).' },
  TLD_TOO_LONG:             { code: 'EML-212', family: 'Domaine', message: 'Extension (TLD) trop longue (max. 63 caractères).' },
  DOMAIN_LEADING_DOT:       { code: 'EML-213', family: 'Domaine', message: 'Le domaine commence par un point.' },
  DOMAIN_TRAILING_DOT:      { code: 'EML-214', family: 'Domaine', message: 'Le domaine finit par un point.' },
  DOMAIN_CONSECUTIVE_DOTS:  { code: 'EML-215', family: 'Domaine', message: 'Deux points consécutifs dans le domaine.' },
  DOMAIN_INVALID_CHARS:     { code: 'EML-216', family: 'Domaine', message: 'Caractère non autorisé dans le domaine.' },
  DOMAIN_ONLY_NUMBERS:      { code: 'EML-217', family: 'Domaine', message: 'Le domaine ne peut pas être uniquement numérique.' },
  DOMAIN_UNDERSCORE:        { code: 'EML-218', family: 'Domaine', message: "L'underscore n'est pas autorisé dans le domaine." },

  // --- Cohérence avancée (EML-301 → EML-310) ---
  TLD_NOT_FOUND:       { code: 'EML-301', family: 'Cohérence', message: 'TLD non reconnu (liste IANA).' },
  DISPOSABLE_DOMAIN:   { code: 'EML-302', family: 'Cohérence', message: 'Domaine jetable détecté (yopmail, guerrilla, etc.).' },
  ROLE_BASED_ACCOUNT:  { code: 'EML-303', family: 'Cohérence', message: 'Adresse générique non autorisée (admin@, info@, noreply@, etc.).' },
  INVALID_MX_RECORD:   { code: 'EML-304', family: 'Cohérence', message: 'Aucun serveur mail (MX) trouvé pour ce domaine.' },
  SUSPICIOUS_PATTERN:  { code: 'EML-305', family: 'Cohérence', message: 'Motif suspect détecté (ex: aaa@aaa.aaa).' },
  KNOWN_TYPO_DOMAIN:   { code: 'EML-306', family: 'Cohérence', message: 'Domaine ressemble à une faute de frappe courante (gmial, yaho, hotmal...).' },

  // --- Regex / Compilation (EML-901 → EML-910) ---
  REGEXP_UNTERMINATED_GROUP:  { code: 'EML-901', family: 'Regex', message: 'Parenthèse non fermée dans la regex.' },
  REGEXP_INVALID_QUANTIFIER:  { code: 'EML-902', family: 'Regex', message: 'Quantificateur mal placé dans la regex.' },
  REGEXP_STACK_OVERFLOW:      { code: 'EML-903', family: 'Regex', message: 'Regex trop complexe (stack overflow).' },
  REGEX_FAIL:                 { code: 'EML-904', family: 'Regex', message: 'Échec de la regex finale RFC 5322.' },
};

// Domaines jetables connus
const DISPOSABLE_DOMAINS = ['yopmail.com', 'guerrillamail.com', 'mailinator.com', 'tempmail.com', 'throwaway.email', 'sharklasers.com', 'guerrillamailblock.com', 'grr.la', 'dispostable.com', 'trashmail.com'];

// Adresses génériques
const ROLE_ACCOUNTS = ['admin', 'info', 'noreply', 'no-reply', 'postmaster', 'webmaster', 'support', 'abuse', 'contact', 'sales', 'marketing'];

// Fautes de frappe courantes sur les domaines
const DOMAIN_TYPOS = { 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gnail.com': 'gmail.com', 'gmail.co': 'gmail.com', 'gmail.fr': null, 'hotmal.com': 'hotmail.com', 'hotmai.com': 'hotmail.com', 'hotmial.com': 'hotmail.com', 'yaho.com': 'yahoo.com', 'yahooo.com': 'yahoo.com', 'yhaoo.com': 'yahoo.com', 'outloo.com': 'outlook.com', 'outlok.com': 'outlook.com' };

export function validateEmailFamilies(email) {
  // 0. Vide
  if (!email || !email.trim()) return emailErrorCodes.EMPTY;

  // 1. Structure globale
  if (!email.includes('@')) return emailErrorCodes.MISSING_AT;
  if ((email.match(/@/g) || []).length > 1) return emailErrorCodes.MULTIPLE_AT;
  if (email.length < 5) return emailErrorCodes.STRING_TOO_SHORT;
  if (email.length > 254) return emailErrorCodes.STRING_TOO_LONG;
  if (/[\x00-\x1f\x7f]/.test(email)) return emailErrorCodes.ILLEGAL_CONTROL_CHARS;
  if (/\s/.test(email)) return emailErrorCodes.WHITESPACE_DETECTED;
  if (email.startsWith('@')) return emailErrorCodes.STARTS_WITH_AT;
  if (email.endsWith('@')) return emailErrorCodes.ENDS_WITH_AT;

  // 2. Partie locale
  const [local, ...domainParts] = email.split('@');
  const domain = domainParts.join('@');
  if (!local || local.length === 0) return emailErrorCodes.LOCAL_PART_EMPTY;
  if (local.length > 64) return emailErrorCodes.LOCAL_PART_TOO_LONG;
  if (local.startsWith('.')) return emailErrorCodes.LEADING_DOT;
  if (local.endsWith('.')) return emailErrorCodes.TRAILING_DOT;
  if (local.includes('..')) return emailErrorCodes.CONSECUTIVE_DOTS;
  if (/^\.+$/.test(local)) return emailErrorCodes.ONLY_DOTS;
  if (local.startsWith('-')) return emailErrorCodes.LEADING_HYPHEN_LOCAL;
  if (local.endsWith('-')) return emailErrorCodes.TRAILING_HYPHEN_LOCAL;
  if (/[^a-zA-Z0-9!#$%&'*+/=?^_`{|}~.-]/.test(local)) return emailErrorCodes.INVALID_CHARS_IN_LOCAL;
  if ((local.match(/"/g) || []).length % 2 !== 0) return emailErrorCodes.UNCLOSED_QUOTED_STR;
  if (/\\[^a-zA-Z0-9]/.test(local)) return emailErrorCodes.INVALID_ESCAPED_CHAR;

  // 3. Domaine
  if (!domain || domain.length === 0) return emailErrorCodes.DOMAIN_PART_EMPTY;
  if (domain.length > 255) return emailErrorCodes.DOMAIN_TOO_LONG;
  if (domain.length < 3) return emailErrorCodes.DOMAIN_TOO_SHORT;
  if (domain.startsWith('.')) return emailErrorCodes.DOMAIN_LEADING_DOT;
  if (domain.endsWith('.')) return emailErrorCodes.DOMAIN_TRAILING_DOT;
  if (domain.includes('..')) return emailErrorCodes.DOMAIN_CONSECUTIVE_DOTS;
  if (/_/.test(domain)) return emailErrorCodes.DOMAIN_UNDERSCORE;
  if (/[^a-zA-Z0-9.\-[\]:]/.test(domain)) return emailErrorCodes.DOMAIN_INVALID_CHARS;

  const labels = domain.split('.');
  if (labels.some(label => label.length === 0)) return emailErrorCodes.DOMAIN_LABEL_EMPTY;
  if (labels.some(label => label.length > 63)) return emailErrorCodes.DOMAIN_LABEL_TOO_LONG;
  if (labels.some(label => label.startsWith('-'))) return emailErrorCodes.DOMAIN_START_HYPHEN;
  if (labels.some(label => label.endsWith('-'))) return emailErrorCodes.DOMAIN_END_HYPHEN;
  if (!domain.includes('.')) return emailErrorCodes.MISSING_TOP_LEVEL_DOMAIN;

  const tld = labels[labels.length - 1];
  if (/^[0-9]+$/.test(tld)) return emailErrorCodes.NUMERIC_TLD;
  if (tld.length < 2) return emailErrorCodes.TLD_TOO_SHORT;
  if (tld.length > 63) return emailErrorCodes.TLD_TOO_LONG;
  if (/^\[.*\]$/.test(domain) && !/\[(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}\]$/.test(domain)) return emailErrorCodes.INVALID_IP_LITERAL;
  if (labels.every(l => /^[0-9]+$/.test(l))) return emailErrorCodes.DOMAIN_ONLY_NUMBERS;

  // 4. Cohérence avancée
  const domainLower = domain.toLowerCase();
  const localLower = local.toLowerCase();
  if (DISPOSABLE_DOMAINS.includes(domainLower)) return emailErrorCodes.DISPOSABLE_DOMAIN;
  if (ROLE_ACCOUNTS.includes(localLower)) return emailErrorCodes.ROLE_BASED_ACCOUNT;
  if (DOMAIN_TYPOS[domainLower]) {
    return { ...emailErrorCodes.KNOWN_TYPO_DOMAIN, message: `Vouliez-vous dire « ${localLower}@${DOMAIN_TYPOS[domainLower]} » ?` };
  }
  // Pattern suspect : mêmes caractères répétés
  if (/^(.)\1+$/.test(local) && /^(.)\1+\.(.)\2+$/.test(domain)) return emailErrorCodes.SUSPICIOUS_PATTERN;

  // 5. Regex finale RFC 5322
  try {
    const regex = /^(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){255,})(?!(?:(?:\x22?\x5C[\x00-\x7E]\x22?)|(?:\x22?[^\x5C\x22]\x22?)){65,}@)(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22))(?:\.(?:(?:[\x21\x23-\x27\x2A\x2B\x2D\x2F-\x39\x3D\x3F\x5E-\x7E]+)|(?:\x22(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|(?:\x5C[\x00-\x7F]))*\x22)))*@(?:(?:(?!.*[^.]{64,})(?:(?:(?:xn--)?[a-z0-9]+(?:-[a-z0-9]+)*\.){1,126}){1,}(?:(?:[a-z][a-z0-9]*)|(?:(?:xn--)[a-z0-9]+))(?:-[a-z0-9]+)*)|(?:\[(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){7})|(?:(?!(?:.*[a-f0-9][:\]]){7,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,5})?)))|(?:(?:IPv6:(?:(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){5}:)|(?:(?!(?:.*[a-f0-9]:){5,})(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3})?::(?:[a-f0-9]{1,4}(?::[a-f0-9]{1,4}){0,3}:)?)))?(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:[01]?[0-9][0-9]?))(?:\.(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:[01]?[0-9][0-9]?))){3}))\]))$/;
    if (!regex.test(email)) return emailErrorCodes.REGEX_FAIL;
  } catch (e) {
    if (e.message.includes('Unterminated group')) return emailErrorCodes.REGEXP_UNTERMINATED_GROUP;
    if (e.message.includes('Invalid quantifier')) return emailErrorCodes.REGEXP_INVALID_QUANTIFIER;
    if (e.message.includes('Maximum call stack size exceeded')) return emailErrorCodes.REGEXP_STACK_OVERFLOW;
    return { code: 'EML-999', family: 'Regex', message: e.message };
  }
  return null; // OK
}

// =====================================================
// CODES D'ERREUR — VALIDATION TÉLÉPHONE
// Préfixe : TEL-xxx
// =====================================================
export const phoneErrorCodes = {
  EMPTY:              { code: 'TEL-001', family: 'Format', message: 'Le numéro de téléphone est vide.' },
  INVALID_START:      { code: 'TEL-002', family: 'Format', message: 'Le numéro doit commencer par 0 (national) ou + (international).' },
  INVALID_CHARS:      { code: 'TEL-003', family: 'Format', message: 'Seuls les chiffres, espaces et le signe + sont autorisés.' },
  PLUS_NOT_FIRST:     { code: 'TEL-004', family: 'Format', message: 'Le signe + ne peut apparaître qu\'en début de numéro.' },
  MULTIPLE_PLUS:      { code: 'TEL-005', family: 'Format', message: 'Plusieurs signes + détectés.' },
  NAT_TOO_SHORT:      { code: 'TEL-010', family: 'National', message: 'Numéro national trop court (10 chiffres requis).' },
  NAT_TOO_LONG:       { code: 'TEL-011', family: 'National', message: 'Numéro national trop long (10 chiffres requis).' },
  NAT_INVALID_PREFIX: { code: 'TEL-012', family: 'National', message: 'Le 2e chiffre après 0 doit être entre 1 et 9 (ex: 06, 07…).' },
  NAT_INVALID_RANGE:  { code: 'TEL-013', family: 'National', message: 'Préfixe 0X non reconnu pour un numéro français (01-09 attendu).' },
  INT_TOO_SHORT:      { code: 'TEL-020', family: 'International', message: 'Numéro international trop court (11 chiffres min. après indicatif).' },
  INT_TOO_LONG:       { code: 'TEL-021', family: 'International', message: 'Numéro international trop long (11 chiffres max. après indicatif).' },
  INT_INVALID_CODE:   { code: 'TEL-022', family: 'International', message: "L'indicatif international doit être entre +01 et +99." },
  INT_MISSING_CODE:   { code: 'TEL-023', family: 'International', message: "Indicatif pays manquant après le '+'." },
  CONSECUTIVE_SPACES: { code: 'TEL-030', family: 'Format', message: 'Plusieurs espaces consécutifs détectés.' },
  LEADING_SPACE:      { code: 'TEL-031', family: 'Format', message: 'Le numéro ne doit pas commencer par un espace.' },
  TRAILING_SPACE:     { code: 'TEL-032', family: 'Format', message: 'Le numéro ne doit pas finir par un espace.' },
  REGEX_FAIL:         { code: 'TEL-099', family: 'Regex', message: 'Format non reconnu. Exemples : 06 12 34 56 78 ou +33 6 12 34 56 78.' },
};

export const regexPhone = /^(0\d{9}|0\d{1}(?: \d{2}){4}|\+(0[1-9]|[1-9][0-9]) ?\d{9}|\+(0[1-9]|[1-9][0-9]) ?\d{1}(?: \d{2}){4})$/;

export function phoneError(value) {
  if (!value || !value.trim()) return phoneErrorCodes.EMPTY.message;
  if (value.startsWith(' ')) return `[${phoneErrorCodes.LEADING_SPACE.code}] ${phoneErrorCodes.LEADING_SPACE.message}`;
  if (value.endsWith(' ')) return `[${phoneErrorCodes.TRAILING_SPACE.code}] ${phoneErrorCodes.TRAILING_SPACE.message}`;
  if (/  /.test(value)) return `[${phoneErrorCodes.CONSECUTIVE_SPACES.code}] ${phoneErrorCodes.CONSECUTIVE_SPACES.message}`;
  if (!/^[\d\s+]+$/.test(value)) return `[${phoneErrorCodes.INVALID_CHARS.code}] ${phoneErrorCodes.INVALID_CHARS.message}`;
  if ((value.match(/\+/g) || []).length > 1) return `[${phoneErrorCodes.MULTIPLE_PLUS.code}] ${phoneErrorCodes.MULTIPLE_PLUS.message}`;
  if (value.includes('+') && !value.startsWith('+')) return `[${phoneErrorCodes.PLUS_NOT_FIRST.code}] ${phoneErrorCodes.PLUS_NOT_FIRST.message}`;
  if (!/^\+|^0/.test(value)) return `[${phoneErrorCodes.INVALID_START.code}] ${phoneErrorCodes.INVALID_START.message}`;

  const digits = value.replace(/[^\d]/g, '');

  if (value.startsWith('0')) {
    if (digits.length < 10) return `[${phoneErrorCodes.NAT_TOO_SHORT.code}] ${phoneErrorCodes.NAT_TOO_SHORT.message}`;
    if (digits.length > 10) return `[${phoneErrorCodes.NAT_TOO_LONG.code}] ${phoneErrorCodes.NAT_TOO_LONG.message}`;
    if (!/^0[1-9]/.test(value)) return `[${phoneErrorCodes.NAT_INVALID_PREFIX.code}] ${phoneErrorCodes.NAT_INVALID_PREFIX.message}`;
    if (!/^0[1-7|9]/.test(value)) return `[${phoneErrorCodes.NAT_INVALID_RANGE.code}] ${phoneErrorCodes.NAT_INVALID_RANGE.message}`;
  }

  if (value.startsWith('+')) {
    if (digits.length < 2) return `[${phoneErrorCodes.INT_MISSING_CODE.code}] ${phoneErrorCodes.INT_MISSING_CODE.message}`;
    if (!/^\+(0[1-9]|[1-9][0-9])/.test(value)) return `[${phoneErrorCodes.INT_INVALID_CODE.code}] ${phoneErrorCodes.INT_INVALID_CODE.message}`;
    if (digits.length < 11) return `[${phoneErrorCodes.INT_TOO_SHORT.code}] ${phoneErrorCodes.INT_TOO_SHORT.message}`;
    if (digits.length > 11) return `[${phoneErrorCodes.INT_TOO_LONG.code}] ${phoneErrorCodes.INT_TOO_LONG.message}`;
  }

  if (!regexPhone.test(value)) return `[${phoneErrorCodes.REGEX_FAIL.code}] ${phoneErrorCodes.REGEX_FAIL.message}`;
  return '';
}

// =====================================================
// CODES D'ERREUR — VALIDATION MOT DE PASSE
// Préfixe : MDP-xxx
// =====================================================
export const passwordErrorCodes = {
  EMPTY:            { code: 'MDP-001', family: 'Requis', message: 'Le mot de passe est requis.' },
  TOO_SHORT:        { code: 'MDP-002', family: 'Longueur', message: 'Le mot de passe doit contenir au moins 6 caractères.' },
  TOO_LONG:         { code: 'MDP-003', family: 'Longueur', message: 'Le mot de passe ne doit pas dépasser 128 caractères.' },
  NO_UPPERCASE:     { code: 'MDP-010', family: 'Complexité', message: 'Doit contenir au moins une lettre majuscule (A-Z).' },
  NO_LOWERCASE:     { code: 'MDP-011', family: 'Complexité', message: 'Doit contenir au moins une lettre minuscule (a-z).' },
  NO_DIGIT:         { code: 'MDP-012', family: 'Complexité', message: 'Doit contenir au moins un chiffre (0-9).' },
  NO_SPECIAL:       { code: 'MDP-013', family: 'Complexité', message: 'Doit contenir au moins un caractère spécial (!@#$%^&*…).' },
  ONLY_SPACES:      { code: 'MDP-020', family: 'Format', message: 'Le mot de passe ne peut pas être composé uniquement d\'espaces.' },
  COMMON_PASSWORD:  { code: 'MDP-021', family: 'Sécurité', message: 'Ce mot de passe est trop courant (ex: 123456, password…).' },
  SEQUENTIAL_CHARS: { code: 'MDP-022', family: 'Sécurité', message: 'Séquence de caractères trop prévisible détectée (abc, 123…).' },
  REPEATED_CHARS:   { code: 'MDP-023', family: 'Sécurité', message: 'Trop de caractères identiques consécutifs (ex: aaaaaa).' },
  MISMATCH:         { code: 'MDP-030', family: 'Confirmation', message: 'Les mots de passe ne correspondent pas.' },
};

const COMMON_PASSWORDS = ['123456', '123456789', 'password', 'motdepasse', 'azerty', 'qwerty', '12345678', 'abc123', '111111', '000000', 'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'master', 'login', 'princess', 'football', 'shadow', 'sunshine', 'trustno1', 'iloveyou', 'batman', 'access', 'hello', 'charlie', 'donald', '654321', '1234567', '12345', '1234567890', 'Password1'];

export function validatePassword(password) {
  if (!password) return null;
  if (/^\s+$/.test(password)) return passwordErrorCodes.ONLY_SPACES;
  if (password.length < 6) return passwordErrorCodes.TOO_SHORT;
  if (password.length > 128) return passwordErrorCodes.TOO_LONG;
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) return passwordErrorCodes.COMMON_PASSWORD;
  if (/(.)\1{4,}/.test(password)) return passwordErrorCodes.REPEATED_CHARS;
  if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password)) return passwordErrorCodes.SEQUENTIAL_CHARS;
  if (!/[A-Z]/.test(password)) return passwordErrorCodes.NO_UPPERCASE;
  if (!/[a-z]/.test(password)) return passwordErrorCodes.NO_LOWERCASE;
  if (!/[0-9]/.test(password)) return passwordErrorCodes.NO_DIGIT;
  if (!/[^a-zA-Z0-9]/.test(password)) return passwordErrorCodes.NO_SPECIAL;
  return null; // OK
}

export function validatePasswordConfirmation(password, confirmation) {
  if (!confirmation) return null;
  if (password !== confirmation) return passwordErrorCodes.MISMATCH;
  return validatePassword(password);
}

// =====================================================
// CODES D'ERREUR — VALIDATION NOM D'UTILISATEUR
// Préfixe : USR-xxx
// =====================================================
export const usernameErrorCodes = {
  EMPTY:              { code: 'USR-001', family: 'Requis', message: "Le nom d'utilisateur est requis." },
  TOO_SHORT:          { code: 'USR-002', family: 'Longueur', message: "Le nom d'utilisateur doit contenir au moins 3 caractères." },
  TOO_LONG:           { code: 'USR-003', family: 'Longueur', message: "Le nom d'utilisateur ne doit pas dépasser 30 caractères." },
  STARTS_WITH_SPECIAL:{ code: 'USR-010', family: 'Format', message: "Doit commencer par une lettre ou un chiffre (pas - ou _)." },
  ENDS_WITH_SPECIAL:  { code: 'USR-011', family: 'Format', message: "Ne doit pas finir par un tiret ou un underscore." },
  INVALID_CHARS:      { code: 'USR-012', family: 'Format', message: "Seuls les lettres, chiffres, tirets (-) et underscores (_) sont autorisés." },
  CONSECUTIVE_SPECIAL:{ code: 'USR-013', family: 'Format', message: "Deux tirets ou underscores consécutifs ne sont pas autorisés." },
  ONLY_NUMBERS:       { code: 'USR-014', family: 'Format', message: "Le nom d'utilisateur ne peut pas être composé uniquement de chiffres." },
  RESERVED_NAME:      { code: 'USR-020', family: 'Sécurité', message: "Ce nom d'utilisateur est réservé." },
  CONTAINS_SPACES:    { code: 'USR-021', family: 'Format', message: "Les espaces ne sont pas autorisés dans le nom d'utilisateur." },
};

const RESERVED_USERNAMES = ['admin', 'administrator', 'root', 'superuser', 'moderator', 'mod', 'system', 'support', 'help', 'info', 'contact', 'webmaster', 'postmaster', 'null', 'undefined', 'api', 'www', 'mail', 'ftp'];

export function validateUsername(username) {
  if (!username) return null;
  if (/\s/.test(username)) return usernameErrorCodes.CONTAINS_SPACES;
  if (username.length < 3) return usernameErrorCodes.TOO_SHORT;
  if (username.length > 30) return usernameErrorCodes.TOO_LONG;
  if (/^[-_]/.test(username)) return usernameErrorCodes.STARTS_WITH_SPECIAL;
  if (/[-_]$/.test(username)) return usernameErrorCodes.ENDS_WITH_SPECIAL;
  if (/[^a-zA-Z0-9_-]/.test(username)) return usernameErrorCodes.INVALID_CHARS;
  if (/[-_]{2,}/.test(username)) return usernameErrorCodes.CONSECUTIVE_SPECIAL;
  if (/^[0-9]+$/.test(username)) return usernameErrorCodes.ONLY_NUMBERS;
  if (RESERVED_USERNAMES.includes(username.toLowerCase())) return usernameErrorCodes.RESERVED_NAME;
  return null; // OK
}

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt_a_changer_en_production';

/**
 * Middleware d'authentification JWT
 * Vérifie le token dans l'en-tête Authorization
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ error: 'Token manquant - Authentification requise' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalide ou expiré' });
    }
    req.user = user; // Stocke les infos utilisateur dans req
    next();
  });
};

/**
 * Génère un token JWT pour un utilisateur
 */
export const generateToken = (user) => {
  const payload = {
    id: user.id,
    nom_utilisateur: user.nom_utilisateur,
    email: user.email
  };
  
  // Token valide 24h
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
};

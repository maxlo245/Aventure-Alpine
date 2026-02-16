# ================================
# Stage 1 : Build du frontend React (Vite)
# ================================
FROM node:20-alpine AS frontend-build

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package.json package-lock.json* ./
RUN npm install

# Copier le code source et builder
COPY vite.config.js ./
COPY index.html ./
COPY src/ ./src/

# Variable d'environnement pour le build (API en relatif)
ARG VITE_API_URL=""
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build

# ================================
# Stage 2 : Serveur de production
# ================================
FROM node:20-alpine AS production

WORKDIR /app

# Copier package.json et installer les dépendances de production seulement
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Copier le serveur backend
COPY server/ ./server/

# Copier les données statiques (utilisées par le serveur)
COPY src/data/ ./src/data/

# Copier le frontend buildé
COPY --from=frontend-build /app/dist ./dist

# Port du serveur Express
EXPOSE 5000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=5000

# Démarrer le serveur
CMD ["node", "server/index.js"]

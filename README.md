# Aventures Alpines

A modern web platform for mountain sports enthusiasts, built with React and Express. Provides activity discovery, route planning, multimedia content, and community features.

[![Deploy Status](https://img.shields.io/badge/vercel-deployed-success)](https://aventure-alpine.vercel.app)
[![API Status](https://img.shields.io/badge/api-online-brightgreen)](https://aventure-alpine.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Overview

This application offers a comprehensive solution for discovering alpine activities, planning mountain routes, and accessing curated multimedia content. It features a React-based SPA frontend with server-side API integration and persistent data storage.

**Key features:**
- Activity catalog with advanced filtering
- Route planning with difficulty metrics
- Video gallery and blog content
- Contact form with message persistence
- Responsive design with dark theme
- RESTful API with MySQL backend

## Tech Stack

**Frontend:**
- React 18.2 with functional components
- Vite 5.0 for build tooling
- React Router DOM 7 for client-side routing
- CSS3 animations

**Backend:**
- Node.js 22+ runtime
- Express 4.19 framework
- MySQL 8.0 database (PlanetScale)
- mysql2 driver with Promise API

**Infrastructure:**
- Vercel for frontend hosting (CDN + Edge)
- Render for backend API (Free Tier)
- PlanetScale for serverless MySQL
- GitHub Actions for CI/CD

## Installation

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- MySQL >= 8.0 (or PlanetScale account)

### Local Development

Clone the repository:
```bash
git clone https://github.com/maxlo245/Aventure-Alpine.git
cd Aventure-Alpine
```

Install dependencies:
```bash
npm install
```

Configure environment variables:
```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your database credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=aventures_alpines
PORT=5000
```

Initialize database schema:
```bash
mysql -u root -p < server/db/schema.sql
```

Start the development servers:

Terminal 1 (API):
```bash
npm run server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

Access the application at `http://localhost:5173`

## Deployment

### Production Architecture

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Client     │─────▶│  Vercel CDN  │─────▶│  React SPA   │
└──────────────┘      └──────────────┘      └──────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │  Render API  │
                      └──────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │ PlanetScale  │
                      │    MySQL     │
                      └──────────────┘
```

### Frontend Deployment (Vercel)

1. Import repository on Vercel
2. Configure build settings (auto-detected for Vite)
3. Set environment variable:
   ```
   VITE_API_URL=https://aventure-alpine.onrender.com
   ```
4. Deploy

### Backend Deployment (Render)

1. Create new Web Service from GitHub repository
2. Configure service:
   - **Build Command**: `npm install`
   - **Start Command**: `node server/index.js`
3. Set environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=<planetscale_host>
   DB_PORT=3306
   DB_USER=<planetscale_user>
   DB_PASSWORD=<planetscale_password>
   DB_NAME=aventures_alpines
   ```

### Database Setup (PlanetScale)

1. Create database at https://planetscale.com
2. Obtain connection credentials
3. Initialize schema:
   ```bash
   mysql -h <host> -u <user> -p < server/db/schema.sql
   ```

## API Reference

**Base URL:** `https://aventure-alpine.onrender.com`

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/health` | API health check | - |
| GET | `/api/activities` | Retrieve all activities | - |
| GET | `/api/articles` | Retrieve blog articles | - |
| GET | `/api/videos` | Retrieve video gallery | - |
| GET | `/api/routes` | Retrieve mountain routes | - |
| GET | `/api/experiences` | Retrieve user experiences | - |
| POST | `/api/experiences` | Create new experience | `{ author, title, body }` |
| GET | `/api/contact-messages` | Retrieve contact messages | - |
| POST | `/api/contact-messages` | Submit contact message | `{ name, email, message }` |
| PATCH | `/api/contact-messages/:id` | Update message status | `{ status }` |

### Example Request

```javascript
const response = await fetch('https://aventure-alpine.onrender.com/api/activities');
const data = await response.json();
```

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml
├── server/
│   ├── db/
│   │   ├── pool.js
│   │   └── schema.sql
│   ├── index.js
│   └── .env.example
├── src/
│   ├── data/
│   ├── pages/
│   │   ├── Activities.jsx
│   │   ├── Articles.jsx
│   │   ├── Videos.jsx
│   │   ├── Routes.jsx
│   │   ├── Blog.jsx
│   │   └── Adventures.jsx
│   ├── App.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── package.json
├── vite.config.js
├── vercel.json
├── render.yaml
└── README.md
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run server` | Start Express API server |
| `npm run lint` | Run ESLint |

## Security

- Environment variables for sensitive data
- CORS configuration for authorized domains
- SQL injection prevention via parameterized queries
- Input validation on API endpoints
- HTTPS enforcement in production

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/feature-name`)
5. Open a Pull Request

### Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## Links

- **Production:** https://aventure-alpine.vercel.app
- **API:** https://aventure-alpine.onrender.com
- **Repository:** https://github.com/maxlo245/Aventure-Alpine

## Acknowledgments

Built with:
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [PlanetScale](https://planetscale.com/)
- [Vercel](https://vercel.com/)
- [Render](https://render.com/)

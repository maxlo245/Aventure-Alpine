export default function handler(req, res) {
  res.status(200).json({
    endpoints: [
      '/api/public-articles',
      '/api/public-videos',
      '/api/public-sports',
      '/api/public-routes'
    ],
    note: 'Utilisez ces endpoints pour accéder au contenu public (JSON) sur Vercel.'
  });
}

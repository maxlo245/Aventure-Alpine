
const axios = require('axios');

describe('API publique Aventures Alpines', () => {
  const baseURL = process.env.API_URL || 'http://localhost:5000/api/public';

  test('GET /articles retourne un tableau d\'articles', async () => {
    const res = await axios.get(`${baseURL}/articles`);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0]).toHaveProperty('title');
    expect(res.data[0]).toHaveProperty('image');
  });

  test('GET /videos retourne un tableau de vidéos', async () => {
    const res = await axios.get(`${baseURL}/videos`);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0]).toHaveProperty('title');
    expect(res.data[0]).toHaveProperty('thumbnail');
  });

  test('GET /sports retourne un tableau de sports', async () => {
    const res = await axios.get(`${baseURL}/sports`);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0]).toHaveProperty('name');
    expect(res.data[0]).toHaveProperty('image');
  });

  test('GET /routes retourne un tableau d\'itinéraires', async () => {
    const res = await axios.get(`${baseURL}/routes`);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    expect(res.data[0]).toHaveProperty('name');
    expect(res.data[0]).toHaveProperty('region');
  });
});

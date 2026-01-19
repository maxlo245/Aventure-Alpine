import { articles } from '../src/data/articles.js';

export default function handler(req, res) {
  res.status(200).json(articles);
}

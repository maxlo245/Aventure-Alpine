import { sports } from '../src/data/sports.js';

export default function handler(req, res) {
  res.status(200).json(sports);
}

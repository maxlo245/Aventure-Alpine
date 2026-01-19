import { videos } from '../src/data/videos.js';

export default function handler(req, res) {
  res.status(200).json(videos);
}

import express from 'express';
import {getVideos} from '../controllers/videos.js';

const router = express.Router();

// http://localhost:5000/api/videos/
router.get('/', getVideos)

export default router;
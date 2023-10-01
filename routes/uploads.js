import express from 'express';
import {uploadVideo} from '../controllers/uploads.js';

const router = express.Router();

// http://localhost:5000/videos/
router.post('/', uploadVideo)

export default router;
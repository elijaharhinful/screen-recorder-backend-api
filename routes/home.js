import express from 'express';
import {home} from '../controllers/home.js';

const router = express.Router();

// http://localhost:5000/videos/
router.get('/', home)

export default router;
import express from 'express';
import { getProductRecommendations } from '../controller/geminiController.js';

const router = express.Router();

// Make sure this matches your frontend request
router.post('/api/recommendations', getProductRecommendations); 

export default router;
import express from 'express';
import RobotsRouter from './robots/robots-router.js';

const router = express.Router();

router.use('/robots', RobotsRouter);

export default router;

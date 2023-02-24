import express from 'express';
import { getRobotsControllers } from './robots-controllers.js';
const router = express.Router();

router.route('/').get(getRobotsControllers);

export default router;

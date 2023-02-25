import express from 'express';
import {
  createRobotController,
  getRobotsControllers,
} from './robots-controllers.js';

const router = express.Router();

router.route('/').get(getRobotsControllers).post(createRobotController);

export default router;

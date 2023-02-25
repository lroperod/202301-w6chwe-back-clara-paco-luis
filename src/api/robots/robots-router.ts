import express from 'express';
import {
  createRobotController,
  getRobotsControllers,
  deleteRobotByIdController,
} from './robots-controllers.js';


const router = express.Router();

router.route('/').get(getRobotsControllers).post(createRobotController);

router.route('/:id').delete(deleteRobotByIdController);

export default router;

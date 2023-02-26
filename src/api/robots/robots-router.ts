import express from 'express';
import {
  createRobotController,
  getRobotsControllers,
  deleteRobotByIdController,
  getRobotByIdController,
} from './robots-controllers.js';

const router = express.Router();

router.route('/').get(getRobotsControllers).post(createRobotController);

router
  .route('/:id')
  .get(getRobotByIdController)
  .delete(deleteRobotByIdController);

export default router;

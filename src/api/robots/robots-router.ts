import express from 'express';
import {
  getRobotsControllers,
  deleteRobotByIdController,
} from './robots-controllers.js';
const router = express.Router();

router.route('/').get(getRobotsControllers);

router.route('/:id').delete(deleteRobotByIdController);

export default router;

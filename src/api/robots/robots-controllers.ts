import { RequestHandler } from 'express';
import { RobotModel } from './robot-schema.js';

export const getRobotsControllers: RequestHandler = async (_req, res) => {
  try {
    const foundRobots = await RobotModel.find({});
    res.json(foundRobots);
  } catch (error) {
    res.status(500).json(error);
  }
};

import { RequestHandler } from 'express';
import crypto from 'node:crypto';
import { RobotModel } from './robot-schema.js';

export const getRobotsControllers: RequestHandler = async (_req, res) => {
  try {
    const foundRobots = await RobotModel.find({});
    res.json(foundRobots);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createRobotController: RequestHandler = async (req, res) => {
  const id = crypto.randomUUID();
  const robot: typeof RobotModel = {
    id,
    ...req.body,
  };
  try {
    await RobotModel.create(robot);
    res.status(201).json(robot);
  } catch (error) {
    res.status(500).json(error);
  }
};

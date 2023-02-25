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

export const deleteRobotByIdController: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const dbRes = await RobotModel.deleteOne({ id });
    if (dbRes.deletedCount === 0) {
      res.sendStatus(404);
    } else {
      res.json(id);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

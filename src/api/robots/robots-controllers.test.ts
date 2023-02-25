import { Request, Response } from 'express';
import { RobotModel } from './robot-schema.js';
import {
  getRobotsControllers,
  deleteRobotByIdController,
} from './robots-controllers';

describe('Given a getRobotsControllers function from robots-controller', () => {
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const robots = [
    {
      _id: 'robotId',
      name: 'Mazinger Z',
      img: 'urlRobot',
      characteristics: {
        velocity: 5,
        resistence: 6,
        creation: 1972,
      },
    },
  ];

  test('when the database response is successfull, then it should resolve with a list of robots', async () => {
    RobotModel.find = jest.fn().mockResolvedValue(robots);
    await getRobotsControllers(request, response as Response, jest.fn());
    expect(response.json).toHaveBeenCalledWith(robots);
  });
  test('when the database throws an error then it should respond with status 500', async () => {
    RobotModel.find = jest
      .fn()
      .mockRejectedValue(new Error('somethign was wrong'));
    await getRobotsControllers(request, response as Response, jest.fn());
    expect(response.status).toHaveBeenCalledWith(500);
  });
});

describe('Given a deleteRobotByIdController function from robotsController', () => {
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    sendStatus: jest.fn(),
  } as Partial<Response>;

  test('when the database response is successfull, then it should resolve with robot id deleted', async () => {
    const request = { params: { id: 'mockId' } } as Partial<Request>;
    RobotModel.deleteOne = jest.fn().mockReturnValue(0);
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toHaveBeenCalledWith(request.params?.id);
  });

  test('when the database response with status 404, then it should not resolve with robot id deleted', async () => {
    const request = { params: { id: 'mockId' } } as Partial<Request>;
    RobotModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 0 });
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.sendStatus).toHaveBeenCalledWith(404);
  });

  test('when the database response with status 500, then it should not resolve with robot id deleted', async () => {
    const request = { params: { id: 'mockId' } } as Partial<Request>;
    RobotModel.deleteOne = jest
      .fn()
      .mockRejectedValue(new Error('something was wrong'));
    await deleteRobotByIdController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
});

import { Request, Response } from 'express';
import { RobotModel } from './robot-schema';
import {
  createRobotController,
  getRobotsControllers,
} from './robots-controllers';

describe('Given a getRobotsControllers function from robots-controller', () => {
  const request = {} as Request;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const robots = [
    {
      id: 'robotId',
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

describe('Given a function to create robots', () => {
  const request = {} as Partial<Request>;
  const response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const robot = {
    id: '0',
    name: 'Mazinger Z',
    img: 'urlRobot',
    characteristics: {
      velocity: 5,
      resistence: 6,
      creation: '1972',
    },
  };
  test('When the creation is successful, then the function should return it', async () => {
    RobotModel.create = jest.fn().mockResolvedValue(robot);
    await createRobotController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.json).toHaveBeenCalled();
  });

  test('When the creation is not successful, the server should respond with a 500 status', async () => {
    RobotModel.create = jest.fn().mockRejectedValue(500);
    await createRobotController(
      request as Request,
      response as Response,
      jest.fn(),
    );
    expect(response.status).toHaveBeenCalledWith(500);
  });
});

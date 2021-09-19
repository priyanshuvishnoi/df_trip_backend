import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import Agent from '../models/agent';

export const getToken = (phone: string) => {
  return jwt.sign(phone, process.env.JWT_SECRET!);
};

export const verifyAgent = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  const phone = jwt.verify(token!, process.env.JWT_SECRET!) as string;

  const agent = await Agent.findOne({phone})

  if (!agent) {
    res.status(401).end()
    return
  }
  res.locals.user = agent;
};

import { Request, Response } from 'express';
import { users, User } from '../db';
import { randomUUID } from 'crypto';

export const listUsers = async (req: Request, res: Response) => {
  res.json({ users });
};

export const createUser = async (req: Request, res: Response) => {
  const { username, role } = req.body;
  
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  const newUser: User = {
    id: randomUUID(),
    username,
    role,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(newUser);
  res.status(201).json({ user: newUser });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role, status } = req.body;
  
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (role) user.role = role;
  if (status) user.status = status;
  user.updatedAt = new Date();
  
  res.json({ user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.status = 'INACTIVE';
  user.updatedAt = new Date();
  
  res.json({ message: 'User soft deleted', user });
};

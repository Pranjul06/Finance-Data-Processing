import { z } from 'zod';

export const CreateUserSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    role: z.enum(['VIEWER', 'ANALYST', 'ADMIN']),
  }),
});

export const UpdateUserSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    role: z.enum(['VIEWER', 'ANALYST', 'ADMIN']).optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  }),
});

import { Router } from 'express';
import { listUsers, createUser, updateUser, deleteUser } from '../controllers/user.controller';
import { requireAuth } from '../middlewares/auth';
import { requireRoles, ROLES } from '../middlewares/roles';
import { validate } from '../middlewares/validate';
import { CreateUserSchema, UpdateUserSchema } from '../schemas/user.schema';

const router = Router();

router.use(requireAuth);
router.use(requireRoles([ROLES.ADMIN]));

router.get('/', listUsers);
router.post('/', validate(CreateUserSchema), createUser);
router.put('/:id', validate(UpdateUserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;

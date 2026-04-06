import { Router } from 'express';
import { createRecord, listRecords, getRecord, updateRecord, deleteRecord } from '../controllers/record.controller';
import { requireAuth } from '../middlewares/auth';
import { requireRoles, ROLES } from '../middlewares/roles';
import { validate } from '../middlewares/validate';
import { CreateRecordSchema, UpdateRecordSchema, QueryRecordSchema } from '../schemas/record.schema';

const router = Router();

router.use(requireAuth);

router.get('/', requireRoles([ROLES.ADMIN, ROLES.ANALYST]), validate(QueryRecordSchema), listRecords);
router.get('/:id', requireRoles([ROLES.ADMIN, ROLES.ANALYST]), getRecord);

router.post('/', requireRoles([ROLES.ADMIN]), validate(CreateRecordSchema), createRecord);
router.put('/:id', requireRoles([ROLES.ADMIN]), validate(UpdateRecordSchema), updateRecord);
router.delete('/:id', requireRoles([ROLES.ADMIN]), deleteRecord);

export default router;

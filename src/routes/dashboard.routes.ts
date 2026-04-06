import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller';
import { requireAuth } from '../middlewares/auth';
import { requireRoles, ROLES } from '../middlewares/roles';

const router = Router();

router.use(requireAuth);

router.get('/summary', requireRoles([ROLES.VIEWER, ROLES.ANALYST, ROLES.ADMIN]), getDashboardSummary);

export default router;

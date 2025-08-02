'use strict';

import { Router } from 'express';
import healthController from '../controllers/index.js';

const router = Router();

router.get('/', healthController.healthCheck);

export default router;

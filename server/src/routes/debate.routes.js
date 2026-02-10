import express from 'express'
import {
  NewDebate,
  GetAllDebates,
  GetDebateById,
  JoinDebate,
  NewArgument,
  UpdateDebate,
  UpdateTime,
  DeleteDebate
} from '../controllers/debate.controller.js';
import { authentication } from '../middleware/auth.middleware.js';

const router = express.Router();
router.route('/')
  .get(authentication, GetAllDebates)
  .post(authentication, NewDebate);

router.route('/:id')
  .get(authentication, GetDebateById)
  .delete(authentication, DeleteDebate);

router.post('/:id/join', authentication, JoinDebate);
router.post('/:id/arguments', authentication, NewArgument);
router.put('/:id/status', authentication, UpdateDebate);
router.put('/:id/speaker-time', authentication, UpdateTime);

export default router;
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
  .get(authentication, GetAllDebates) //route to get all debates
  .post(authentication, NewDebate); //route to create new debate

router.route('/:id') 
  .get(authentication, GetDebateById) //route to get debate by id
  .delete(authentication, DeleteDebate); //route to delete debate 
 
router.post('/:id/join', authentication, JoinDebate); //route to join debate
router.post('/:id/arguments', authentication, NewArgument); //route to add new argument
router.put('/:id/status', authentication, UpdateDebate); //route to update debate status
router.put('/:id/speaker-time', authentication, UpdateTime); //route to update speaker time

export default router;
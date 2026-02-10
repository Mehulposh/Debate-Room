import express from 'express'
import {
  UserRegistration,
  Login,
  GetProfile,
  UpdateProfile
} from '../controllers/auth.controller.js';
import { authentication } from  '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/register', UserRegistration);
router.post('/login', Login);
router.route('/profile')
  .get(authentication, GetProfile)
  .put(authentication, UpdateProfile);

export default router;
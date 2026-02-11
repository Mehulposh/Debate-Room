import express from 'express'
import {
  UserRegistration,
  Login,
  GetProfile,
  UpdateProfile
} from '../controllers/auth.controller.js';
import { authentication } from  '../middleware/auth.middleware.js';

const router = express.Router();
router.post('/register', UserRegistration); //route for user registration
router.post('/login', Login); //route for login
router.route('/profile') //profile route
  .get(authentication, GetProfile) //route to get user profile
  .put(authentication, UpdateProfile); //route to update user profile

export default router;
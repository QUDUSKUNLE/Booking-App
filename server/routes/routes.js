import express from 'express';
import UserController from '../controllers/UserController';
import validateRequest from '../middlewares/validateRequest';
import verifyToken from '../middlewares/verifyToken';


/**
 * Creates express Router
 */
const route = express.Router();

/**
 * Route for signup users
 */
route.post(
  '/signup',
  validateRequest,
  UserController.signUp
);

/**
 * Route for signin users
 */
route.post(
  '/signin',
  validateRequest,
  UserController.signIn
);

/**
 * Route for users to request for password reset
 */
route.post(
  '/resetpasswords',
  validateRequest,
  UserController.resetPassword
);

/**
 * Route for users to update password
 */
route.put(
  '/updatepasswords/:hash',
  verifyToken,
  validateRequest,
  UserController.updatePassword
);

export default route;

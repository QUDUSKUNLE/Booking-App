import express from 'express';
import UserController from '../controllers/UserController';
import validateRequest from '../middlewares/validateRequest';
// import verifyToken from '../middlewares/verifyToken';


/**
 * Creates express Router
 */
const route = express.Router();

/**
 * Route for signup users
 */
route.post(
  '/api/v1/signup',
  validateRequest,
  UserController.signUp
);

/**
 * Route for signin users
 */
route.post(
  '/api/v1/signin',
  validateRequest,
  UserController.signIn
);

export default route;

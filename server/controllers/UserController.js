import bcrypt from 'bcrypt';
import capitalize from 'capitalize';
// import crypto from 'crypto';
import dotenv from 'dotenv';
import createToken from '../utils/createToken';
// import sendMail from '../utils/sendEmail';
import User from '../models/User';

dotenv.config();

/**
 * @class UserController
 */
class UserController {
  /**
   * signup a new user
   * Routes: POST: /api/v1/signup
   * @param {any} req user request object
   * @param {any} res server response
   * @return {void} json server response
   */
  static signUp(req, res) {
    if ((!req.body.username) || (!req.body.email) || (!req.body.password)) {
      res.status(400).json({
        error: 'Either email, password or username must not be empty',
        success: false
      });
    } else {
      User.findOne({
        email: req.body.email
      })
        .exec()
        .then((email) => {
          if (email) {
            res.status(409).json({
              error: 'Email is already registered',
              success: false
            });
          } else {
            User.findOne({
              username: capitalize(req.body.username)
            })
              .exec()
              .then((username) => {
                if (username) {
                  res.status(409).json({
                    error: 'Username already exist',
                    success: false
                  });
                } else {
                  const user = new User({
                    username: capitalize(req.body.username),
                    password: req.body.password,
                    email: req.body.email
                  });
                  user.save((err, newUser) => {
                    if (err) {
                      return res.status(500).json({
                        success: false,
                        message: err
                      });
                    }
                    const userDetails = {
                      username: newUser.username,
                      email: newUser.email
                    };
                    const userEncode = {
                      username: newUser.username,
                      email: newUser.email,
                      userId: newUser._id
                    };
                    return res.status(201).json({
                      message: 'Sign up successful',
                      success: true,
                      token: createToken(userEncode),
                      userDetails
                    });
                  });
                }
              });
          }
        });
    }
  }

  /**
  * * Routes: POST: /api/v1/signin
  * @param {any} req user request object
  * @param {any} res server response
  * @return {void} json server response
  */
  static signIn(req, res) {
    if ((!req.body.email) || (!req.body.password)) {
      res.status(400).json({
        error: 'Email or password must not be empty',
        success: false
      });
    } else {
      User.findOne({
        email: req.body.email
      })
        .exec((err, response) => {
          if (err) {
            return res.status(500).json({
              success: false,
              error: 'internal server error'
            });
          }
          if (!response) {
            return res.status(404).json({
              success: false,
              error: 'User does not exist'
            });
          }
          // compare passwords
          if (!bcrypt.compareSync(req.body.password, response.password)) {
            return res.status(401).json({
              success: false,
              error: 'Email or password is invalid'
            });
          }
          const userDetails = {
            username: response.username,
            email: response.email
          };
          const userEncode = {
            username: response.username,
            email: response.email,
            userId: response._id
          };
          return res.status(200).json({
            message: 'Sign in successful',
            success: true,
            token: createToken(userEncode),
            userDetails
          });
        });
    }
  }
}

export default UserController;

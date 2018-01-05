import axios from 'axios';
import AppConstants from '../constants/AppConstants';

/**
 * @function signUpRequest
 * @param { object } userDetails
 * @returns {object} dispatches an action
 * @description It makes an api call to register a new user
 */
const signUpRequest = userDetails => dispatch =>
  axios.post('/api/v1/signup', userDetails)
    .then((response) => {
      dispatch({ type: AppConstants.SIGNUP_SUCCESS, response });
      const { token } = response.data;
      localStorage.setItem('jwtToken', token);
    }).catch((err) => {
      dispatch({ type: AppConstants.SIGNUP_ERROR, err });
    });

export default signUpRequest;

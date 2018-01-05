import AppConstants from '../constants/AppConstants';
import initialState from '../app/initialState';

export default (state = initialState.register, action) => {
  switch (action.type) {
    case AppConstants.SIGNUP_SUCCESS:
      return [...state, action];

    case AppConstants.SIGNUP_ERROR:
      return [];

    default:
      return state;
  }
};

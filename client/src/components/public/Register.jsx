import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterForm from '../containers/RegisterForm';
import signUpRequest from '../../actions/AppActions';

/**
 * @method Register
 * @param {*} props
 * @returns {DOM} DOM Element
 * @description renders the signup page
 */
const Register = props => (
  <div>
    <RegisterForm signUpRequest={props.signUpRequest} />
  </div>
);

Register.propTypes = {
  signUpRequest: PropTypes.func.isRequired
};

export default connect(null, { signUpRequest })(Register);

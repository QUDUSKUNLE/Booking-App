import React from 'react';
import PropTypes from 'prop-types';
import initialState from '../../app/initialState';

/**
 * @description - renders RegisterForm Component
 * @class RegisterForm
 * @extends {React.Component}
 */
export default class RegisterForm extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof RegisterForm
   */
  constructor(props) {
    super(props);
    this.state = initialState.register;
    this.onChange = this.onChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  /**
  * @method onChange
  * @description class method that sets user input to store
  * @return {void}
  * @param {event} event
  */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      show: false
    });
  }

  /**
  * @method handleRegister
  * @description class method that makes an action call to sign up a user
  * @return {void}
  * @param {signUpEvent} signUpEvent
  */
  handleRegister(signUpEvent) {
    signUpEvent.preventDefault();
    this.props.signUpRequest(this.state);
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {Object} RegisterForm component
  */
  render() {
    return (
      <div id="register" className="modal" >
        <div className="modal-content">
          <div className="container">
            <h5
              className="center-align header"
            >Register
            </h5>
            <form
              id="register_form"
              className="col s12"
              onSubmit={this.handleRegister}
            >
              <div className="input-field col s12">
                <input
                  value={this.state.username}
                  onChange={this.onChange}
                  name="username"
                  type="text"
                  id="reg_username"
                  className="validate header username"
                  required
                />
                <label
                  htmlFor="username"
                >Username
                </label>
              </div>
              <div className="input-field col s12">
                <input
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  type="email"
                  id="reg_email"
                  className="validate header"
                  required
                />
                <label
                  htmlFor="email"
                >Email
                </label>
              </div>
              <div className="input-field col s12">
                <input
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                  type="password"
                  id="reg_password"
                  className="validate header"
                  required
                />
                <label
                  htmlFor="password"
                >Password
                </label>
              </div>
              <div className="row">
                <button
                  className="btn waves-effect deep-purple darken-4 col s12"
                  type="submit"
                >REGISTER
                </button>
                <br />
                <br />
                <p
                  className="center-align header"
                >Already have an account?{' '}
                  <a
                    className="modal-trigger modal-close"
                    href="#login"
                  >LOG IN
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  signUpRequest: PropTypes.func.isRequired
};

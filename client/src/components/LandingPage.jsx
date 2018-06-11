import React from 'react';
import Register from './public/Register';
import AppActions from '../actions/AppActions';

/**
 * @description - renders LandingPage Component
 * @class LandingPage
 * @extends {React.Component}
 */
export default class LandingPage extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props
   * @memberof HomePage
   */
  constructor(props) {
    super(props);
    this.openRegister = this.openRegister.bind(this);
  }
  /**
  * @method componentDidMount
  * @description This listening to event in the AppStore
  * @return {void}
  * @memberof LogInForm
  */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
  * @method openRegister
  * @description class method that makes an action call to sign up a user
  * @return {void}
  * @param {event} event
  */
  openRegister(event) {
    event.preventDefault();
    $('#register').modal('open');
  }

  /**
  * @description - render method, React lifecycle method
  * @returns {object} LogInForm component
  */
  render() {
    return (
      <div>
        <Register signUpRequest={AppActions.signUpRequest} />
        <div className="container">
          <div className="logo">
            <h4>BookIT</h4>
          </div>
          <div className="col s12 flex-center">
            <div className="center-align">
              <h3>Book Your Appointment Now</h3>
              <div className="container">
                <a
                  href="##"
                  id="open_reg"
                  onClick={this.openRegister}
                  className="btn deep-purple darken-4 margin-top s6"
                >Register
                </a>
                <button
                  data-target="login"
                  id="open_log"
                  className="btn modal-trigger deep-purple darken-4 margin-top s6"
                >LOG IN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

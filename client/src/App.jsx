import React from 'react';
// import { Router } from 'react-router';
import { Router, Route, Switch } from 'react-router-dom';
// import { Route, Switch } from 'react-router-dom';
// import history from '../utils/history';
import { createBrowserHistory } from 'history';
import LandingPage from '../src/components/LandingPage';

// import '../public/styles/materialize.min.css';
// import '../public/styles/app.scss';
// import '../public/js/jquery-3.2.1.min';
// import '../public/js/materialize.min';

const history = createBrowserHistory();

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
  </Router>
);

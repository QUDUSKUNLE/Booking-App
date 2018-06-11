import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import LandingPage from '../src/components/LandingPage';


const history = createBrowserHistory();

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
  </Router>
);

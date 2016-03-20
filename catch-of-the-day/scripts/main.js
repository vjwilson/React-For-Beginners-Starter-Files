import React    from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';

import { createHistory } from 'history';
const history = createHistory();

/**
 * Import Components
 */

import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';

/**
 * Routes
 */

var routes = (
  <Router history={history}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#main'));

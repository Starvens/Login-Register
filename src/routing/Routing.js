import React from 'react';

import { Switch, Route } from "react-router-dom";

// Pages
import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';

// Private Route
import PrivateRoute from './PrivateRoute'


export default function Routing() {
  return (
    <>
      <Switch>
        <PrivateRoute path="/page2" component={Page2} />
        <PrivateRoute path="/page1" component={Page1} />
        <PrivateRoute path="/home" component={Home} />
        <Route path="/reg" component={Register} />
        <Route path="/" component={Login} />

      </Switch>
    </>
  )
}

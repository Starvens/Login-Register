import React from 'react';

import {
    Switch,
    Route,
} from "react-router-dom";



// Components
import Reg from '../pages/Reg';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';

// Restricted Routs Check
import PrivateRoute from './PrivateRoute';

export default function Routes() {


    return (
        <>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/reg">
                    <Reg />
                </Route>
                <PrivateRoute component={Page1} path="/page1"></PrivateRoute>
                <PrivateRoute component={Page2} path="/page2"></PrivateRoute>
                <PrivateRoute component={Page3} path="/page3"></PrivateRoute>
                <PrivateRoute component={Home} path="/"></PrivateRoute>
            </Switch>
        </>
    )
}

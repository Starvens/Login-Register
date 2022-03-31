import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// import axios from 'axios';


export default function PrivateRoute({ component: Component, ...rest }) {

    // const checkToken = (token) => {
    //     axios.post('http://localhost:3000/api/web/auth/validateToken', token).then(res => {
    //         return true
    //     }).catch(err => {
    //         return false
    //     })
    // }

    return (
        <Route {...rest} render={props => (
            localStorage.getItem('token')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )
}

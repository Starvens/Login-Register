import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import {
    useHistory
} from "react-router-dom";

import http from './_utils/http';

import Header from '../_layouts/Header'

const SignupSchema = Yup.object().shape({
    password: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export default function Login() {
    let history = useHistory();
    return (
        <div>
            <Header />
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    http.post('auth/login', values)
                        .then(res => {
                            if (res.data.success) {
                                localStorage.setItem('token', res.data.token);
                                history.push("/");
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="email" type="email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}

                        <Field name="password" type="password" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
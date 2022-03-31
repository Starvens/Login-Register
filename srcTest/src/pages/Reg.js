import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    useHistory
} from "react-router-dom";

import http from './_utils/http';


import Header from '../_layouts/Header';

const SignupSchema = Yup.object().shape({
    password: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
});

export default function Reg() {
    let history = useHistory();

    const goToLogin = () => {
        history.push("/login");
    }
    return (
        <div>
            <Header />
            <h1>Signup</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={values => {
                    http.post('auth/register', values)
                        .then(res => {
                            if (res.data.success) {
                                goToLogin();
                            }
                        }).catch(err => {

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
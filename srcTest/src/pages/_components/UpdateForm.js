import React from 'react';

// Bootstrap
import { Row, Col } from 'react-bootstrap';

// Formik
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// HTTP
import http from '../_utils/http';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    age: Yup.number()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

export default function UpdateForm({ user, setRefresh, refresh }) {
    return (
        <div>
            <h1>Update User</h1>
            <Formik
                initialValues={user}
                enableReinitialize={true}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                    http.put(`employee/${user._id}`, values, {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    })
                        .then(function (response) {
                            setRefresh(!refresh)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Row>
                            <Col xs={12}>
                                <Field name="name" placeholder="Enter Name" />
                                {errors.name && touched.name ? (
                                    <div>{errors.name}</div>
                                ) : null}
                            </Col>
                            <Col xs={12}>
                                <Field name="age" placeholder="Enter Age" />
                                {errors.age && touched.age ? (
                                    <div>{errors.age}</div>
                                ) : null}
                            </Col>
                            <Col xs={12}>
                                <Field name="email" type="email" placeholder="Enter Email" />
                                {errors.email && touched.email ? <div>{errors.email}</div> : null}
                            </Col>
                            <Col xs={12}>
                                <Field name="phone" type="text" placeholder="Enter Phone" />
                                {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
                            </Col>
                            <Col xs={12}>
                                <button type="submit">Submit</button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

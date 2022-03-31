import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { useHistory } from "react-router-dom";

import Header from "../_layouts/Header";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .min(2, "Too short!")
    .max(15, "Too long!")
    .required("Required"),
});

export default function Register() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <h2>Sign Up</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          axios
            .post("http://localhost:4000/auth/reg", values)
            .then((res) => {
              console.log(res.status)
              if (res.status === 200) {
                history.push("/");
              }
            })
            .catch((err) => { });
        }}
      >
        {({ errors, touched }) => (
          <Form >
            <Field name="email" type="email" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <Field name="password" type="password" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <button type="submit" >Registered</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

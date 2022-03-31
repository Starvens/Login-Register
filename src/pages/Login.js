import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Header from "../_layouts/Header";

const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function Login() {
  let history = useHistory();


  return (
    <div>
      <Header />
      <h1>Login</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        // validationSchema={() => {}}
        onSubmit={(values) => {
          axios
            .post("http://localhost:4000/auth/login", values)
            .then((res) => {
              console.log(res.status)
              if (res.status === 200) {
                localStorage.setItem("token", res.data.token);
                history.push("/home");
              }
            })
            .catch((err) => {
              console.log(err);
            });
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

            <button type="submit" >Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

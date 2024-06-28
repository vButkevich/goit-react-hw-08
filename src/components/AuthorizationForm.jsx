// import React from "react";
import { Formik, Form, Field } from "formik";

const AuthorizationForm = ({ mode = "login", submit = { submit } }) => {
  const handleSubmit = (values, { resetForm }) => {
    submit(values);
    resetForm();
  };

  const initialValues = () => {
    switch (mode) {
      case "login":
        return { email: "", password: "" };
      case "registration":
        return { name: "", email: "", password: "" };
    }
  };

  const submitButtonText = () => {
    switch (mode) {
      case "login":
        return "Login";
      case "registration":
        return "Register";
    }
  };
  return (
    <Formik initialValues={initialValues()} onSubmit={handleSubmit}>
      <Form>
        {mode === "registration" && (
          <label>
            Name
            <Field type="text" name="name" />
          </label>
        )}
        <label>
          Email
          <Field type="email" name="email" />
        </label>
        <label>
          Password
          <Field type="password" name="password" />
        </label>
        <button type="submit">{submitButtonText()}</button>
      </Form>
    </Formik>
  );
};

export default AuthorizationForm;

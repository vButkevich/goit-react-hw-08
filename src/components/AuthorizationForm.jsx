// import React from "react";
import { Formik, Form, Field } from "formik";
import css from "../components/ContactForm/ContactForm";

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
      <Form className={css.form}>
        {mode === "registration" && (
          <div className={css["form-element"]}>
            <label>
              Name
              <Field type="text" name="name" />
            </label>
          </div>
        )}
        <div className={css["form-element"]}>
          <label>
            Email
            <Field type="email" name="email" />
          </label>
        </div>
        <div className={css["form-element"]}>
          <label>
            Password
            <Field type="password" name="password" />
          </label>
        </div>
        <button type="submit">{submitButtonText()}</button>
      </Form>
    </Formik>
  );
};

export default AuthorizationForm;

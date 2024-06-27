import { useId } from "react";
import { useDispatch } from "react-redux";
//import { addContact } from "../../redux/contactsSlice";
import { addContact } from "../../redux/contactsOps";
import css from "./ContactForm.module.css";

import { Formik } from "formik";
import { Form, Field } from "formik";
import { ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactForm = () => {
  const dispatch = useDispatch();

  const nameFieldId = useId();
  const numberFieldId = useId();

  const initialValues = {
    name: "",
    number: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "min.length - 3")
      .max(50, "max.length - 50")
      .required("is required"),
    number: Yup.string()
      .min(3, "min.length - 3")
      .max(50, "max.length - 50")
      .required("is required"),
  });

  const onSubmit = (values, { resetForm }) => {
    dispatch(
      addContact({
        id: Date.now().toString(),
        name: values.name,
        number: values.number,
        dateTimeStamp: Date.now(),
      })
    );

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form className={css.form}>
        <div className={css["form-element"]}>
          <label htmlFor="name">
            Name:
            <ErrorMessage name="name" component="span" className={css.error} />
          </label>
          <Field type="text" name="name" id={nameFieldId} />
        </div>
        <div className={css["form-element"]}>
          <label htmlFor="number">
            Number:
            <ErrorMessage
              name="number"
              component="span"
              className={css.error}
            />
          </label>
          <Field type="text" name="number" id={numberFieldId} />
        </div>
        <button type="submit">Add Contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;

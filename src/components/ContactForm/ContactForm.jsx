import { useId, useState } from "react";
import { useDispatch } from "react-redux";
//import { addContact } from "../../redux/contactsSlice";
import { addContact, updateContact } from "../../redux/contacts/operations";
import css from "./ContactForm.module.css";

import { Formik } from "formik";
import { Form, Field } from "formik";
import { ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactForm = (data = null) => {
  const dispatch = useDispatch();
  // const [contactId, setContactId] = useState(null);
  const isNew = Object.keys(data).length === 0;
  const isEdit = !isNew;
  const mode = Object.keys(data).length === 0 ? "new" : "edit";
  console.log("data :>> ", data);
  console.log("data.len :>> ", data.arguments);
  console.log("mode :>> ", mode);

  const idFieldId = useId();
  const nameFieldId = useId();
  const numberFieldId = useId();

  const initialValues = isNew
    ? {
        name: "",
        number: "",
      }
    : {
        //id: data.data.id,
        name: data.data.name,
        number: data.data.number,
      };

  console.log("initialValues :>> ", initialValues);
  const id = initialValues?.id;
  // setId(initialValues.id);

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
    if (isNew) {
      console.log("New.submit:values :>> ", values);
      dispatch(
        addContact({
          id: Date.now().toString(),
          name: values.name,
          number: values.number,
          dateTimeStamp: Date.now(),
        })
      );
    }
    if (isEdit) {
      console.log("Edit.submit:values :>> ", values);
      console.log("Edit.submit:id :>> ", data.data.id);
      console.log("Edit.submit:values :>> ", values);
      dispatch(
        updateContact({
          id: data.data.id,
          values: values,
          // name: values.name,
          // number: values.number,
          // // dateTimeStamp: Date.now(),
        })
      );
    }
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
          {/* {isEdit && <Field type="text" name="id" id={idFieldId} value={id} />} */}
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
        {isNew && <button type="submit">Add Contact</button>}
        {isEdit && <button type="submit">Save Contact</button>}
      </Form>
    </Formik>
  );
};

export default ContactForm;

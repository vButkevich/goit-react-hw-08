import { useId } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addContact, updateContact } from "../../redux/contacts/operations";
import css from "./ContactForm.module.css";

import toast from "react-hot-toast";

import { Formik } from "formik";
import { Form, Field } from "formik";
import { ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactForm = ({ mode = "new", data = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formLabel = mode === "new" ? "New Contact" : "Edit Contact";

  console.log("ContactForm.mode :>> ", mode);
  console.log("ContactForm.data :>> ", data);
  console.log("ContactForm.data.len :>> ", data.arguments);

  const nameFieldId = useId();
  const numberFieldId = useId();

  const initialValues =
    mode === "new"
      ? {
          name: "",
          number: "",
        }
      : {
          name: data.name,
          number: data.number,
        };
  console.log("initialValues :>> ", initialValues);

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

  const handleSubmit = async (values, { resetForm }) => {
    if (mode === "new") {
      console.log("New.submit:values :>> ", values);
      await dispatch(addContact(values));
      toast.success("Contact added successfully");
    }
    if (mode === "edit") {
      console.log("Edit.submit:values :>> ", values);
      console.log("Edit.submit:id :>> ", data.id);
      console.log("Edit.submit:values :>> ", values);
      await dispatch(updateContact({ id: data.id, values: values }));
      toast.success("Contact updated successfully");
    }
    resetForm();
    navigate("/contacts");
  };

  return (
    <div className={css.title}>
      <h2>
        {formLabel}
        {/* <span>:{data.id}</span> */}
      </h2>
      <Formik
        initialValues={initialValues}
        // initialValues={{ name: contact.name || "", number: contact.number || "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css["form-element"]}>
            {/* {isEdit && <Field type="text" name="id" id={idFieldId} value={id} />} */}
            <label htmlFor="name">
              Name:
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
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
          {/* {isNew && <button type="submit">Add Contact</button>} */}
          {/* {isEdit && <button type="submit">Save Contact</button>} */}
          <div className={css.buttons}>
            <button type="button" onClick={() => navigate("/contacts")}>
              Cancel
            </button>
            <button type="submit">
              {mode === "new" ? "Add Contact" : "Update Contact"}
            </button>
            {/* <button type="reset">Close</button> */}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;

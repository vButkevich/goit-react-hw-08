// import React from "react";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useParams } from "react-router-dom";
import { refreshUser } from "./redux/auth/operations.js";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ContactsPage from "./pages/ContactPage/ContactsPage.jsx";
import RegistrationPage from "./pages/RegistrationPage";
/*
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
*/

import ContactForm from "./components/ContactForm/ContactForm.jsx";

import "./App.css";
import { selectContacts } from "./redux/contacts/selectors.js";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      {/* <Layout> */}
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="register"
            element={<RestrictedRoute component={RegistrationPage} />}
          />
          <Route
            path="login"
            element={<RestrictedRoute component={LoginPage} />}
          />
          <Route
            path="contacts"
            element={<PrivateRoute component={ContactsPage} />}
          />
          <Route
            path="contact"
            element={<PrivateRoute component={ContactForm} />}
          />
          <Route path="contact/:id" element={<ContactFormWrapper />} />
        </Route>

        <Route path="*" element={<div>404</div>} />
      </Routes>
      {/* </Layout> */}
    </>
  );
};

const ContactFormWrapper = () => {
  const { id } = useParams();
  const contacts = useSelector(selectContacts);
  const contact = contacts.find((contact) => contact.id === id);
  console.log("ContactFormWrapper.contact :>> ", contact);
  return <ContactForm mode="edit" data={contact} />;
};
export default App;

/*import { useEffect } from "react";
import { Circles } from "react-loader-spinner";
import { FaAddressBook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContactsCount,
  selectIsLoading,
  selectHasError,
} from "./redux/contactsSlice";
import { fetchContacts } from "./redux/contactsOps";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const hasError = useSelector(selectHasError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contactsCount = useSelector(selectContactsCount);
  const color = "gray";
  return (
    <div>
      <h1>
        <span>
          <FaAddressBook color={color} />
        </span>
        Contact Book
        {contactsCount > 0 && <sub>[{contactsCount}]</sub>}
      </h1>
      <ContactForm />
      <hr></hr>
      <SearchBox />
      {hasError && <p>Error:{hasError}</p>}
      {isLoading && (
        <Circles
          height="60"
          width="60"
          color={color}
          ariaLabel="circles-loading"
          // wrapperStyle={{ display: "flex", justifyContent: "center" }}
          wrapperClass="isLoading"
          visible={true}
        />
      )}
      <ContactList />
      </div>
      </>
  );
};

export default App;
*/

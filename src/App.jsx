// import React from "react";
import { lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useParams } from "react-router-dom";
import { refreshAuthToken } from "./redux/auth/operations.js";
import { Circles } from "react-loader-spinner";

import Layout from "./components/Layout/Layout.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import RestrictedRoute from "./components/RestrictedRoute/RestrictedRoute.jsx";

const HomePage = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage.jsx"));
const ContactsPage = lazy(() => import("./pages/ContactPage/ContactsPage"));
const RegistrationPage = lazy(() =>
  import("./pages/RegistrationPage/RegistrationPage.jsx")
);

import ContactForm from "./components/ContactForm/ContactForm.jsx";

import "./App.css";
import { Toaster } from "react-hot-toast";
import { selectContacts } from "./redux/contacts/selectors.js";
import { selectIsRefreshing } from "./redux/auth/selectors.js";

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshAuthToken());
  }, [dispatch]);

  const color = "gray";
  return isRefreshing ? (
    <Circles
      height="60"
      width="60"
      color={color}
      ariaLabel="circles-loading"
      // wrapperStyle={{ display: "flex", justifyContent: "center" }}
      wrapperClass="isLoading"
      visible={true}
    />
  ) : (
    <>
      <Layout>
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="login"
            element={
              <RestrictedRoute component={LoginPage} navigateTo="/contacts" />
            }
          />
          <Route
            path="register"
            element={
              <RestrictedRoute
                component={RegistrationPage}
                navigateTo="/contacts"
              />
            }
          />
          <Route
            path="contacts"
            element={<PrivateRoute component={ContactsPage} />}
          />
          <Route
            path="contact"
            element={<PrivateRoute component={ContactForm} />}
          />
          <Route
            path="contact/:id"
            element={<PrivateRoute component={ContactFormWrapper} />}
          />

          {/* <Route element={<RestrictedRoute />}>
            <Route path="register" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="contact/:id" element={<ContactFormWrapper />} />
            <Route path="contact" element={<ContactForm />} />
          </Route> */}

          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Layout>
    </>
  );
};

const ContactFormWrapper = () => {
  const { id } = useParams();
  const contacts = useSelector(selectContacts);
  const contact = contacts.find((contact) => contact.id === id);
  return <ContactForm mode="edit" data={contact} />;
};
export default App;

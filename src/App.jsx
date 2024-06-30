// import React from "react";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useParams } from "react-router-dom";
import { refreshUser } from "./redux/auth/operations.js";
import { Circles } from "react-loader-spinner";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import RestrictedRoute from "./components/RestrictedRoute";

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
    dispatch(refreshUser());
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
      {/* <Layout> */}
      <Toaster />
      <Suspense fallback={null}>
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
      </Suspense>
      {/* </Layout> */}
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

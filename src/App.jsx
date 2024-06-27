import { useEffect } from "react";
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
  );
};

export default App;

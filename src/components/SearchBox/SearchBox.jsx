import { useId } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeFilterQuery } from "../../redux/filter/slice";
import { selectFilterQuery } from "../../redux/filter/selectors";
import { FaSearch, FaTimes } from "react-icons/fa";

import css from "./SearchBox.module.css";
import "./SearchWithClear.css";

import {
  selectContacts,
  selectContactsCount,
} from "../../redux/contacts/selectors";

const SearchBox = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleFilterQuery = (e) => {
    const query = e.target.value;
    dispatch(changeFilterQuery(query));
  };

  const clearFilterQuery = () => {
    dispatch(changeFilterQuery(""));
  };

  const query = useSelector(selectFilterQuery);
  const contactItems = useSelector(selectContactsCount);

  const serarchTextid = `searchTextId:${useId()}`;
  return (
    <>
      <form className={css.form} id="searchBox">
        <label className={css.label}>Search Contacts (by name)</label>
        <div className={css["input-container"]}>
          <FaSearch className={css["icon"]} />
          <input
            type="text"
            value={query}
            id={serarchTextid}
            onChange={handleFilterQuery}
            placeholder="Enter name ..."
          />
          <FaSearch className="icon search-icon" />
          {query && (
            <FaTimes className="icon clear-icon" onClick={clearFilterQuery} />
          )}
        </div>
      </form>
      <p>
        <b>contacts:</b> ({contacts?.length}) of {contactItems}
      </p>
    </>
  );
};

export default SearchBox;

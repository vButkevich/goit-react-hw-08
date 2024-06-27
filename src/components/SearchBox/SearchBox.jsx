import { useId } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeFilterQuery, selectFilterQuery } from "../../redux/filterSlice";
import { FaSearch, FaTimes } from "react-icons/fa";

import css from "./SearchBox.module.css";
import "./SearchWithClear.css";

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleFilterQuery = (e) => {
    const query = e.target.value;
    dispatch(changeFilterQuery(query));
  };

  const clearFilterQuery = () => {
    dispatch(changeFilterQuery(""));
  };

  const query = useSelector(selectFilterQuery);

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
    </>
  );
};

export default SearchBox;

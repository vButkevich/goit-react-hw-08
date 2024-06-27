import { createSelector } from "@reduxjs/toolkit";
import { selectFilterQuery } from "../filter/selectors";

export const selectHasError = (state) => state.contacts.hasError;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectContacts = createSelector(
  [(state) => state.contacts.items, selectFilterQuery],
  (contacts, query) =>
    contacts?.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    )
);

export const selectContactsCount = createSelector(
  [(state) => state.contacts.items],
  (contacts) => contacts?.length
);

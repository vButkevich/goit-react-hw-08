import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { selectFilterQuery } from "./filterSlice";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";

const contactsPending = (state) => {
  state.isLoading = true;
  state.hasError = null;
};
const contactsRejected = (state, payload) => {
  state.hasError = payload;
  state.isLoading = false;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    hasError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        contactsPending(state);
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, (state, { payload }) => {
        contactsRejected(state, payload);
      })
      .addCase(addContact.pending, (state) => {
        contactsPending(state);
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        // console.log("addContact.fulfilled.push:payload :>> ", payload);
        state.isLoading = false;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        contactsRejected(state, payload);
      })
      .addCase(deleteContact.pending, (state) => {
        contactsPending(state);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = state.items?.filter((contact) => contact.id !== payload);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        contactsRejected(state, payload);
      });
  },
});

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

export const contactsReducer = contactsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import {
  addContact,
  fetchContacts,
  updateContact,
  deleteContact,
} from "../contacts/operations";

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
  reducers: {
    resetContacts: (state) => {
      state.items = [];
      state.isLoading = false;
      state.hasError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET:(get/fetch)---------------------------------------
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
      //POST:(add)---------------------------------------------
      .addCase(addContact.pending, (state) => {
        contactsPending(state);
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items.push(payload);
      })
      .addCase(addContact.rejected, (state, { payload }) => {
        contactsRejected(state, payload);
      })
      // DELETE:------------------------------------------------
      .addCase(deleteContact.pending, (state) => {
        contactsPending(state);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = state.items?.filter((contact) => contact.id !== payload);
      })
      .addCase(deleteContact.rejected, (state, { payload }) => {
        contactsRejected(state, payload);
      })
      // PATCH:(update/edit)-----------------------------------
      .addCase(updateContact.pending, (state) => {
        contactsPending(state);
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const index = state.items.findIndex(
          (contact) => contact.id === payload.id
        );
        if (index !== -1) {
          state.items[index] = payload;
        }
      })
      .addCase(updateContact.rejected, (state, { payload }) => {
        contactsRejected(state, payload);
      });
  },
});

export const { resetContacts } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;

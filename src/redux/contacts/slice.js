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
  extraReducers: (builder) => {
    builder
      // GET:(get/fetch)---------------------------------------
      .addCase(fetchContacts.pending, (state) => {
        contactsPending(state);
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        // console.log("fetchContacts.fulfilled :>> ", payload);
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
        // console.log("addContact.fulfilled.push:payload :>> ", payload);
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
      .addCase(updateContact.pending, (state, { payload }) => {
        // console.log("updatte.pending:state :>> ", state);
        // console.log("updatte.pending:payload :>> ", payload);
        contactsPending(state);
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        // console.log("updatte.fulfilled:payload :>> ", payload);
        //state.items = payload;
        const index = state.items.findIndex(
          (contact) => contact.id === payload.id
        );
        if (index !== -1) {
          state.items[index] = payload;
        }
      })
      .addCase(updateContact.rejected, (state, { payload }) => {
        // console.log("updatte.rejected:payload :>> ", payload);
        contactsRejected(state, payload);
      });
    //---------------------------------------------------------
    /*
        .addCase(updateContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
      */
  },
});

export const contactsReducer = contactsSlice.reducer;

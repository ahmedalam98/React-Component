import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Access the slice state ( data )
export default modalSlice.reducer;

// Access the slice actions to dispatch them from components ( manipulate the data )
export const { toggleModal } = modalSlice.actions;

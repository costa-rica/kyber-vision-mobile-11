import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewActionsArray: [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    updateActionsArray: (state, action) => {
      state.reviewActionsArray = action.payload;
    },
  },
});

export const { updateActionsArray } = reviewSlice.actions;
export default reviewSlice.reducer;

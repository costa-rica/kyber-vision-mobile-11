import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewReducerActionsArray: [],
  reviewReducerListOfPlayerDbObjects: [],
};

// --- Elements of reviewActionsArray:
// actionTableId: elem.id,
// timestamp: elem.timestampFromStartOfVideo,
// type: elem.type,
// subtype: elem.subtype,
// quality: elem.quality,
// isDisplayed:true,
// isFavorite:false,

// --- Elements of reviewReducerListOfPlayerDbObjects:
// "id
// firstName"
// lastName
// birthDate
// isDisplayed

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    createReviewActionsArray: (state, action) => {
      state.reviewReducerActionsArray = action.payload;
    },
    createReviewActionsArrayUniquePlayersNamesAndObjects: (state, action) => {
      state.reviewReducerListOfPlayerDbObjects =
        action.payload.playerDbObjectsArray;
    },
    updateIsDisplayedForPlayerObject: (state, action) => {
      const playerId = action.payload.id;

      // Toggle isDisplayed in reviewReducerListOfPlayerDbObjects
      const player = state.reviewReducerListOfPlayerDbObjects.find(
        (p) => p.id === playerId
      );
      if (player) {
        player.isDisplayed = !player.isDisplayed;
      }

      // Toggle isDisplayed for corresponding actions in reviewReducerActionsArray
      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (action) =>
          action.playerId === playerId
            ? { ...action, isDisplayed: !action.isDisplayed }
            : action
      );
    },
  },
});

export const {
  createReviewActionsArray,
  createReviewActionsArrayUniquePlayersNamesAndObjects,
  updateIsDisplayedForPlayerObject,
} = reviewSlice.actions;

export default reviewSlice.reducer;

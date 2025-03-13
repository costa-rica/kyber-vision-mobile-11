// reducers/review.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewActionsArray: [],
  reviewActionsArrayUniqueListOfPlayerNames: [],
  reviewActionsArrayUniqueListOfPlayerDbObjects: [],
  reviewFilterArrayPlayerDbObjects: [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    updateReviewActionsArray: (state, action) => {
      state.reviewActionsArray = action.payload;
    },
    updateReviewActionsArrayUniquePlayersNamesAndObjects: (state, action) => {
      state.reviewActionsArrayUniqueListOfPlayerNames =
        action.payload.playerNamesArray;
      state.reviewActionsArrayUniqueListOfPlayerDbObjects =
        action.payload.playerDbObjectsArray;
    },
    appendReviewFilterArrayPlayerDbObjects: (state, action) => {
      const player = action.payload;
      if (
        !state.reviewFilterArrayPlayerDbObjects.some((p) => p.id === player.id)
      ) {
        state.reviewFilterArrayPlayerDbObjects.push(player);
      }
    },
    removeReviewFilterArrayPlayerDbObjects: (state, action) => {
      const playerId = action.payload.id;
      state.reviewFilterArrayPlayerDbObjects =
        state.reviewFilterArrayPlayerDbObjects.filter(
          (player) => player.id !== playerId
        );
    },
  },
});

export const {
  updateReviewActionsArray,
  updateReviewActionsArrayUniquePlayersNamesAndObjects,
  appendReviewFilterArrayPlayerDbObjects,
  removeReviewFilterArrayPlayerDbObjects,
} = reviewSlice.actions;

export default reviewSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   reviewActionsArray: [],
//   reviewActionsArrayUniqueListOfPlayerNames: [],
//   reviewActionsArrayUniqueListOfPlayerDbObjects: [],
//   reviewFilterArrayPlayerDbObjects: [],
// };
// // Elements of reviewActionsArray:
// // actionTableId: elem.id,
// // timestamp: elem.timestampFromStartOfVideo,
// // type: elem.type,
// // subtype: elem.subtype,
// // quality: elem.quality,
// export const reviewSlice = createSlice({
//   name: "review",
//   initialState,
//   reducers: {
//     updateReviewActionsArray: (state, action) => {
//       state.reviewActionsArray = action.payload;
//     },
//     updateReviewActionsArrayUniquePlayersNamesAndObjects: (state, action) => {
//       state.reviewActionsArrayUniqueListOfPlayerNames =
//         action.payload.playerNamesArray;
//       state.reviewActionsArrayUniqueListOfPlayerDbObjects =
//         action.payload.playerDbObjectsArray;
//     },
//     appendReviewFilterArrayPlayerDbObjects: (state, action) => {
//       state.reviewFilterArrayPlayerDbObjects = action.payload;
//     },
//     removeReviewFilterArrayPlayerDbObjects: (state, action) => {
//       state.reviewFilterArrayPlayerDbObjects = action.payload;
//     },
//   },
// });

// export const {
//   updateReviewActionsArray,
//   updateReviewActionsArrayUniquePlayersNamesAndObjects,
//   appendReviewFilterArrayPlayerDbObjects,
//   removeReviewFilterArrayPlayerDbObjects,
// } = reviewSlice.actions;
// export default reviewSlice.reducer;

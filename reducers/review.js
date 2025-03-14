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

// -------- Old Code --------

// // reducers/review.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   // reviewActionsArray: [],
//   reviewReducerActionsArray: [],
//   // reviewActionsArrayUniqueListOfPlayerNames: [],
//   // reviewActionsArrayUniqueListOfPlayerDbObjects: [],
//   reviewReducerListOfPlayerDbObjects: [],
//   // reviewFilterArrayPlayerDbObjects: [],
// };
// // --- Elements of reviewActionsArray:
// // actionTableId: elem.id,
// // timestamp: elem.timestampFromStartOfVideo,
// // type: elem.type,
// // subtype: elem.subtype,
// // quality: elem.quality,
// // isDisplayed:true,
// // isFavorite:false,

// // --- Elements of reviewReducerListOfPlayerDbObjects:
// // "id
// // firstName"
// // lastName
// // birthDate
// // isDisplayed

// export const reviewSlice = createSlice({
//   name: "review",
//   initialState,
//   reducers: {
//     createReviewActionsArray: (state, action) => {
//       state.reviewActionsArray = action.payload;
//     },
//     createReviewActionsArrayUniquePlayersNamesAndObjects: (state, action) => {
//       // state.reviewActionsArrayUniqueListOfPlayerNames =
//       //   action.payload.playerNamesArray;
//       state.reviewActionsArrayUniqueListOfPlayerDbObjects =
//         action.payload.playerDbObjectsArray;
//     },
//     appendReviewFilterArrayPlayerDbObjects: (state, action) => {
//       const player = action.payload;
//       if (
//         !state.reviewFilterArrayPlayerDbObjects.some((p) => p.id === player.id)
//       ) {
//         state.reviewFilterArrayPlayerDbObjects.push(player);
//       }
//     },
//     removeReviewFilterArrayPlayerDbObjects: (state, action) => {
//       const playerId = action.payload.id;
//       state.reviewFilterArrayPlayerDbObjects =
//         state.reviewFilterArrayPlayerDbObjects.filter(
//           (player) => player.id !== playerId
//         );
//     },
//   },
// });

// export const {
//   createReviewActionsArray,
//   createReviewActionsArrayUniquePlayersNamesAndObjects,
//   appendReviewFilterArrayPlayerDbObjects,
//   removeReviewFilterArrayPlayerDbObjects,
// } = reviewSlice.actions;

// export default reviewSlice.reducer;

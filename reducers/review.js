import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewReducerActionsArray: [],
  reviewReducerListOfPlayerDbObjects: [],
};

// --- Elements of reviewActionsArray:
// actionsTableId: elem.id,
// actionsArrayId: elem.actionsArrayId,
// playerId: elem.playerId,
// timestamp: elem.timestampFromStartOfVideo,
// type: elem.type,
// subtype: elem.subtype,
// quality: elem.quality,
// isDisplayed: true,
// isFavorite: false,
// isPlaying: false,

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
    updateReviewReducerIsDisplayedForPlayerObject: (state, action) => {
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
    // 🔹 New function: updateReviewReducerIsPlayingforActionsArray
    // updateReviewReducerIsPlayingforActionsArray: (state, action) => {
    //   const currentTime = action.payload;

    //   // Find the last action whose timestamp is greater than currentTime
    //   let updatedActions = state.reviewReducerActionsArray.map((action) => ({
    //     ...action,
    //     isPlaying: false, // Reset all to false
    //   }));

    //   for (let i = 0; i < updatedActions.length; i++) {
    //     if (currentTime < updatedActions[i].timestamp) {
    //       if (i > 0) {
    //         updatedActions[i - 1].isPlaying = true; // Set the previous action as playing
    //       }
    //       break; // Stop at the first match
    //     }
    //   }

    //   state.reviewReducerActionsArray = updatedActions;
    // },
    // updateReviewReducerIsPlayingforActionsArray: (state, action) => {
    //   const currentTime = action.payload;
    //   const threshold = 0.5; // Define a small range for tolerance

    //   let closestAction = state.reviewReducerActionsArray.reduce(
    //     (prev, curr) => {
    //       return Math.abs(curr.timestamp - currentTime) <
    //         Math.abs(prev.timestamp - currentTime)
    //         ? curr
    //         : prev;
    //     }
    //   );

    //   // Update the array with only the closest action as `isPlaying: true`
    //   state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
    //     (action) => ({
    //       ...action,
    //       isPlaying: Math.abs(action.timestamp - currentTime) <= threshold,
    //     })
    //   );
    // },
    // 🔹 New function: updateReviewReducerIsPlayingforActionsArray V3 -- keeps the last selected
    // updateReviewReducerIsPlayingforActionsArray: (state, action) => {
    //   const currentTime = action.payload;
    //   const threshold = 0.5; // Define a tolerance range in seconds

    //   let closestAction = state.reviewReducerActionsArray.reduce(
    //     (prev, curr) => {
    //       return Math.abs(curr.timestamp - currentTime) <
    //         Math.abs(prev.timestamp - currentTime)
    //         ? curr
    //         : prev;
    //     }
    //   );

    //   // If no action is within the threshold, keep the last known playing action
    //   const newPlayingAction =
    //     Math.abs(closestAction.timestamp - currentTime) <= threshold
    //       ? closestAction
    //       : state.reviewReducerActionsArray.find(
    //           (action) => action.isPlaying
    //         ) || closestAction;

    //   // Update the array
    //   state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
    //     (action) => ({
    //       ...action,
    //       isPlaying: action === newPlayingAction,
    //     })
    //   );
    // },
    // 🔹 New function: updateReviewReducerIsPlayingforActionsArray V4 -- keeps the last selected and does not include isDisplayed=false
    updateReviewReducerIsPlayingforActionsArray: (state, action) => {
      const currentTime = action.payload;
      const threshold = 0.5; // Define a tolerance range in seconds

      // Filter only actions where isDisplayed is true
      const displayedActions = state.reviewReducerActionsArray.filter(
        (action) => action.isDisplayed
      );

      if (displayedActions.length === 0) {
        // No displayed actions available, reset all to false
        state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
          (action) => ({
            ...action,
            isPlaying: false,
          })
        );
        return;
      }

      // Find the closest displayed action
      let closestAction = displayedActions.reduce((prev, curr) => {
        return Math.abs(curr.timestamp - currentTime) <
          Math.abs(prev.timestamp - currentTime)
          ? curr
          : prev;
      });

      // Determine which action should be playing
      const newPlayingAction =
        Math.abs(closestAction.timestamp - currentTime) <= threshold
          ? closestAction
          : displayedActions.find((action) => action.isPlaying) ||
            closestAction;

      // Update the array, ensuring only displayed actions can be set to true
      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (action) => ({
          ...action,
          isPlaying: action.isDisplayed && action === newPlayingAction,
        })
      );
    },
    toggleReviewReducerActionIsFavorite: (state, action) => {
      const actionsTableId = action.payload;

      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (item) =>
          item.actionsTableId === actionsTableId
            ? { ...item, isFavorite: !item.isFavorite } // Toggle isFavorite
            : item
      );
    },
    filterReviewReducerActionsArrayOnIsFavorite: (state, action) => {
      const shouldDisplayFavorites = action.payload; // Boolean payload

      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (item) => ({
          ...item,
          isDisplayed: item.isFavorite === shouldDisplayFavorites, // Match payload for favorites, inverse for non-favorites
        })
      );
    },
  },
});

export const {
  createReviewActionsArray,
  createReviewActionsArrayUniquePlayersNamesAndObjects,
  updateReviewReducerIsDisplayedForPlayerObject,
  updateReviewReducerIsPlayingforActionsArray,
  toggleReviewReducerActionIsFavorite,
  filterReviewReducerActionsArrayOnIsFavorite,
} = reviewSlice.actions;

export default reviewSlice.reducer;

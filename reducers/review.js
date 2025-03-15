import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewReducerActionsArray: [],
  reviewReducerListOfPlayerDbObjects: [],
  isFavoriteToggle: false,
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
    updateReviewReducerIsPlayingforActionsArray: (state, action) => {
      // 🔹 used by ReviewVideo useEventListener to update the currently played action
      // 🔹 > keeps the last selected and does not include isDisplayed=false
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

    filterReviewReducerActionsArrayOnPlayer: (state, action) => {
      // 🔹  filter on player by toggline on isDisplayed
      // 🔹  takes into account the isFavoriteToggle
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
        (action) => {
          if (state.isFavoriteToggle) {
            return action.playerId === playerId && action.isFavorite
              ? { ...action, isDisplayed: !action.isDisplayed }
              : action;
          } else {
            return action.playerId === playerId
              ? { ...action, isDisplayed: !action.isDisplayed }
              : action;
          }
        }
      );
    },

    toggleReviewReducerActionIsFavorite: (state, action) => {
      // 🔹  Used by ReviewVideoLandscape > star button
      // 🔹  > toggle isFavorite for corresponding action
      const actionsTableId = action.payload;

      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (item) =>
          item.actionsTableId === actionsTableId
            ? { ...item, isFavorite: !item.isFavorite } // Toggle isFavorite
            : item
      );
    },

    filterReviewReducerActionsArrayOnIsFavorite: (state) => {
      // 🔹 If payload === true → Show only favorite actions, but apply the player filtering
      // 🔹 If payload === false → Show all actions, but still respect player filtering.
      // const shouldShowOnlyFavorites = action.payload; // Boolean payload
      console.log("in filterReviewReducerActionsArrayOnIsFavorite");
      state.isFavoriteToggle = !state.isFavoriteToggle;

      state.reviewReducerActionsArray = state.reviewReducerActionsArray.map(
        (actionItem) => {
          // Find the corresponding player object based on playerId
          const matchingPlayer = state.reviewReducerListOfPlayerDbObjects.find(
            (player) => player.id === actionItem.playerId
          );

          // Ensure we have a matching player
          if (!matchingPlayer) {
            return actionItem; // Skip if no matching player is found
          }

          // If state.isFavoriteToggle is true, show only favorites & apply player filtering
          if (state.isFavoriteToggle) {
            return {
              ...actionItem,
              isDisplayed: actionItem.isFavorite
                ? matchingPlayer.isDisplayed
                : false,
            };
          }

          // If shouldShowOnlyFavorites is false, show all actions & apply player filtering
          return {
            ...actionItem,
            isDisplayed: matchingPlayer.isDisplayed,
          };
        }
      );
    },
  },
});

export const {
  createReviewActionsArray,
  createReviewActionsArrayUniquePlayersNamesAndObjects,
  filterReviewReducerActionsArrayOnPlayer,
  updateReviewReducerIsPlayingforActionsArray,
  toggleReviewReducerActionIsFavorite,
  filterReviewReducerActionsArrayOnIsFavorite,
} = reviewSlice.actions;

export default reviewSlice.reducer;

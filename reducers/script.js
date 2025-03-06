import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scriptId: null,
  tokenWithUserId: null,
  actionsArray: [],
  pointsTableArray: [],
  scriptingPlayerCount: null,
  scriptingForPlayerObject: null, // <-- player name
  // /// - testing
  // objToModify: null,
  // testPayloadTime: null,
  // testPayloadQuailty: null,
  // newObj: null,
  // --- These are meant to be hardcoded and available throughout the app --- NO MODIFY in code
  typesArray: ["Bl", "Def", "Set", "Att"],
  subtypesArray: [
    "B2",
    "B1",
    "BC",
    "FB",
    "AC",
    "NS",
    "Q",
    "Hi",
    "Tip",
    "Pwr",
    "Rol",
    "B3",
  ],
  qualityArray: ["=", "-", "0", "+", "#"],
  rotationArray: ["P1", "P2", "P3", "P4", "P5", "P6"],
  positionalAreasArray: Array.from({ length: 6 }, (_, i) => i + 1),
  playerNamesArray: ["Léa", "Odeyssa", "Yoann", "Johanne", "Ted", "Sarah"],
  playerNamesArrayRotated: [], // Initialized empty, will be set in reducer
  pointsArray: Array.from({ length: 50 }, (_, i) => i),
  setOptionsArray: Array.from({ length: 4 }, (_, i) => i),
};
// *** Important Type Inforamtion ***

// actionsArray element properties
// dateScripted: new Date().toISOString(), // Convert to ISO string
// timeStamp: player.currentTime,
// type: actionObj.type,
// subType: "tap - sub",
// quality: "some quality",
// playerId: "Player 1",
// scriptId: scriptReducer.scriptId,
// newAction: true,
// pointId: "set" - "scoreTeamAnalyzed + scoreTeamOpponent"

// pointsTableArray element properties
// pointId: "set" - "scoreTeamAnalyzed + scoreTeamOpponent"
// setNumber: 1,
// scoreTeamAnalyzed: 0,
// scoreTeamOpponent: 0,
// rotation: p1
// opponentServed: false

// *** (END) Important Type Inforamtion ***

export const scriptSlice = createSlice({
  name: "script",
  initialState,
  reducers: {
    newScript: (state, action) => {
      console.log("start newScript (in script reduer)");
      state.scriptId = action.payload.scriptId;
      state.tokenWithUserId = action.payload.userId;
      console.log("END newScript (in script reduer)");
    },
    deleteScript: (state) => {
      state.scriptId = null;
      state.tokenWithUserId = null;
      state.actionsArray = [];
    },
    replaceScriptActionArray: (state, action) => {
      state.actionsArray = action.payload.actionsArray;
      state.scriptId = action.payload?.scriptId;
    },
    updateScriptingPlayerCount: (state, action) => {
      state.scriptingPlayerCount = action.payload;
    },

    updateQualityPropertyInObjectOfActionsArray: (state, action) => {
      const { timeStamp, quality } = action.payload;

      // Find the index of the object to update
      const index = state.actionsArray.findIndex(
        (obj) => obj.timeStamp === timeStamp
      );
      if (index !== -1) {
        // Create a new object with the updated quality
        const updatedObject = { ...state.actionsArray[index], quality };

        // Create a new array with the updated object
        const updatedArray = [
          ...state.actionsArray.slice(0, index), // gets all objects from 0 to index
          updatedObject,
          ...state.actionsArray.slice(index + 1), // gets all object from index+1 to end
        ];

        // Sort the array by timeStamp
        state.actionsArray = updatedArray.sort(
          (a, b) => a.timeStamp - b.timeStamp
        );
      }
    },
    updateTypePropertyInObjectOfActionsArray: (state, action) => {
      const { timeStamp, type } = action.payload;

      // Find the index of the object to update
      const index = state.actionsArray.findIndex(
        (obj) => obj.timeStamp === timeStamp
      );
      if (index !== -1) {
        // Create a new object with the updated quality
        const updatedObject = { ...state.actionsArray[index], type };

        // Create a new array with the updated object
        const updatedArray = [
          ...state.actionsArray.slice(0, index), // gets all objects from 0 to index
          updatedObject,
          ...state.actionsArray.slice(index + 1), // gets all object from index+1 to end
        ];

        // Sort the array by timeStamp
        state.actionsArray = updatedArray.sort(
          (a, b) => a.timeStamp - b.timeStamp
        );
      }
    },
    updateSubtypePropertyInObjectOfActionsArray: (state, action) => {
      const { timeStamp, subtype } = action.payload;

      // Find the index of the object to update
      const index = state.actionsArray.findIndex(
        (obj) => obj.timeStamp === timeStamp
      );
      if (index !== -1) {
        // Create a new object with the updated quality
        const updatedObject = { ...state.actionsArray[index], subtype };

        // Create a new array with the updated object
        const updatedArray = [
          ...state.actionsArray.slice(0, index), // gets all objects from 0 to index
          updatedObject,
          ...state.actionsArray.slice(index + 1), // gets all object from index+1 to end
        ];

        // Sort the array by timeStamp
        state.actionsArray = updatedArray.sort(
          (a, b) => a.timeStamp - b.timeStamp
        );
      }
    },
    updatePointsTableArray: (state, action) => {
      state.pointsTableArray = action.payload.pointsTableArray;
    },
    rotatePlayerNamesArray: (state) => {
      if (state.playerNamesArrayRotated.length === 0) {
        // Initialize if not already set
        state.playerNamesArrayRotated = [...state.playerNamesArray];
      }
      if (state.playerNamesArrayRotated.length > 1) {
        // Rotate array elements to the left
        state.playerNamesArrayRotated = [
          ...state.playerNamesArrayRotated.slice(1),
          state.playerNamesArrayRotated[0],
        ];
      }
    },
    // rotatePlayerNamesArray: (state) => {
    //   if (state.playerNamesArrayRotated.length === 0) {
    //     // Initialize if not already set
    //     state.playerNamesArrayRotated = [...state.playerNamesArray];
    //   }
    //   if (state.playerNamesArrayRotated.length > 1) {
    //     // Rotate array elements
    //     state.playerNamesArrayRotated = [
    //       state.playerNamesArrayRotated[
    //         state.playerNamesArrayRotated.length - 1
    //       ],
    //       ...state.playerNamesArrayRotated.slice(0, -1),
    //     ];
    //   }
    // },
    initializePlayerNamesArrayRotated: (state) => {
      console.log("--- >  initializePlayerNamesArrayRotated");
      // This action can be dispatched at app startup to ensure correct initialization
      state.playerNamesArrayRotated = [...state.playerNamesArray];
    },
    setScriptingForPlayerObject: (state, action) => {
      state.scriptingForPlayerObject = action.payload;
    },
  },
});

export const {
  newScript,
  deleteScript,
  replaceScriptActionArray,
  updateScriptingPlayerCount,
  updateQualityPropertyInObjectOfActionsArray,
  updateTypePropertyInObjectOfActionsArray,
  updateSubtypePropertyInObjectOfActionsArray,
  updatePointsTableArray,
  rotatePlayerNamesArray,
  initializePlayerNamesArrayRotated,
  setScriptingForPlayerObject,
} = scriptSlice.actions;
export default scriptSlice.reducer;

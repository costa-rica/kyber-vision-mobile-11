import { createSlice } from "@reduxjs/toolkit";

const initialState = {

  scriptId: null,
  tokenWithUserId: null,
  actionsArray: [],
  scriptingPlayerCount: null,
  // /// - testing
  // objToModify: null,
  // testPayloadTime: null,
  // testPayloadQuailty: null,
  // newObj: null,
  // --- These are meant to be hardcoded and available throughout the app --- NO MODIFY in code
  typesArray:["Bloc", "Def", "Set", "Att"],
  subtypesArray:["","","","Free\nball","","", "NP","", "Tip", "Power", "Roll", ""],

};
// actionsArray element properties
// dateScripted: new Date().toISOString(), // Convert to ISO string
// timeStamp: player.currentTime,
// type: actionObj.type,
// subType: "tap - sub",
// quality: "some quality",
// playerId: "Player 1",
// scriptId: scriptReducer.scriptId,
// newAction: true,

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
  },
});

export const {
  newScript,
  deleteScript,
  replaceScriptActionArray,
  updateScriptingPlayerCount,
  updateQualityPropertyInObjectOfActionsArray,
  updateTypePropertyInObjectOfActionsArray,
} = scriptSlice.actions;
export default scriptSlice.reducer;

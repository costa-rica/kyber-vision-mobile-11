import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: {
  token: null,
  portraitHeight: null,
  portraitWidth: null,
  profile: null,
  video: {}, //list received from API GET /videos
  circleRadiusOuter: 90,
  circleRadiusMiddle: 60,
  circleRadiusInner: 30,
  scriptPositionGuides: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      // console.log(`- dans Redux: loginUser 🔔`);
      state.token = action.payload.token;
      state.profile = action.payload.profile;
    },
    storeVideoDetailsInRedux: (state, action) => {
      console.log(`- dans Redux: storeVideoDetailsInRedux 🔔`);
      state.video = action.payload.video;
    },
    reducerSetScreenDimensions: (state, action) => {
      console.log(`- dans Redux: reducerSetScreenDimensions 🔔`);
      state.portraitHeight = action.payload.portraitHeight;
      state.portraitWidth = action.payload.portraitWidth;
    },
    reducerSetUserSwipePadWheel: (state, action) => {
      state.circleRadiusOuter = action.payload.circleRadiusOuter;
      state.circleRadiusMiddle = action.payload.circleRadiusMiddle;
      state.circleRadiusInner = action.payload.circleRadiusInner;
    },
    switchPositionGuides: (state) => {
      console.log("switchPositionGuides");
      state.scriptPositionGuides = !state.scriptPositionGuides;
    },
  },
});

export const {
  loginUser,
  storeVideoDetailsInRedux,
  reducerSetScreenDimensions,
  reducerSetUserSwipePadWheel,
  switchPositionGuides,
} = userSlice.actions;
export default userSlice.reducer;

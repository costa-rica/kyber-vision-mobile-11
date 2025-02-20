import { useEffect, useState } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import * as ScreenOrientation from "expo-screen-orientation";
import ScriptingLandscapeLive from "./subcomponents/ScriptingLandscapeLive";
import ScriptingPortraitLive from "./subcomponents/ScriptingPortraitLive";
const table01data = {
  User41: "Ted",
  User42: "Sarah",
  User56: "Jeremy",
  User62: "Melody",
};
const table02data = ["Lea", "Odeyssa", "Yoann", "Johanne"];
const tableTypeDummyData = ["Bloc", "Def", "Set", "Att"];
const table04data = ["DefSub", "SetSub", "AttSub"];
const setOptions = [0, 1, 2, 3];
const scoreOptions = Array.from({ length: 26 }, (_, i) => i);

// SwipePad
import { Gesture } from "react-native-gesture-handler";
import SwipePad from "./subcomponents/SwipePad";
// import { useDispatch } from "react-redux";
// import { reducerSetUserSwipePadWheel } from "../reducers/user";
import { useSelector } from "react-redux";
import {
  newScript,
  deleteScript,
  replaceScriptActionArray,
  updateQualityPropertyInObjectOfActionsArray,
  updateTypePropertyInObjectOfActionsArray,
  updateSubtypePropertyInObjectOfActionsArray,
} from "../reducers/script";
import { useDispatch } from "react-redux";

export default function ScriptingLive({ navigation }) {
  // const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const scriptReducer = useSelector((state) => state.script);
  const dispatch = useDispatch();
  const [scriptReducerActionArray, setScriptReducerActionArray] = useState(
    scriptReducer.actionsArray
  );
  const [scriptId, setScriptId] = useState(scriptReducer.scriptId);
  const stdPickerStylePortrait = {
    color: "white",
    fontSize: 25,
    backgroundColor: "#310732",
    itemHeight: 60,
    width: 40,
    borderRadius: 15,
  };
  const stdPickerStyleLandscape = {
    color: "white",
    fontSize: 20,
    backgroundColor: "#310732",
    itemHeight: 40,
    width: 40,
    borderRadius: 15,
  };

  // Belongs to Set Team Analyzed SinglePickerWithSideBorders
  const [setsTeamAnalyzed, setSetsTeamAnalyzed] = useState(0);
  // Belongs to Score Team Analyzed SinglePickerWithSideBorders
  const [scoreTeamAnalyzed, setScoreTeamAnalyzed] = useState(0);
  // Belongs to Score Team Opponentn SinglePickerWithSideBorders
  const [scoreTeamOpponent, setScoreTeamOpponent] = useState(0);
  const [setsTeamOpponent, setSetsTeamOpponent] = useState(0);
  // Belongs to positional formation SinglePickerWithSideBorders
  const [positionalFormation, setPositionalFormation] = useState("P1");
  const [quality, setQuality] = useState(0);
  const [position, setPosition] = useState(1);
  const [playerName, setPlayerName] = useState(table02data[0]);
  const [type, setType] = useState(tableTypeDummyData[0]);
  const [subtype, setSubtype] = useState(table04data[0]);

  // orientation
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    // console.log("- Position useEffect");
    ScreenOrientation.unlockAsync();
    checkOrientation();
    const subscriptionScreenOrientation =
      ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    return () => {
      subscriptionScreenOrientation.remove();
      ScreenOrientation.lockAsync();
    };
  });

  const checkOrientation = async () => {
    // console.log("in checkOrientation");
    const orientation = await ScreenOrientation.getOrientationAsync();
    // console.log(`orientation is ${orientation}`);
    if (
      o.orientationInfo.orientation == 4 ||
      o.orientationInfo.orientation == 3
    ) {
      setOrientation("landscape");
    } else {
      setOrientation("portrait");
    }
  };
  const handleOrientationChange = async (o) => {
    // console.log(
    //   `o.orientationInfo.orientation: ${o.orientationInfo.orientation}`
    // );
    setOrientation(o.orientationInfo.orientation);
    if (
      o.orientationInfo.orientation == 4 ||
      o.orientationInfo.orientation == 3
    ) {
      setOrientation("landscape");
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    } else {
      setOrientation("portrait");
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  useEffect(() => {}, [position]);
  // --- Dynamic styles ---
  const truncateArrayElements = (arr, maxLength) => {
    // console.log("- in trucnateArrayEleements");
    // console.log(arr);
    return arr.map((item) =>
      item.length > maxLength ? item.substring(0, maxLength) : item
    );
  };

  // Handles set selection for a team
  // Expects team: "analyzed" | "opponent"
  const handleSetCirclePress = (team, setIndex) => {
    if (team === "analyzed") {
      if (setsTeamAnalyzed === setIndex) {
        setSetsTeamAnalyzed(setIndex - 1);
      } else if (setsTeamAnalyzed + 1 === setIndex) {
        setSetsTeamAnalyzed(setIndex);
      }
    } else {
      if (setsTeamOpponent === setIndex) {
        setSetsTeamOpponent(setIndex - 1);
      } else if (setsTeamOpponent + 1 === setIndex) {
        setSetsTeamOpponent(setIndex);
      }
    }
  };

  // ------- Swipe Pad --------------
  // const [testOuterWheelPosition, setTestOuterWheelPosition] = useState(0);
  const demoOption = "4-12";
  const [numTrianglesMiddle, setNumTrianglesMiddle] = useState(4); // 2, 4, or 5
  const [numTrianglesOuter, setNumTrianglesOuter] = useState(12); // 8, 10 or 12
  const [padPositionCenter, setPadPositionCenter] = useState({ x: 0, y: 0 });
  const [gestureViewCoords, setGestureViewCoords] = useState({
    x: 0,
    width: Dimensions.get("window").width,
    y: 0,
    height: Dimensions.get("window").height,
  });
  const [padVisible, setPadVisible] = useState(false);
  const [tapDetails, setTapDetails] = useState({
    timestamp: "no date",
    padPosCenterX: 0,
    padPosCenterY: 0,
  });
  const [tapIsActive, setTapIsActive] = useState(true);
  const [currentActionType, setCurrentActionType] = useState(null);
  const [currentActionSubtype, setCurrentActionSubtype] = useState(null);
  const [actionList, setActionList] = useState([]);
  const defaultColors = {
    1: "rgba(255, 143, 143, 1)", // right
    2: "rgba(255, 143, 143, 1)", // bottom
    3: "rgba(255, 143, 143, 1)", // bottombottomleft
    4: "rgba(255, 143, 143, 1)",
    5: "rgba(247, 255, 162, 0.5)", // bottombottomleft
    6: "rgba(247, 255, 162, 0.5)",
    7: "rgba(247, 255, 162, 0.5)", // bottombottomleft
    8: "rgba(247, 255, 162, 0.5)",
    9: "rgba(247, 255, 162, 0.5)", // bottombottomleft
    10: "rgba(247, 255, 162, 0.5)",
    11: "rgba(247, 255, 162, 0.5)", // bottombottomleft
    12: "rgba(247, 255, 162, 0.5)",
    13: "rgba(247, 255, 162, 0.5)", // bottombottomleft
    14: "rgba(247, 255, 162, 0.5)",
    15: "rgba(247, 255, 162, 0.5)", // bottombottomleft
    16: "rgba(247, 255, 162, 0.5)",
    center: "gray",
  };
  const [swipeColorDict, setSwipeColorDict] = useState(defaultColors);
  const stdSwipePadDefaultTextColor = "black";
  const stdSwipePadDefaultTextFontSize = 10;
  const defaultTextStyles = Object.fromEntries(
    Array.from({ length: 16 }, (_, i) => [
      i + 1, // Key: 1 to 16
      {
        color: stdSwipePadDefaultTextColor,
        fontSize: stdSwipePadDefaultTextFontSize,
        selected: false,
      },
    ])
  );

  const [swipeTextStyleDict, setSwipeTextStyleDict] =
    useState(defaultTextStyles);
  // ----- Swipe Pad: Dynamic Styles -----------

  const styleVwMainPosition = {
    position: "absolute",
    left: padPositionCenter.x, // Center modal horizontally
    top: padPositionCenter.y, // Center modal vertically
  };

  // Function to temporarily change color
  const handleSwipeColorChange = (direction, outerDirection = false) => {
    setSwipeColorDict(defaultColors);
    setSwipeTextStyleDict(defaultTextStyles);
    const brightColors = {
      1: "rgba(255, 255, 143, 1)", // right
      // 2: "brown", // right
      2: "rgba(255, 255, 143, 1)", // bottom
      3: "rgba(255, 255, 143, 1)", // left
      4: "rgba(255, 255, 143, 1)", // top
      5: "rgba(255, 143, 143, 1)",
      6: "rgba(255, 143, 143, 1)",
      7: "rgba(255, 143, 143, 1)",
      8: "rgba(255, 143, 143, 1)",
      9: "rgba(255, 143, 143, 1)",
      10: "rgba(255, 143, 143, 1)",
      11: "rgba(255, 143, 143, 1)",
      12: "rgba(255, 143, 143, 1)",
      13: "rgba(255, 143, 143, 1)",
      14: "rgba(255, 143, 143, 1)",
      15: "rgba(255, 143, 143, 1)",
      16: "rgba(255, 143, 143, 1)",
      center: "white",
    };

    if (!outerDirection) {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: brightColors[direction],
      }));
      setSwipeTextStyleDict((prevTextStyles) => ({
        ...prevTextStyles,
        [direction]: {
          color: "black",
          fontSize: 15,
          fontWeight: "bold",
          selected: true,
        },
      }));
    } else {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: brightColors[direction],
        [outerDirection]: brightColors[outerDirection],
      }));
      setSwipeTextStyleDict((prevTextStyles) => ({
        ...prevTextStyles,
        [direction]: {
          color: "black",
          fontSize: 15,
          fontWeight: "bold",
          selected: true,
        },
        [outerDirection]: {
          color: "black",
          fontSize: 15,
          fontWeight: "bold",
          selected: true,
        },
      }));
    }
  };
  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    if (tapIsActive) {
      const timestamp = new Date().toISOString();
      const { x, y, absoluteX, absoluteY } = event;
      // console.log(`x: ${x}, y:${y}`);
      // console.log(`absoluteX: ${absoluteX}, absoluteY: ${absoluteY}`);
      // prevent SwipePad/Wheel from appearing
      // if (
      //   absoluteY > gestureViewCoords.y &&
      //   absoluteY < gestureViewCoords.y + gestureViewCoords.height &&
      //   absoluteX > gestureViewCoords.x &&
      //   absoluteX < gestureViewCoords.x + gestureViewCoords.width
      // ) {
      // console.log("- IN gestureTapBegin");
      setPadPositionCenter({
        x: calculatePadPositionCenter(absoluteX, absoluteY).x,
        y: calculatePadPositionCenter(absoluteX, absoluteY).y,
      });
      setPadVisible(true);
      setTapDetails({
        timestamp,
        padPosCenterX: calculatePadPositionCenter(absoluteX, absoluteY).x,
        padPosCenterY: calculatePadPositionCenter(absoluteX, absoluteY).y,
      });

      setTapIsActive(false);
      handleSwipeColorChange("center");
      // }
    }
  });

  const gestureTapOnEnd = Gesture.Tap()
    .maxDuration(10000) // <-- basically if user keeps hold for more than 10 seconds the wheel will just stay there.
    .onEnd((event) => {
      // console.log("- tap on end");
      const { x, y, absoluteX, absoluteY } = event;

      const swipePosX = calculatePadPositionCenter(absoluteX, absoluteY).x;
      const swipePosY = calculatePadPositionCenter(absoluteX, absoluteY).y;

      const distanceFromCenter = Math.sqrt(
        Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
          Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
      );

      // //// TESTING: commented below to show SwipePad
      if (distanceFromCenter < userReducer.circleRadiusInner) {
        console.log("- close wheel");
        setPadVisible(false);
        setTapIsActive(true);
      }
    });

  const gestureSwipeOnChange = Gesture.Pan().onChange(
    (event) => {
      // console.log("👍 start gestureSwipeOnChange");

      const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

      // prevent logic from firing left of landscape image
      // if (
      //   absoluteY > gestureViewCoords.y &&
      //   absoluteY < gestureViewCoords.y + gestureViewCoords.height &&
      //   absoluteX > gestureViewCoords.x &&
      //   absoluteX < gestureViewCoords.x + gestureViewCoords.width
      // ) {
      // console.log("- IN gestureSwipeOnChange");
      const swipePosX = calculatePadPositionCenter(absoluteX, absoluteY).x;
      const swipePosY = calculatePadPositionCenter(absoluteX, absoluteY).y;

      const distanceFromCenter = calculateDistanceFromCenter(
        swipePosX,
        swipePosY
      );

      const relativeToPadCenterX = swipePosX - tapDetails.padPosCenterX;
      const relativeToPadCenterY = swipePosY - tapDetails.padPosCenterY;

      const inInnerCircle = distanceFromCenter < userReducer.circleRadiusInner;
      const inMiddleCircle =
        distanceFromCenter < userReducer.circleRadiusMiddle;

      if (inInnerCircle) {
        handleSwipeColorChange("center");
        setCurrentActionType(null);
      } else {
        if (demoOption === "4-8")
          logicFourEightCircle(
            relativeToPadCenterX,
            relativeToPadCenterY,
            inMiddleCircle
          );

        if (demoOption == "5-10")
          logicFiveTenCircle(
            relativeToPadCenterX,
            relativeToPadCenterY,
            inMiddleCircle
          );
        if (demoOption === "4-12")
          logicFourTwelveCircle(
            relativeToPadCenterX,
            relativeToPadCenterY,
            inMiddleCircle
          );
      }
    }
    // console.log("👍 end gestureSwipeOnChange");
    // }
  );
  // Combine swipe and tap gestures
  const gestureSwipeOnEnd = Gesture.Pan().onEnd((event) => {
    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    const swipePosX = calculatePadPositionCenter(x, y).x;
    const swipePosY = calculatePadPositionCenter(x, y).y;

    const distanceFromCenter = Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );

    // Trying to prevent actions logic from triggering outside iOS Landscape X
    // if (
    //   absoluteY > gestureViewCoords.y &&
    //   absoluteY < gestureViewCoords.y + gestureViewCoords.height &&
    //   absoluteX > gestureViewCoords.x &&
    //   absoluteX < gestureViewCoords.x + gestureViewCoords.width
    // ) {
    // console.log("- IN gestureSwipeOnEnd");
    // if (absoluteX < gestureViewCoords.x) {
    //   setPadVisible(false);
    //   setTapIsActive(true);
    //   return;
    // }
    if (distanceFromCenter > userReducer.circleRadiusInner) {
      // console.log("--- triggered action");
      // addAction(currentActionType);
      addNewActionToScriptReducersActionsArray({
        type: currentActionType,
        subtype: currentActionSubtype,
      });
    }
    // } else {
    //   // console.log("- OUT gestureSwipeOnEnd");
    //   setPadVisible(false);
    //   setTapIsActive(true);
    //   return;
    // }
  });

  // Combine swipe and tap gestures
  const combinedGestures = Gesture.Simultaneous(
    gestureTapBegin,
    gestureTapOnEnd,
    gestureSwipeOnEnd,
    gestureSwipeOnChange
    // gestureLongPress
  );

  const logicFourTwelveCircle = (
    relativeToPadCenterX,
    relativeToPadCenterY,
    inMiddleCircle
  ) => {
    // Y dependent
    const boundary15Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 15); // ? parts to circle, 15 degrees
    // const boundary30Y =
    //   relativeToPadCenterX * Math.tan((Math.PI / 180) * (360 / 12)); // 12 parts to circle
    const boundary45Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 45); // 8 parts to circle 45 = 360/8
    // X dependent
    const boundary75X =
      relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 75));

    let wheelPositionMiddle = 0; // 0-4
    let wheelPositionOuter = 5; // 5-12, 5 is like 0, according to the scriptReducer.subtypesArray
    if (Math.abs(relativeToPadCenterY) < boundary45Y) {
      // Right side
      wheelPositionMiddle = 1;

      // setCurrentActionType(1);
      handleSwipeColorChange(wheelPositionMiddle);
      setCurrentActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]); // Bloc
      setCurrentActionSubtype("");
      if (!inMiddleCircle) {
        wheelPositionOuter = 16; // like 16
        // setTestOuterWheelPosition(wheelPositionOuter-5)
        if (-relativeToPadCenterY > boundary15Y) {
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          );
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
          // setCurrentActionSubtype(
          //   scriptReducer.subtypesArray[testOuterWheelPosition]
          // );
        } else if (Math.abs(relativeToPadCenterY) < boundary15Y) {
          // setSwipeColorDict(defaultColors);
          // handleSwipeColorChange(1, 5);
          // setCurrentActionType(5);
          wheelPositionOuter = 5;
          // setTestOuterWheelPosition(wheelPositionOuter-5)
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Bloc
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
          // setCurrentActionSubtype(
          //   scriptReducer.subtypesArray[testOuterWheelPosition]
          // );
        } else {
          wheelPositionOuter = 6;
          // setTestOuterWheelPosition(wheelPositionOuter-5)
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Bloc
          // setCurrentActionSubtype(
          //   scriptReducer.subtypesArray[testOuterWheelPosition]
          // );
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        }
      }
    } else if (relativeToPadCenterY > Math.abs(boundary45Y)) {
      // Bottom
      wheelPositionMiddle = 2;

      handleSwipeColorChange(wheelPositionMiddle);
      setCurrentActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]); // Def
      setCurrentActionSubtype("");
      if (!inMiddleCircle) {
        wheelPositionOuter = 7;
        // setTestOuterWheelPosition(wheelPositionOuter-5)
        if (relativeToPadCenterX > boundary75X) {
          // handleSwipeColorChange(2, 7);
          // setCurrentActionType(7);
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Def
          // setCurrentActionSubtype(
          //   scriptReducer.subtypesArray[testOuterWheelPosition]
          // );
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        } else if (Math.abs(relativeToPadCenterX) < boundary75X) {
          wheelPositionOuter = 8;
          // setTestOuterWheelPosition(wheelPositionOuter-5)
          // handleSwipeColorChange(2, 8);
          // setCurrentActionType(8);
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Def
          // setCurrentActionSubtype(
          //   scriptReducer.subtypesArray[testOuterWheelPosition]
          // );
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        } else {
          wheelPositionOuter = 9;
          // setTestOuterWheelPosition(wheelPositionOuter-5)
          // handleSwipeColorChange(2, 9);
          // setCurrentActionType(9);
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Def
          // setCurrentActionSubtype(
          //   scriptReducer.subtypesArray[testOuterWheelPosition]
          // );
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        }
      }
    } else if (relativeToPadCenterY > boundary45Y) {
      // Left
      wheelPositionMiddle = 3;
      // handleSwipeColorChange(3);
      // setCurrentActionType(3);
      handleSwipeColorChange(wheelPositionMiddle);
      setCurrentActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]); // Set
      setCurrentActionSubtype("");
      if (!inMiddleCircle) {
        wheelPositionOuter = 10;
        // setTestOuterWheelPosition(wheelPositionOuter-5)
        if (relativeToPadCenterY > Math.abs(boundary15Y)) {
          // setSwipeColorDict(defaultColors);
          // handleSwipeColorChange(3, 10);
          // setCurrentActionType(10);
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Set
          // setCurrentActionSubtype(
          //   scriptReducer.subtypesArray[testOuterWheelPosition]
          // );
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        } else if (relativeToPadCenterY > boundary15Y) {
          // // setSwipeColorDict(defaultColors);
          // handleSwipeColorChange(3, 11);
          // setCurrentActionType(11);
          wheelPositionOuter = 11;
          // setTestOuterWheelPosition(wheelPositionOuter-5)
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Set
          // setCurrentActionSubtype(
          //   scriptReducer.subtypesArray[  testOuterWheelPosition ]
          // );
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        } else {
          // handleSwipeColorChange(3, 12);
          // setCurrentActionType(12);
          wheelPositionOuter = 12;
          // setTestOuterWheelPosition(wheelPositionOuter-5)
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Set
          // setCurrentActionSubtype(
          //   scriptReducer.subtypesArray[testOuterWheelPosition]
          // );
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        }
      }
    } else if (relativeToPadCenterY < boundary45Y) {
      // Top
      // handleSwipeColorChange(4);
      // setCurrentActionType(4);
      wheelPositionMiddle = 4;
      handleSwipeColorChange(wheelPositionMiddle);
      setCurrentActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]); // Att
      setCurrentActionSubtype("");
      if (!inMiddleCircle) {
        wheelPositionOuter = 13;
        // setTestOuterWheelPosition(wheelPositionOuter-5)
        if (relativeToPadCenterX < boundary75X) {
          // handleSwipeColorChange(4, 13);
          // setCurrentActionType(13);
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Def
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        } else if (relativeToPadCenterX < Math.abs(boundary75X)) {
          wheelPositionOuter = 14;
          // setTestOuterWheelPosition(wheelPositionOuter-5)
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Att
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        } else {
          // handleSwipeColorChange(4, 15);
          // setCurrentActionType(15);
          wheelPositionOuter = 15;
          // setTestOuterWheelPosition(wheelPositionOuter-5)
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Att
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        }
      }
    } else {
      setSwipeColorDict(defaultColors);
    }
  };

  const calculatePadPositionCenter = (x, y) => {
    // console.log(`gestureViewCoords.low_y: ${gestureViewCoords.low_y}`);
    let centeredX = x - userReducer.circleRadiusOuter; //< - 5 is just me callobrating, but I don't knw why
    let centeredY = y - userReducer.circleRadiusOuter;

    if (Platform.OS === "ios") {
      if (orientation === "portrait") {
        centeredY =
          y - userReducer.circleRadiusOuter * 2 + userReducer.circleRadiusInner;
      } else if (orientation === "landscape") {
        centeredX =
          x - userReducer.circleRadiusOuter * 2 + userReducer.circleRadiusInner;
      }
    }

    return { x: centeredX, y: centeredY };
  };
  const calculateDistanceFromCenter = (swipePosX, swipePosY) => {
    return Math.sqrt(
      Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
        Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
    );
  };
  // const addAction = (direction) => {
  //   // console.log("👍 start add action");
  //   console.log(direction);
  //   if (direction === null) return;
  //   if (actionList?.length > 0) {
  //     setActionList([...actionList, direction]);
  //   } else {
  //     setActionList([direction]);
  //   }
  //   setPadVisible(false);
  //   setTapIsActive(true);
  //   // console.log("👍 end add action");
  // };
  // const addNewActionToScriptReducersActionsArray =(actionPropertiesObj) => {
  //   console.log("Temp action adder")
  //       setPadVisible(false);
  //   setTapIsActive(true);
  // }
  const addNewActionToScriptReducersActionsArray = (actionPropertiesObj) => {
    // const updateScriptReducerActionsArray = (actionPropertiesObj) => {

    const newActionObj = {
      dateScripted: new Date().toISOString(), // Convert to ISO string
      timeStamp: new Date().toISOString(),
      type: actionPropertiesObj.type
        ? actionPropertiesObj.type
        : "missing type",
      subtype: actionPropertiesObj.subtype
        ? actionPropertiesObj.subtype
        : " missing tap - sub",
      quality: actionPropertiesObj.quality ? actionPropertiesObj.quality : 0,
      playerId: actionPropertiesObj.playerId
        ? actionPropertiesObj.playerId
        : "Player 1",
      scriptId: actionPropertiesObj.scriptId
        ? actionPropertiesObj.scriptId
        : scriptReducer.scriptId,
      newAction: actionPropertiesObj.newAction
        ? actionPropertiesObj.newAction
        : true,
      // quality: 0,
      // playerId: "Player 1",
      // scriptId: scriptReducer.scriptId,
      // newAction: true,
    };

    // console.log(`adding new action with timeStamp = ${newActionObj.timeStamp}`);
    // updateScriptReducerActionsArray(newActionObj);

    // create new array with
    let newScriptReducerActionArray = [
      ...scriptReducer.actionsArray,
      newActionObj,
    ];
    // sort
    newScriptReducerActionArray.sort((a, b) => a.timeStamp - b.timeStamp);
    dispatch(
      replaceScriptActionArray({ actionsArray: newScriptReducerActionArray })
    );

    // dispatch(appendAction({ newActionObj }));
    if (scriptReducerActionArray.length > 0) {
      setScriptReducerActionArray([...scriptReducerActionArray, newActionObj]);
    } else {
      setScriptReducerActionArray([newActionObj]);
    }
    setPadVisible(false);
    setTapIsActive(true);
    // console.log("👍 end add action");
  };

  const handleChangeType = (newType) => {
    const currentActionTimestamp =
      scriptReducer.actionsArray[scriptReducer.actionsArray.length - 1]
        ?.timeStamp;
    dispatch(
      updateTypePropertyInObjectOfActionsArray({
        timeStamp: currentActionTimestamp,
        type: newType,
      })
    );
  };
  const handleChangeSubtype = (newSubtype) => {
    const currentActionTimestamp =
      scriptReducer.actionsArray[scriptReducer.actionsArray.length - 1]
        ?.timeStamp;
    dispatch(
      updateSubtypePropertyInObjectOfActionsArray({
        timeStamp: currentActionTimestamp,
        subtype: newSubtype,
      })
    );
  };
  const handleChangeQuality = (newQuality) => {
    const currentActionTimestamp =
      scriptReducer.actionsArray[scriptReducer.actionsArray.length - 1]
        ?.timeStamp;
    dispatch(
      updateQualityPropertyInObjectOfActionsArray({
        timeStamp: currentActionTimestamp,
        quality: newQuality,
      })
    );
  };

  return orientation == "landscape" ? (
    // ------ LANDSCAPE ---------
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute", right: 0, bottom: 10, width: 300 }}>
        <Text>
          gestureViewCoords X: {Math.round(gestureViewCoords.x)}, width:{" "}
          {Math.round(gestureViewCoords.width)}
        </Text>
      </View>
      <ScriptingLandscapeLive
        handleSetCirclePress={handleSetCirclePress}
        setsTeamAnalyzed={setsTeamAnalyzed}
        scoreOptions={scoreOptions}
        setScoreTeamAnalyzed={setScoreTeamAnalyzed}
        scoreTeamAnalyzed={scoreTeamAnalyzed}
        setScoreTeamOpponent={setScoreTeamOpponent}
        scoreTeamOpponent={scoreTeamOpponent}
        setsTeamOpponent={setsTeamOpponent}
        stdPickerStyle={stdPickerStyleLandscape}
        setPositionalFormation={setPositionalFormation}
        positionalFormation={positionalFormation}
        setQuality={setQuality}
        quality={quality}
        setPosition={setPosition}
        position={position}
        truncateArrayElements={truncateArrayElements}
        table02data={table02data}
        setPlayerName={setPlayerName}
        playerName={playerName}
        tableTypeDummyData={tableTypeDummyData}
        setType={setType}
        type={type}
        setSubtype={setSubtype}
        subtype={subtype}
        table04data={table04data}
        combinedGestures={combinedGestures}
        // setGestureBoundaries={setGestureBoundaries}
        // gestureBoundaries={gestureBoundaries}
        setGestureViewCoords={setGestureViewCoords}
        handleChangeType={handleChangeType}
        handleChangeSubtype={handleChangeSubtype}
        handleChangeQuality={handleChangeQuality}
      />
      {padVisible && (
        <SwipePad
          // userReducer.circleRadiusInner={userReducer.userReducer.circleRadiusInner}
          // userReducer.circleRadiusMiddle={userReducer.userReducer.circleRadiusMiddle}
          // userReducer.circleRadiusMiddle={userReducer.userReducer.circleRadiusMiddle}
          styleVwMainPosition={styleVwMainPosition}
          swipeColorDict={swipeColorDict}
          numTrianglesMiddle={numTrianglesMiddle}
          numTrianglesOuter={numTrianglesOuter}
          swipeTextStyleDict={swipeTextStyleDict}
          // tableTypeDummyData={tableTypeDummyData}
        />
      )}
      {/* <View style={vwGestureCoords} /> */}
    </View>
  ) : (
    <View
      style={{ flex: 1, marginTop: 0 }}
      // onLayout={(event) => handleVwScriptingPortraitLiveParent(event)}
    >
      {/* <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          height: gestureViewCoords.height,
          left: gestureViewCoords.x,
          width: gestureViewCoords.width,
          borderColor: "black",
          borderWidth: 1,
          zIndex: 1,
        }}
      >
        <Text>
          gestureViewCoords: {Math.round(gestureViewCoords.y)},{" "}
          {Math.round(gestureViewCoords.height)}
        </Text>
      </View> */}
      {/* {process.env.EXPO_PUBLIC_ENVIRONMENT === "workstation" && ( */}
      <View
        style={{
          position: "absolute",
          right: 10,
          top: 10,
          width: 50,
          height: 50,
        }}
      >
        <TouchableOpacity
          style={{ width: "100%", height: "100%" }}
          // onPress={() => pressedGear()}
          onPress={() => {
            console.log(" going to SwipePad Settings");
            // console.log(swipeColorDict);
            navigation.navigate("SwipePadSettings", {
              numTrianglesMiddle: numTrianglesMiddle,
              numTrianglesOuter: numTrianglesOuter,
              demoOption: demoOption,
              swipeColorDict: swipeColorDict,
              defaultColors: defaultColors,
              swipeTextStyleDict: swipeTextStyleDict,
              // tableTypeDummyData: tableTypeDummyData,
            });
          }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../assets/images/btnGear.png")}
            alt="logo"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {/* )} */}
      <ScriptingPortraitLive
        navigation={navigation}
        stdPickerStyle={stdPickerStylePortrait}
        setOptions={setOptions}
        setSetsTeamAnalyzed={setSetsTeamAnalyzed}
        setsTeamAnalyzed={setsTeamAnalyzed}
        scoreOptions={scoreOptions}
        setScoreTeamAnalyzed={setScoreTeamAnalyzed}
        scoreTeamAnalyzed={scoreTeamAnalyzed}
        setScoreTeamOpponent={setScoreTeamOpponent}
        scoreTeamOpponent={scoreTeamOpponent}
        setSetsTeamOpponent={setSetsTeamOpponent}
        setsTeamOpponent={setsTeamOpponent}
        setPositionalFormation={setPositionalFormation}
        positionalFormation={positionalFormation}
        setQuality={setQuality}
        quality={quality}
        setPosition={setPosition}
        position={position}
        truncateArrayElements={truncateArrayElements}
        table02data={table02data}
        setPlayerName={setPlayerName}
        playerName={playerName}
        tableTypeDummyData={tableTypeDummyData}
        setType={setType}
        type={type}
        setSubtype={setSubtype}
        subtype={subtype}
        table04data={table04data}
        combinedGestures={combinedGestures}
        // setGestureBoundaries={setGestureBoundaries}
        // gestureBoundaries={gestureBoundaries}
        setGestureViewCoords={setGestureViewCoords}
        gestureViewCoords={gestureViewCoords}
        handleChangeType={handleChangeType}
        handleChangeSubtype={handleChangeSubtype}
        handleChangeQuality={handleChangeQuality}
      />
      {padVisible && (
        <SwipePad
          styleVwMainPosition={styleVwMainPosition}
          swipeColorDict={swipeColorDict}
          swipeTextStyleDict={swipeTextStyleDict}
          numTrianglesMiddle={numTrianglesMiddle}
          numTrianglesOuter={numTrianglesOuter}
          tableTypeDummyData={tableTypeDummyData}
        />
      )}
      {/* ---- For Testing Only ---- */}
      {process.env.EXPO_PUBLIC_ENVIRONMENT === "workstation" && (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            padding: 10,
          }}
        >
          <Text>actions saved: {scriptReducer.actionsArray.length}</Text>
          <Text>
            timestamp:{" "}
            {scriptReducer.actionsArray.length > 0
              ? scriptReducer.actionsArray[
                  scriptReducer.actionsArray.length - 1
                ].timeStamp.substring(11, 25)
              : "no actions"}
          </Text>
          <Text>
            type:{" "}
            {scriptReducer.actionsArray.length > 0
              ? scriptReducer.actionsArray[
                  scriptReducer.actionsArray.length - 1
                ].type
              : "no actions"}
          </Text>
          <Text>
            subtype:{" "}
            {scriptReducer.actionsArray.length > 0
              ? scriptReducer.actionsArray[
                  scriptReducer.actionsArray.length - 1
                ].subtype
              : "no actions"}
          </Text>
          <Text>
            quality:{" "}
            {scriptReducer.actionsArray.length > 0
              ? scriptReducer.actionsArray[
                  scriptReducer.actionsArray.length - 1
                ].quality
              : "no actions"}
          </Text>
        </View>
      )}
    </View>
    //   </GestureDetector>
    // </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
  },
});

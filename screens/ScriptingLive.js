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

export default function ScriptingLive({ navigation }) {
  // const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
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
  const demoOption = "4-12";
  const [numTrianglesMiddle, setNumTrianglesMiddle] = useState(4); // 2, 4, or 5
  const [numTrianglesOuter, setNumTrianglesOuter] = useState(12); // 8, 10 or 12
  // const [circleRadiusOuter, setCircleRadiusOuter] = useState(80);
  const [circleRadiusMiddle, setCircleRadiusMiddle] = useState(60);
  const [circleRadiusInner, setCircleRadiusInner] = useState(20);
  // console.log(
  //   `--> userReducer.circleRadiusOuter: ${userReducer.circleRadiusOuter}`
  // );
  // console.log(typeof userReducer.circleRadiusOuter);
  const [circleRadiusOuter, setCircleRadiusOuter] = useState(
    userReducer.circleRadiusOuter
  );
  // const [circleRadiusMiddle, setCircleRadiusMiddle] = useState(
  //   userReducer.circleRadiusMiddle
  // );
  // const [circleRadiusInner, setCircleRadiusInner] = useState(
  //   userReducer.circleRadiusInner
  // );
  const [padPositionCenter, setPadPositionCenter] = useState({ x: 0, y: 0 });
  // const [gestureBoundaries, setGestureBoundaries] = useState({
  //   low_x: 0,
  //   high_x: Dimensions.get("window").width,
  //   low_y: 0,
  //   high_y: Dimensions.get("window").height,
  // });
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
  // const getVwVolleBallCourtBoundaries=()

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
      console.log(`absoluteX: ${absoluteX}, absoluteY: ${absoluteY}`);
      // console.log(`gestureBoundaries.low_y: ${gestureBoundaries.low_y}`);
      if (
        absoluteY > gestureViewCoords.y &&
        absoluteY < gestureViewCoords.y + gestureViewCoords.height &&
        absoluteX > gestureViewCoords.x &&
        absoluteX < gestureViewCoords.x + gestureViewCoords.width
      ) {
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
      }
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
      if (distanceFromCenter < circleRadiusInner) {
        console.log("- close wheel");
        setPadVisible(false);
        setTapIsActive(true);
      }
    });

  const gestureSwipeOnChange = Gesture.Pan().onChange((event) => {
    // console.log("👍 start gestureSwipeOnChange");

    const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

    // prevent logic from firing left of landscape image
    if (absoluteX < gestureViewCoords.x) {
      return;
    }
    // const swipePosX = calculatePadPositionCenter(x, y).x;
    // const swipePosY = calculatePadPositionCenter(x, y).y;
    const swipePosX = calculatePadPositionCenter(absoluteX, absoluteY).x;
    const swipePosY = calculatePadPositionCenter(absoluteX, absoluteY).y;

    const distanceFromCenter = calculateDistanceFromCenter(
      swipePosX,
      swipePosY
    );

    const relativeToPadCenterX = swipePosX - tapDetails.padPosCenterX;
    const relativeToPadCenterY = swipePosY - tapDetails.padPosCenterY;

    const inInnerCircle = distanceFromCenter < circleRadiusInner;
    const inMiddleCircle = distanceFromCenter < circleRadiusMiddle;

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
    // console.log("👍 end gestureSwipeOnChange");
  });
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
    if (absoluteX < gestureViewCoords.x) {
      setPadVisible(false);
      setTapIsActive(true);
      return;
    }
    if (distanceFromCenter > circleRadiusInner) {
      // console.log("--- triggered action");
      addAction(currentActionType);
    }
  });

  // Combine swipe and tap gestures
  const combinedGestures = Gesture.Simultaneous(
    gestureTapBegin,
    gestureTapOnEnd,
    gestureSwipeOnEnd,
    gestureSwipeOnChange
    // gestureLongPress
  );

  const logicFourEightCircle = (
    relativeToPadCenterX,
    relativeToPadCenterY,
    inMiddleCircle
  ) => {
    const boundary45 = relativeToPadCenterX * Math.tan((Math.PI / 180) * 45);
    if (relativeToPadCenterX > 0 && relativeToPadCenterY > 0) {
      // Bottom Right
      handleSwipeColorChange(1);
      setCurrentActionType(1);
      setType(tableTypeDummyData[1]);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY < boundary45) {
          handleSwipeColorChange(1, 5);
          setCurrentActionType(5);
        } else {
          handleSwipeColorChange(1, 6);
          setCurrentActionType(6);
        }
      }
    } else if (relativeToPadCenterX < 0 && relativeToPadCenterY > 0) {
      // Bottom Left
      handleSwipeColorChange(2);
      setCurrentActionType(2);
      setType(tableTypeDummyData[2]);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY > Math.abs(boundary45)) {
          handleSwipeColorChange(2, 7);
          setCurrentActionType(7);
        } else {
          handleSwipeColorChange(2, 8);
          setCurrentActionType(8);
        }
      }
    } else if (relativeToPadCenterX < 0 && relativeToPadCenterY < 0) {
      // Top Left
      handleSwipeColorChange(3);
      setCurrentActionType(3);
      setType(tableTypeDummyData[3]);
      // console.log("set Att");
      if (!inMiddleCircle) {
        if (relativeToPadCenterY > boundary45) {
          handleSwipeColorChange(3, 9);
          setCurrentActionType(9);
        } else {
          handleSwipeColorChange(3, 10);
          setCurrentActionType(10);
        }
      }
    } else if (relativeToPadCenterX > 0 && relativeToPadCenterY < 0) {
      // Top Right
      handleSwipeColorChange(4);
      setCurrentActionType(4);
      setType(tableTypeDummyData[0]);
      if (!inMiddleCircle) {
        if (Math.abs(relativeToPadCenterY) > boundary45) {
          handleSwipeColorChange(4, 11);
          setCurrentActionType(11);
        } else {
          handleSwipeColorChange(4, 12);
          setCurrentActionType(12);
        }
      }
    } else {
      setSwipeColorDict(defaultColors);
    }
  };

  const logicFiveTenCircle = (
    relativeToPadCenterX,
    relativeToPadCenterY,
    inMiddleCircle
  ) => {
    // Y dependent
    const boundary345Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 345); // sector 1 beginning
    const boundary57Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 57); // sector 1 end sector 2 begin
    const boundary21Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 21); // sector 1-1 end 1-2 begin
    const boundary129Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 129); // sector 2 end 3begin
    const boundary93Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 93); // splits sector 2
    const boundary201Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 201); // sector 3-1 top end
    const boundary165Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 165); // sector 3-1 top end
    const boundary273Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 273); // sector 4 end 5 begin
    const boundary237Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 237); // splits sector 4
    const boundary309Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 309); // splits sector 5

    if (
      relativeToPadCenterY > boundary345Y &&
      relativeToPadCenterY < boundary57Y
    ) {
      // Right (bottom - ish) side (sector 1)
      handleSwipeColorChange(1);
      setCurrentActionType(1);

      if (!inMiddleCircle) {
        if (relativeToPadCenterY < boundary21Y) {
          handleSwipeColorChange(1, 6);
          setCurrentActionType(6);
        } else {
          handleSwipeColorChange(1, 7);
          setCurrentActionType(7);
        }
      }
    } else if (
      relativeToPadCenterY > boundary57Y &&
      relativeToPadCenterY > boundary129Y
    ) {
      // Bottom (sector 2)
      handleSwipeColorChange(2);
      setCurrentActionType(2);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY > boundary93Y) {
          handleSwipeColorChange(2, 8);
          setCurrentActionType(8);
        } else {
          handleSwipeColorChange(2, 9);
          setCurrentActionType(9);
        }
      }
    }
    //
    else if (
      // relativeToPadCenterY < -boundary231Y &&
      relativeToPadCenterY > boundary201Y
    ) {
      // Left
      handleSwipeColorChange(3);
      setCurrentActionType(3);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY > boundary165Y) {
          // line that splits the the outer sectors and cuts the middle sector in half
          handleSwipeColorChange(3, 10);
          setCurrentActionType(10);
        } else {
          handleSwipeColorChange(3, 11);
          setCurrentActionType(11);
        }
      }
    }
    //
    else if (
      relativeToPadCenterY < boundary273Y
      // &&
      // relativeToPadCenterY > boundary201Y
    ) {
      // Top Left
      handleSwipeColorChange(4);
      setCurrentActionType(4);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY > boundary237Y) {
          handleSwipeColorChange(4, 12);
          setCurrentActionType(12);
        } else {
          handleSwipeColorChange(4, 13);
          setCurrentActionType(13);
        }
      }
    } else {
      // setSwipeColorDict(defaultColors);
      handleSwipeColorChange(5);
      setCurrentActionType(5);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY < boundary309Y) {
          handleSwipeColorChange(5, 14);
          setCurrentActionType(14);
        } else {
          handleSwipeColorChange(5, 15);
          setCurrentActionType(15);
        }
      }
    }
  };

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

    if (Math.abs(relativeToPadCenterY) < boundary45Y) {
      // Right side
      handleSwipeColorChange(1);
      setCurrentActionType(1);
      if (!inMiddleCircle) {
        if (-relativeToPadCenterY > boundary15Y) {
          // setSwipeColorDict(defaultColors);
          handleSwipeColorChange(1, 16);
          setCurrentActionType(16);
        } else if (Math.abs(relativeToPadCenterY) < boundary15Y) {
          // setSwipeColorDict(defaultColors);
          handleSwipeColorChange(1, 5);
          setCurrentActionType(5);
        } else {
          handleSwipeColorChange(1, 6);
          setCurrentActionType(6);
        }
      }
    } else if (relativeToPadCenterY > Math.abs(boundary45Y)) {
      // Bottom
      handleSwipeColorChange(2);
      setCurrentActionType(2);
      if (!inMiddleCircle) {
        if (relativeToPadCenterX > boundary75X) {
          handleSwipeColorChange(2, 7);
          setCurrentActionType(7);
        } else if (Math.abs(relativeToPadCenterX) < boundary75X) {
          handleSwipeColorChange(2, 8);
          setCurrentActionType(8);
        } else {
          handleSwipeColorChange(2, 9);
          setCurrentActionType(9);
        }
      }
    } else if (relativeToPadCenterY > boundary45Y) {
      // Left
      handleSwipeColorChange(3);
      setCurrentActionType(3);
      if (!inMiddleCircle) {
        if (relativeToPadCenterY > Math.abs(boundary15Y)) {
          // setSwipeColorDict(defaultColors);
          handleSwipeColorChange(3, 10);
          setCurrentActionType(10);
        } else if (relativeToPadCenterY > boundary15Y) {
          // setSwipeColorDict(defaultColors);
          handleSwipeColorChange(3, 11);
          setCurrentActionType(11);
        } else {
          handleSwipeColorChange(3, 12);
          setCurrentActionType(12);
        }
      }
    } else if (relativeToPadCenterY < boundary45Y) {
      // Top
      handleSwipeColorChange(4);
      setCurrentActionType(4);
      if (!inMiddleCircle) {
        if (relativeToPadCenterX < boundary75X) {
          handleSwipeColorChange(4, 13);
          setCurrentActionType(13);
        } else if (relativeToPadCenterX < Math.abs(boundary75X)) {
          handleSwipeColorChange(4, 14);
          setCurrentActionType(14);
        } else {
          handleSwipeColorChange(4, 15);
          setCurrentActionType(15);
        }
      }
    } else {
      setSwipeColorDict(defaultColors);
    }
  };

  const calculatePadPositionCenter = (x, y) => {
    // console.log(`gestureViewCoords.low_y: ${gestureViewCoords.low_y}`);
    let centeredX = x - circleRadiusOuter; //< - 5 is just me callobrating, but I don't knw why
    let centeredY = y - circleRadiusOuter;

    if (Platform.OS === "ios") {
      if (orientation === "portrait") {
        centeredY = y - circleRadiusOuter * 2 + circleRadiusInner;
      } else if (orientation === "landscape") {
        centeredX = x - circleRadiusOuter * 2 + circleRadiusInner;
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
  const addAction = (direction) => {
    // console.log("👍 start add action");
    console.log(direction);
    if (direction === null) return;
    if (actionList?.length > 0) {
      setActionList([...actionList, direction]);
    } else {
      setActionList([direction]);
    }
    setPadVisible(false);
    setTapIsActive(true);
    // console.log("👍 end add action");
  };

  const vwGestureCoords = {
    position: "absolute",
    top: gestureViewCoords.y,
    height: gestureViewCoords.height,
    left: gestureViewCoords.x,
    width: gestureViewCoords.width,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "black",
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
      />
      {padVisible && (
        <SwipePad
          circleRadiusInner={circleRadiusInner}
          circleRadiusMiddle={circleRadiusMiddle}
          styleVwMainPosition={styleVwMainPosition}
          swipeColorDict={swipeColorDict}
          circleRadiusOuter={userReducer.circleRadiusOuter}
          numTrianglesMiddle={numTrianglesMiddle}
          numTrianglesOuter={numTrianglesOuter}
        />
      )}
      {/* <View style={vwGestureCoords} /> */}
    </View>
  ) : (
    <View
      style={{ flex: 1, marginTop: 0 }}
      // onLayout={(event) => handleVwScriptingPortraitLiveParent(event)}
    >
      {/* <View style={{ position: "absolute", left: 60, width: 300 }}>
        <Text>
          gestureViewCoords: {Math.round(gestureViewCoords.y)},{" "}
          {Math.round(gestureViewCoords.height)}
        </Text>
      </View> */}
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
              circleRadiusInner: circleRadiusInner,
              circleRadiusMiddle: circleRadiusMiddle,
              circleRadiusOuter: circleRadiusOuter,
              swipeColorDict: swipeColorDict,
              defaultColors: defaultColors,
              swipeTextStyleDict: swipeTextStyleDict,
              tableTypeDummyData: tableTypeDummyData,
              // setCircleRadiusOuter: setCircleRadiusOuter,
            });
          }}
        >
          {/* <Text> User: {userReducer.email}</Text> */}

          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../assets/images/btnGear.png")}
            alt="logo"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
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
      />
      {padVisible && (
        <SwipePad
          circleRadiusInner={userReducer.circleRadiusInner}
          circleRadiusMiddle={userReducer.circleRadiusMiddle}
          styleVwMainPosition={styleVwMainPosition}
          swipeColorDict={swipeColorDict}
          swipeTextStyleDict={swipeTextStyleDict}
          circleRadiusOuter={userReducer.circleRadiusOuter}
          numTrianglesMiddle={numTrianglesMiddle}
          numTrianglesOuter={numTrianglesOuter}
          tableTypeDummyData={tableTypeDummyData}
        />
      )}
      {/* <View style={vwPositionBoundaries}></View> */}

      {/* <View style={vwGestureCoords} /> */}
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

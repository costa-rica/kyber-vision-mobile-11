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

// SwipePad
import { Gesture } from "react-native-gesture-handler";
// import SwipePad from "./subcomponents/swipePads/SwipePad";
// import SwipePadReception from "./subcomponents/swipePads/SwipePadReception";
// import SwipePadServe from "./subcomponents/swipePads/SwipePadServe";
import SwipePad from "./subcomponents/swipePads/SwipePad";
import SwipePadReception from "./subcomponents/swipePads/SwipePadReception";
import SwipePadServe from "./subcomponents/swipePads/SwipePadServe";
import SwipePadWhiteCircle from "./subcomponents/swipePads/SwipePadWhiteCircle";
import { useSelector } from "react-redux";
import {
  newScript,
  deleteScript,
  replaceScriptActionArray,
  updateQualityPropertyInObjectOfActionsArray,
  updateTypePropertyInObjectOfActionsArray,
  updateSubtypePropertyInObjectOfActionsArray,
  updatePointsTableArray,
  rotatePlayerNamesArray,
  initializePlayerNamesArrayRotated,
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
  // const [scriptId, setScriptId] = useState(scriptReducer.scriptId);
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
  const [rotation, setRotation] = useState(scriptReducer.rotationArray[0]);
  const [quality, setQuality] = useState(scriptReducer.qualityArray[2]);
  // const [position, setPosition] = useState(1);
  const [positionalArea, setPositionalArea] = useState(
    scriptReducer.positionalAreasArray[0]
  );
  const [playerName, setPlayerName] = useState(
    // scriptReducer.playerNamesArrayRotated[0]
    scriptReducer.scriptingForPlayerObject?.firstName
  );
  const [type, setType] = useState(scriptReducer.typesArray[0]);
  const [subtype, setSubtype] = useState(scriptReducer.subtypesArray[0]);

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

  useEffect(() => {}, [positionalArea]);
  // --- Dynamic styles ---
  const stdTruncatePlayerNameLength = 4;
  const truncateArrayElements = (
    arr,
    maxLength = stdTruncatePlayerNameLength
  ) => {
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
  // const [actionList, setActionList] = useState([]);
  const [opponentServed, setOpponentServed] = useState(
    scriptReducer.pointsTableArray[scriptReducer.pointsTableArray.length - 1]
      ?.opponentServed || false
  );
  const [swipePadServeIsActive, setSwipePadServeIsActive] = useState(false);
  const [swipePadReceptionIsActive, setSwipePadReceptionIsActive] =
    useState(false);
  const [swipeColorDict, setSwipeColorDict] = useState(
    userReducer.defaultWheelColors
  );
  const stdSwipePadDefaultTextColor = "black";
  const stdSwipePadDefaultTextFontSize = 10;
  const stdLengthOfPositionLines = 10;
  // const stdColorOfPositionLines = "gray";
  const [stdColorOfPositionLines, setStdColorOfPositionLines] = useState(
    userReducer.scriptPositionGuides ? "gray" : "transparent"
  );
  useEffect(() => {
    setStdColorOfPositionLines(
      userReducer.scriptPositionGuides ? "gray" : "transparent"
    );
  }, [userReducer.scriptPositionGuides]);
  const stdWidthOfPoistionLines = 1;
  const stdStyleOfPositionLines = "solid";
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
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
  };

  // Function to temporarily change color
  const handleSwipeColorChange = (direction, outerDirection = false) => {
    setSwipeColorDict(userReducer.defaultWheelColors);
    setSwipeTextStyleDict(defaultTextStyles);

    if (!outerDirection) {
      setSwipeColorDict((prevColors) => ({
        ...prevColors,
        [direction]: userReducer.selectedWheelColors[direction],
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
        [direction]: userReducer.selectedWheelColors[direction],
        [outerDirection]: userReducer.selectedWheelColors[outerDirection],
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

  // const determineTapPlayer = (x, y) => {
  //   if (y < gestureViewCoords.height / 2 && x < gestureViewCoords.width / 3) {
  //     // P4 ; array postion 3
  //     setPlayerName(scriptReducer.playerNamesArrayRotated[3]);
  //     setPositionalArea(scriptReducer.positionalAreasArray[3]);
  //   } else if (
  //     y < gestureViewCoords.height / 2 &&
  //     x < gestureViewCoords.width * (2 / 3)
  //   ) {
  //     // P3 ; array postion 2
  //     setPlayerName(scriptReducer.playerNamesArrayRotated[2]);
  //     setPositionalArea(scriptReducer.positionalAreasArray[2]);
  //   } else if (y < gestureViewCoords.height / 2) {
  //     // P2 ; array postion 1
  //     setPlayerName(scriptReducer.playerNamesArrayRotated[1]);
  //     setPositionalArea(scriptReducer.positionalAreasArray[1]);
  //   } else if (x < gestureViewCoords.width / 3) {
  //     // P5 ; array postion 4
  //     setPlayerName(scriptReducer.playerNamesArrayRotated[4]);
  //     setPositionalArea(scriptReducer.positionalAreasArray[4]);
  //   } else if (x < gestureViewCoords.width * (2 / 3)) {
  //     // P6 ; array postion 5
  //     setPlayerName(scriptReducer.playerNamesArrayRotated[5]);
  //     setPositionalArea(scriptReducer.positionalAreasArray[5]);
  //   } else {
  //     // P1 ; array postion 0
  //     setPlayerName(scriptReducer.playerNamesArrayRotated[0]);
  //     setPositionalArea(scriptReducer.positionalAreasArray[0]);
  //   }
  // };

  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    if (tapIsActive) {
      const timestamp = new Date().toISOString();
      const { x, y, absoluteX, absoluteY } = event;
      // console.log(
      //   `x: ${x}, y:${y}, absoluteX:${absoluteX}, absoluteY:${absoluteY}`
      // );
      const padPosCenterX = calculatePadPositionCenter(absoluteX, absoluteY).x;
      let padPosCenterY = calculatePadPositionCenter(absoluteX, absoluteY).y;
      // if (Platform.OS === "ios") {
      //   padPosCenterY = calculatePadPositionCenter(absoluteX, y).y;
      // }
      // console.log(
      //   `padPosCenterX: ${padPosCenterX}, padPosCenterY:${padPosCenterY}`
      // );
      setPadPositionCenter({
        x: padPosCenterX,
        y: padPosCenterY,
      });
      setPadVisible(true);
      setTapDetails({
        timestamp,
        padPosCenterX: padPosCenterX,
        padPosCenterY: padPosCenterY,
      });
      // determineTapPlayer(x, y);

      // // ----- Record action here ---------------------------------------------
      setCurrentActionType("tap-default");
      setCurrentActionSubtype("tap-default");
      // setCurrentActionType(scriptReducer.typesArray[0]);
      // setCurrentActionSubtype(" ");

      addNewActionToScriptReducersActionsArrayNoWheel({
        type: currentActionType,
        subtype: currentActionSubtype,
      });
      console.log("----- Do we get here ????");

      handleSwipeColorChange("center");
      console.log("gestureTapBegin: Working (end of function)");
      // }
    }
  });

  // // Trigger the function after the state has updated
  // useEffect(() => {
  //   if (currentActionType && currentActionSubtype) {
  //     console.log("adding action ------");
  //     addNewActionToScriptReducersActionsArrayNoWheel({
  //       type: currentActionType,
  //       subtype: currentActionSubtype,
  //     });
  //     // setTapIsActive(false);
  //     setPadVisible(false);
  //     setTapIsActive(true);
  //   }
  // }, [currentActionType, currentActionSubtype]);

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

  const gestureSwipeOnEnd = Gesture.Pan() // <-- just for SwipePadWhiteCenter
    // .maxDuration(10000)
    .onEnd((event) => {
      setPadVisible(false);
      setTapIsActive(true);
    });
  // const gestureSwipeOnChange = Gesture.Pan().onChange(
  //   (event) => {
  //     // console.log("👍 start gestureSwipeOnChange");

  //     const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

  //     // prevent logic from firing left of landscape image
  //     // if (
  //     //   absoluteY > gestureViewCoords.y &&
  //     //   absoluteY < gestureViewCoords.y + gestureViewCoords.height &&
  //     //   absoluteX > gestureViewCoords.x &&
  //     //   absoluteX < gestureViewCoords.x + gestureViewCoords.width
  //     // ) {
  //     // console.log("- IN gestureSwipeOnChange");
  //     const swipePosX = calculatePadPositionCenter(absoluteX, absoluteY).x;
  //     const swipePosY = calculatePadPositionCenter(absoluteX, absoluteY).y;

  //     const distanceFromCenter = calculateDistanceFromCenter(
  //       swipePosX,
  //       swipePosY
  //     );

  //     const relativeToPadCenterX = swipePosX - tapDetails.padPosCenterX;
  //     const relativeToPadCenterY = swipePosY - tapDetails.padPosCenterY;

  //     const inInnerCircle = distanceFromCenter < userReducer.circleRadiusInner;
  //     const inMiddleCircle =
  //       distanceFromCenter < userReducer.circleRadiusMiddle;

  //     if (inInnerCircle) {
  //       handleSwipeColorChange("center");
  //       setCurrentActionType(null);
  //     } else {
  //       if (demoOption === "4-8")
  //         logicFourEightCircle(
  //           relativeToPadCenterX,
  //           relativeToPadCenterY,
  //           inMiddleCircle
  //         );

  //       if (demoOption == "5-10")
  //         logicFiveTenCircle(
  //           relativeToPadCenterX,
  //           relativeToPadCenterY,
  //           inMiddleCircle
  //         );
  //       if (demoOption === "4-12")
  //         logicFourTwelveCircle(
  //           relativeToPadCenterX,
  //           relativeToPadCenterY,
  //           inMiddleCircle
  //         );
  //     }
  //   }
  //   // console.log("👍 end gestureSwipeOnChange");
  //   // }
  // );
  // // Combine swipe and tap gestures
  // const gestureSwipeOnEnd = Gesture.Pan().onEnd((event) => {
  //   const { x, y, translationX, translationY, absoluteX, absoluteY } = event;

  //   const swipePosX = calculatePadPositionCenter(x, y).x;
  //   const swipePosY = calculatePadPositionCenter(x, y).y;

  //   const distanceFromCenter = Math.sqrt(
  //     Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
  //       Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
  //   );

  //   if (distanceFromCenter > userReducer.circleRadiusInner) {
  //     addNewActionToScriptReducersActionsArray({
  //       type: currentActionType,
  //       subtype: currentActionSubtype,
  //     });
  //   }
  // });

  // Combine swipe and tap gestures
  const combinedGestures = Gesture.Simultaneous(
    gestureTapBegin,
    gestureTapOnEnd,
    gestureSwipeOnEnd
    // gestureSwipeOnChange
    // gestureLongPress
  );

  // const logicFourTwelveCircle = (
  //   relativeToPadCenterX,
  //   relativeToPadCenterY,
  //   inMiddleCircle
  // ) => {
  //   // Y dependent
  //   const boundary15Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 15); // ? parts to circle, 15 degrees
  //   // const boundary30Y =
  //   //   relativeToPadCenterX * Math.tan((Math.PI / 180) * (360 / 12)); // 12 parts to circle
  //   const boundary45Y = relativeToPadCenterX * Math.tan((Math.PI / 180) * 45); // 8 parts to circle 45 = 360/8
  //   // X dependent
  //   const boundary75X =
  //     relativeToPadCenterY * (1 / Math.tan((Math.PI / 180) * 75));

  //   let wheelPositionMiddle = 0; // 0-4
  //   let wheelPositionOuter = 5; // 5-12, 5 is like 0, according to the scriptReducer.subtypesArray

  //   // --- turn off wheel logic ---
  //   // if (Math.abs(relativeToPadCenterY) < boundary45Y) {
  //   //   // Right side
  //   //   wheelPositionMiddle = 1;

  //   //   // setCurrentActionType(1);
  //   //   handleSwipeColorChange(wheelPositionMiddle);
  //   //   setCurrentActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]); // Bloc
  //   //   setCurrentActionSubtype("");
  //   //   if (!inMiddleCircle) {
  //   //     wheelPositionOuter = 16; // like 16
  //   //     // setTestOuterWheelPosition(wheelPositionOuter-5)
  //   //     if (-relativeToPadCenterY > boundary15Y) {
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       );
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //       // setCurrentActionSubtype(
  //   //       //   scriptReducer.subtypesArray[testOuterWheelPosition]
  //   //       // );
  //   //     } else if (Math.abs(relativeToPadCenterY) < boundary15Y) {
  //   //       // setSwipeColorDict(defaultColors);
  //   //       // handleSwipeColorChange(1, 5);
  //   //       // setCurrentActionType(5);
  //   //       wheelPositionOuter = 5;
  //   //       // setTestOuterWheelPosition(wheelPositionOuter-5)
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Bloc
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //       // setCurrentActionSubtype(
  //   //       //   scriptReducer.subtypesArray[testOuterWheelPosition]
  //   //       // );
  //   //     } else {
  //   //       wheelPositionOuter = 6;
  //   //       // setTestOuterWheelPosition(wheelPositionOuter-5)
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Bloc
  //   //       // setCurrentActionSubtype(
  //   //       //   scriptReducer.subtypesArray[testOuterWheelPosition]
  //   //       // );
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //     }
  //   //   }
  //   // } else if (relativeToPadCenterY > Math.abs(boundary45Y)) {
  //   //   // Bottom
  //   //   wheelPositionMiddle = 2;

  //   //   handleSwipeColorChange(wheelPositionMiddle);
  //   //   setCurrentActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]); // Def
  //   //   setCurrentActionSubtype("");
  //   //   if (!inMiddleCircle) {
  //   //     wheelPositionOuter = 7;
  //   //     if (relativeToPadCenterX > boundary75X) {
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Def
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //     } else if (Math.abs(relativeToPadCenterX) < boundary75X) {
  //   //       wheelPositionOuter = 8;
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Def
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //     } else {
  //   //       wheelPositionOuter = 9;
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Def
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //     }
  //   //   }
  //   // } else if (relativeToPadCenterY > boundary45Y) {
  //   //   // Left
  //   //   wheelPositionMiddle = 3;
  //   //   handleSwipeColorChange(wheelPositionMiddle);
  //   //   setCurrentActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]); // Set
  //   //   setCurrentActionSubtype("");
  //   //   if (!inMiddleCircle) {
  //   //     wheelPositionOuter = 10;
  //   //     if (relativeToPadCenterY > Math.abs(boundary15Y)) {
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Set
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //     } else if (relativeToPadCenterY > boundary15Y) {
  //   //       wheelPositionOuter = 11;
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Set

  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //     } else {
  //   //       wheelPositionOuter = 12;
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Set
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //     }
  //   //   }
  //   // } else if (relativeToPadCenterY < boundary45Y) {
  //   //   // Top
  //   //   // handleSwipeColorChange(4);
  //   //   // setCurrentActionType(4);
  //   //   wheelPositionMiddle = 4;
  //   //   handleSwipeColorChange(wheelPositionMiddle);
  //   //   setCurrentActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]); // Att
  //   //   setCurrentActionSubtype("");
  //   //   if (!inMiddleCircle) {
  //   //     wheelPositionOuter = 13;
  //   //     // setTestOuterWheelPosition(wheelPositionOuter-5)
  //   //     if (relativeToPadCenterX < boundary75X) {
  //   //       // handleSwipeColorChange(4, 13);
  //   //       // setCurrentActionType(13);
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Def
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //     } else if (relativeToPadCenterX < Math.abs(boundary75X)) {
  //   //       wheelPositionOuter = 14;
  //   //       // setTestOuterWheelPosition(wheelPositionOuter-5)
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Att
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //     } else {
  //   //       // handleSwipeColorChange(4, 15);
  //   //       // setCurrentActionType(15);
  //   //       wheelPositionOuter = 15;
  //   //       // setTestOuterWheelPosition(wheelPositionOuter-5)
  //   //       handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
  //   //       setCurrentActionType(
  //   //         scriptReducer.typesArray[wheelPositionMiddle - 1]
  //   //       ); // Att
  //   //       setCurrentActionSubtype(
  //   //         scriptReducer.subtypesArray[wheelPositionOuter - 5]
  //   //       );
  //   //     }
  //   //   }
  //   // } else {
  //   //   setSwipeColorDict(userReducer.defaultWheelColors);
  //   // }
  // };

  const calculatePadPositionCenter = (x, y) => {
    // console.log(
    //   `userReducer.circleRadiusOuter: ${userReducer.circleRadiusOuter}`
    // );
    // console.log(`gestureViewCoords.low_y: ${gestureViewCoords.low_y}`);
    let centeredX = x - userReducer.circleRadiusOuter;
    let centeredY = y - userReducer.circleRadiusOuter;

    if (Platform.OS === "ios") {
      if (orientation === "portrait") {
        centeredY = y - userReducer.circleRadiusOuter - 60;
      } else if (orientation === "landscape") {
        centeredX = x - userReducer.circleRadiusOuter - 60;
      }
    }

    return { x: centeredX, y: centeredY };
  };
  // const calculateDistanceFromCenter = (swipePosX, swipePosY) => {
  //   return Math.sqrt(
  //     Math.pow(swipePosX - tapDetails.padPosCenterX, 2) +
  //       Math.pow(swipePosY - tapDetails.padPosCenterY, 2)
  //   );
  // };

  // const addNewActionToScriptReducersActionsArray = (actionPropertiesObj) => {
  const addNewActionToScriptReducersActionsArrayNoWheel = (
    actionPropertiesObj
  ) => {
    // console.log(`triggered addNewActionToScriptReducersActionsArrayNoWheel -`);
    const newActionObj = {
      dateScripted: new Date().toISOString(), // Convert to ISO string
      timestamp: new Date().toISOString(),
      type: actionPropertiesObj.type ? actionPropertiesObj.type : " ",
      subtype: actionPropertiesObj.subtype ? actionPropertiesObj.subtype : " ",
      quality: actionPropertiesObj.quality ? actionPropertiesObj.quality : 0,
      playerId: scriptReducer.scriptingForPlayerObject.id,
      scriptId: actionPropertiesObj.scriptId
        ? actionPropertiesObj.scriptId
        : scriptReducer.scriptId,
      newAction: actionPropertiesObj.newAction
        ? actionPropertiesObj.newAction
        : true,
    };

    // create new array with
    let newScriptReducerActionArray = [
      ...scriptReducer.actionsArray,
      newActionObj,
    ];

    console.log(`newActionObj: ${JSON.stringify(newActionObj)}`);

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

    //setPadVisible(false);
    //setTapIsActive(true);
    setSwipePadServeIsActive(false);
    setSwipePadReceptionIsActive(false);
    console.log(
      "addNewActionToScriptReducersActionsArrayNoWheel: Working (end of function)"
    );
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

  // Score Logic
  const handleWinRallyButtonPress = () => {
    // Rotation advance logic:
    // - if teamOpponentPrevious score is the same as before
    // - if teamOpponentPrevious score = 0 and teamOpponentServed
    const teamOpponentPreviousScore =
      scriptReducer.pointsTableArray[scriptReducer.pointsTableArray.length - 1]
        ?.scoreTeamOpponent;

    // console.log(`previous score: ${teamOpponentPreviousScore}`);

    let rotationTemp = rotation;

    if (
      (teamOpponentPreviousScore != null &&
        teamOpponentPreviousScore !== scoreTeamOpponent) ||
      (opponentServed && scoreTeamAnalyzed === 0)
    ) {
      // const nextRotationIndex =
      //   (scriptReducer.rotationArray.indexOf(rotation) + 1) %
      //   scriptReducer.rotationArray.length;
      const prevRotationIndex =
        (scriptReducer.rotationArray.indexOf(rotation) -
          1 +
          scriptReducer.rotationArray.length) %
        scriptReducer.rotationArray.length;
      rotationTemp = scriptReducer.rotationArray[prevRotationIndex];
      dispatch(rotatePlayerNamesArray());
    }
    const newScoreTeamAnalyzed = scoreTeamAnalyzed + 1;
    const pointsTableArrayElemObj = {
      pointsId: `${
        setsTeamAnalyzed + setsTeamOpponent + 1
      } - ${newScoreTeamAnalyzed} - ${scoreTeamOpponent}`,
      setNumber: setsTeamAnalyzed + setsTeamOpponent + 1,
      scoreTeamAnalyzed: newScoreTeamAnalyzed,
      scoreTeamOpponent: scoreTeamOpponent,
      rotation: rotationTemp,
      opponentServed: opponentServed,
    };

    const pointsTableArray = [
      ...scriptReducer.pointsTableArray,
      pointsTableArrayElemObj,
    ];
    setRotation(rotationTemp);
    setScoreTeamAnalyzed(newScoreTeamAnalyzed);
    dispatch(updatePointsTableArray({ pointsTableArray }));
  };

  const handlePressedServeOrReception = (serveOrReception) => {
    // If opponentServer "R" was pressed
    // Else if teamAnalyzed serverd "S" was pressed
    console.log(`serveOrReception: ${serveOrReception}`);
    setOpponentServed(serveOrReception == "R");
    setSwipePadServeIsActive(serveOrReception == "S");
    setSwipePadReceptionIsActive(serveOrReception == "R");
  };

  // Determine which component to render
  const renderSwipePad = () => {
    if (padVisible) {
      return (
        <SwipePadWhiteCircle
          styleVwMainPosition={styleVwMainPosition}
          swipeColorDict={swipeColorDict}
          swipeTextStyleDict={swipeTextStyleDict}
          numTrianglesMiddle={numTrianglesMiddle}
          numTrianglesOuter={numTrianglesOuter}
        />
      );
      // if (swipePadServeIsActive) {
      //   return (
      //     <SwipePadServe
      //       styleVwMainPosition={styleVwMainPosition}
      //       swipeColorDict={swipeColorDict}
      //       swipeTextStyleDict={swipeTextStyleDict}
      //       numTrianglesMiddle={numTrianglesMiddle}
      //       numTrianglesOuter={numTrianglesOuter}
      //     />
      //   );
      // } else if (swipePadReceptionIsActive) {
      //   return (
      //     <SwipePadReception
      //       styleVwMainPosition={styleVwMainPosition}
      //       swipeColorDict={swipeColorDict}
      //       swipeTextStyleDict={swipeTextStyleDict}
      //       numTrianglesMiddle={numTrianglesMiddle}
      //       numTrianglesOuter={numTrianglesOuter}
      //     />
      //   );
      // }
      // // if (padVisible) {
      // else {
      //   return (
      //     <SwipePad
      //       styleVwMainPosition={styleVwMainPosition}
      //       swipeColorDict={swipeColorDict}
      //       swipeTextStyleDict={swipeTextStyleDict}
      //       numTrianglesMiddle={numTrianglesMiddle}
      //       numTrianglesOuter={numTrianglesOuter}
      //     />
      //   );
      // }
    }
    // return null; // Nothing renders if all are false
  };

  const sendScript = async () => {
    console.log("send script");
    // console.log(JSON.stringify(scriptReducer.actionsArray));
    console.log(JSON.stringify(tempActionsArray));

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/scripts/receive-actions-array`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userReducer.token}`,
        },
        body: JSON.stringify({
          matchId: 1,
          // actionsArray: scriptReducer.actionsArray,
          actionsArray: tempActionsArray,
        }),
      }
    );
    if (response.status !== 200) {
      // console.log(`There was a server error: ${response.status}`);
      alert(`There was a server error: ${response.status}`);
      return;
    }

    dispatch(deleteScript());
    let resJson = null;
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      resJson = await response.json();
      alert(resJson.message);
    }
  };

  return orientation == "landscape" ? (
    // ------ LANDSCAPE ---------
    <View style={{ flex: 1 }}>
      {/* <View style={{ position: "absolute", right: 0, bottom: 10, width: 350 }}>
        <Text>
          gestureViewCoords X: {Math.round(gestureViewCoords.x)}, Y:
          {Math.round(gestureViewCoords.y)} width:{" "}
          {Math.round(gestureViewCoords.width)}, height:
          {Math.round(gestureViewCoords.height)}
        </Text>
      </View> */}
      <ScriptingLandscapeLive
        handleSetCirclePress={handleSetCirclePress}
        setsTeamAnalyzed={setsTeamAnalyzed}
        setScoreTeamAnalyzed={setScoreTeamAnalyzed}
        scoreTeamAnalyzed={scoreTeamAnalyzed}
        setScoreTeamOpponent={setScoreTeamOpponent}
        scoreTeamOpponent={scoreTeamOpponent}
        setsTeamOpponent={setsTeamOpponent}
        stdPickerStyle={stdPickerStyleLandscape}
        setRotation={setRotation}
        rotation={rotation}
        setQuality={setQuality}
        quality={quality}
        positionalArea={positionalArea}
        setPositionalArea={setPositionalArea}
        // setPosition={setPosition}
        // position={position}
        truncateArrayElements={truncateArrayElements}
        stdTruncatePlayerNameLength={stdTruncatePlayerNameLength}
        setPlayerName={setPlayerName}
        playerName={playerName}
        setType={setType}
        type={type}
        setSubtype={setSubtype}
        subtype={subtype}
        combinedGestures={combinedGestures}
        setGestureViewCoords={setGestureViewCoords}
        handleChangeType={handleChangeType}
        handleChangeSubtype={handleChangeSubtype}
        handleChangeQuality={handleChangeQuality}
        handleWinRallyButtonPress={handleWinRallyButtonPress}
        handlePressedServeOrReception={handlePressedServeOrReception}
        stdLengthOfPositionLines={stdLengthOfPositionLines}
        stdColorOfPositionLines={stdColorOfPositionLines}
        setStdColorOfPositionLines={setStdColorOfPositionLines}
        stdWidthOfPoistionLines={stdWidthOfPoistionLines}
        stdStyleOfPositionLines={stdStyleOfPositionLines}
        sendScript={sendScript}
      />
      {renderSwipePad()}
      {/* {padVisible && (
        <SwipePad
          styleVwMainPosition={styleVwMainPosition}
          swipeColorDict={swipeColorDict}
          numTrianglesMiddle={numTrianglesMiddle}
          numTrianglesOuter={numTrianglesOuter}
          swipeTextStyleDict={swipeTextStyleDict}
        />
      )} */}
    </View>
  ) : (
    <View
      style={{ flex: 1, marginTop: 0 }}
      // onLayout={(event) => handleVwScriptingPortraitLiveParent(event)}
    >
      {/* <View
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
          onPress={() => {
            console.log(" going to SwipePad Settings");
            navigation.navigate("SwipePadSettings", {
              numTrianglesMiddle: numTrianglesMiddle,
              numTrianglesOuter: numTrianglesOuter,
              demoOption: demoOption,
              swipeColorDict: swipeColorDict,
              // defaultColors: defaultColors,
              swipeTextStyleDict: swipeTextStyleDict,
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
      </View> */}
      <ScriptingPortraitLive
        navigation={navigation}
        stdPickerStyle={stdPickerStylePortrait}
        setSetsTeamAnalyzed={setSetsTeamAnalyzed}
        setsTeamAnalyzed={setsTeamAnalyzed}
        setScoreTeamAnalyzed={setScoreTeamAnalyzed}
        scoreTeamAnalyzed={scoreTeamAnalyzed}
        setScoreTeamOpponent={setScoreTeamOpponent}
        scoreTeamOpponent={scoreTeamOpponent}
        setSetsTeamOpponent={setSetsTeamOpponent}
        setsTeamOpponent={setsTeamOpponent}
        setRotation={setRotation}
        rotation={rotation}
        setQuality={setQuality}
        quality={quality}
        // setPosition={setPosition}
        // position={position}
        setPositionalArea={setPositionalArea}
        positionalArea={positionalArea}
        truncateArrayElements={truncateArrayElements}
        stdTruncatePlayerNameLength={stdTruncatePlayerNameLength}
        setPlayerName={setPlayerName}
        playerName={playerName}
        setType={setType}
        type={type}
        setSubtype={setSubtype}
        subtype={subtype}
        combinedGestures={combinedGestures}
        setGestureViewCoords={setGestureViewCoords}
        gestureViewCoords={gestureViewCoords}
        handleChangeType={handleChangeType}
        handleChangeSubtype={handleChangeSubtype}
        handleChangeQuality={handleChangeQuality}
        handleWinRallyButtonPress={handleWinRallyButtonPress}
        handlePressedServeOrReception={handlePressedServeOrReception}
        setStdColorOfPositionLines={setStdColorOfPositionLines}
        sendScript={sendScript}
      />

      {/* Conditional rendering */}
      {renderSwipePad()}
      {/* {padVisible &&
        (opponentServed ? (
          <SwipePadReception
            styleVwMainPosition={styleVwMainPosition}
            swipeColorDict={swipeColorDict}
            swipeTextStyleDict={swipeTextStyleDict}
            numTrianglesMiddle={numTrianglesMiddle}
            numTrianglesOuter={numTrianglesOuter}
          />
        ) : (
          <SwipePad
            styleVwMainPosition={styleVwMainPosition}
            swipeColorDict={swipeColorDict}
            swipeTextStyleDict={swipeTextStyleDict}
            numTrianglesMiddle={numTrianglesMiddle}
            numTrianglesOuter={numTrianglesOuter}
          />
        ))} */}
      {/*Top Left Position Lines P4 */}
      {/* <Text
        style={{
          position: "absolute",
          top: gestureViewCoords.y - 20,
          left: gestureViewCoords.x,
          // width: stdLengthOfPositionLines,
        }}
      >
        {gestureViewCoords.y}
      </Text> */}
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          left: gestureViewCoords.x,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          left: gestureViewCoords.x,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      {/* TOP Center Position Lines P4-P3 */}
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          left:
            gestureViewCoords.x +
            gestureViewCoords.width / 3 -
            stdLengthOfPositionLines,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          left: gestureViewCoords.x + gestureViewCoords.width / 3,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          left: gestureViewCoords.x + gestureViewCoords.width / 3,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      {/* TOP Center Position Lines P3-P2 */}
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          left:
            gestureViewCoords.x +
            gestureViewCoords.width * (2 / 3) -
            stdLengthOfPositionLines,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          left: gestureViewCoords.x + gestureViewCoords.width * (2 / 3),
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          left: gestureViewCoords.x + gestureViewCoords.width * (2 / 3),
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      {/*Top Right Position Lines P2 */}
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          left:
            gestureViewCoords.x +
            gestureViewCoords.width -
            stdLengthOfPositionLines,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y,
          left: gestureViewCoords.x + gestureViewCoords.width,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      {/*Middle Left Position Lines P4-P5 */}
      <View
        style={{
          position: "absolute",
          top:
            gestureViewCoords.y +
            gestureViewCoords.height / 2 -
            stdLengthOfPositionLines,
          left: gestureViewCoords.x,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height / 2,
          left: gestureViewCoords.x,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height / 2,
          left: gestureViewCoords.x,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />

      {/*Middle Left Position Lines P4-P3-P5-P6 */}
      <View
        style={{
          position: "absolute",
          top:
            gestureViewCoords.y +
            gestureViewCoords.height / 2 -
            stdLengthOfPositionLines,
          left: gestureViewCoords.x + gestureViewCoords.width / 3,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height / 2,
          left: gestureViewCoords.x + gestureViewCoords.width / 3,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height / 2,
          left: gestureViewCoords.x + gestureViewCoords.width / 3,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height / 2,
          left:
            gestureViewCoords.x +
            gestureViewCoords.width / 3 -
            stdLengthOfPositionLines,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      {/*Middle Left Position Lines P3-P2-P6-P1 */}
      <View
        style={{
          position: "absolute",
          top:
            gestureViewCoords.y +
            gestureViewCoords.height / 2 -
            stdLengthOfPositionLines,
          left: gestureViewCoords.x + gestureViewCoords.width * (2 / 3),
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height / 2,
          left: gestureViewCoords.x + gestureViewCoords.width * (2 / 3),
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height / 2,
          left: gestureViewCoords.x + gestureViewCoords.width * (2 / 3),
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height / 2,
          left:
            gestureViewCoords.x +
            gestureViewCoords.width * (2 / 3) -
            stdLengthOfPositionLines,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      {/*Middle Right Position Lines P2-P1 */}
      <View
        style={{
          position: "absolute",
          top:
            gestureViewCoords.y +
            gestureViewCoords.height / 2 -
            stdLengthOfPositionLines,
          left: gestureViewCoords.x + gestureViewCoords.width,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height / 2,
          left:
            gestureViewCoords.x +
            gestureViewCoords.width -
            stdLengthOfPositionLines,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height / 2,
          left: gestureViewCoords.x + gestureViewCoords.width,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      {/*Bottom Left Position Lines P5*/}
      <View
        style={{
          position: "absolute",
          top:
            gestureViewCoords.y +
            gestureViewCoords.height -
            stdLengthOfPositionLines,
          left: gestureViewCoords.x,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height,
          left: gestureViewCoords.x,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />

      {/* Bottom Center Position Lines P5-P6 */}
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height,
          left:
            gestureViewCoords.x +
            gestureViewCoords.width / 3 -
            stdLengthOfPositionLines,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top:
            gestureViewCoords.y +
            gestureViewCoords.height -
            stdLengthOfPositionLines,
          left: gestureViewCoords.x + gestureViewCoords.width / 3,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height,
          left: gestureViewCoords.x + gestureViewCoords.width / 3,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      {/* Bottom Center Position Lines P6-P1 */}
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height,
          left:
            gestureViewCoords.x +
            gestureViewCoords.width * (2 / 3) -
            stdLengthOfPositionLines,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top:
            gestureViewCoords.y +
            gestureViewCoords.height -
            stdLengthOfPositionLines,
          left: gestureViewCoords.x + gestureViewCoords.width * (2 / 3),
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height,
          left: gestureViewCoords.x + gestureViewCoords.width * (2 / 3),
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      {/*Bottom Right Position Lines P1 */}
      <View
        style={{
          position: "absolute",
          top: gestureViewCoords.y + gestureViewCoords.height,
          left:
            gestureViewCoords.x +
            gestureViewCoords.width -
            stdLengthOfPositionLines +
            stdWidthOfPoistionLines,
          width: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      <View
        style={{
          position: "absolute",
          top:
            gestureViewCoords.y +
            gestureViewCoords.height -
            stdLengthOfPositionLines +
            stdWidthOfPoistionLines,
          left: gestureViewCoords.x + gestureViewCoords.width,
          height: stdLengthOfPositionLines,
          borderColor: stdColorOfPositionLines,
          borderWidth: stdWidthOfPoistionLines,
          borderStyle: stdStyleOfPositionLines,
        }}
      />
      {/* ---- For Testing Only ---- */}
      {process.env.EXPO_PUBLIC_ENVIRONMENT === "workstation" && (
        <View />
        // <View
        //   style={{
        //     position: "absolute",
        //     bottom: 10,
        //     left: 10,
        //     padding: 10,
        //   }}
        // >
        //   <Text>
        //     scriptReducer.pointsTableArray:{" "}
        //     {scriptReducer.pointsTableArray.length}
        //   </Text>
        //   <Text>
        //     timestamp:{" "}
        //     {scriptReducer.pointsTableArray.length > 0
        //       ? scriptReducer.pointsTableArray[
        //           scriptReducer.pointsTableArray.length - 1
        //         ].pointId
        //       : "no points"}
        //   </Text>
        //   <Text>
        //     setNumbrer:{" "}
        //     {scriptReducer.pointsTableArray.length > 0
        //       ? scriptReducer.pointsTableArray[
        //           scriptReducer.pointsTableArray.length - 1
        //         ].setNumber
        //       : "no points"}
        //   </Text>
        //   <Text>
        //     opponentServed:{" "}
        //     {scriptReducer.pointsTableArray.length > 0
        //       ? scriptReducer.pointsTableArray[
        //           scriptReducer.pointsTableArray.length - 1
        //         ].opponentServed
        //         ? "true"
        //         : "false"
        //       : "null"}
        //   </Text>
        //   <Text>scoreTeamAnalyzed: {scoreTeamAnalyzed}</Text>
        // </View>
        // <View
        //   style={{
        //     position: "absolute",
        //     bottom: 10,
        //     left: 10,
        //     padding: 10,
        //   }}
        // >
        //   <Text>actions saved: {scriptReducer.actionsArray.length}</Text>
        //   <Text>
        //     timestamp:{" "}
        //     {scriptReducer.actionsArray.length > 0
        //       ? scriptReducer.actionsArray[
        //           scriptReducer.actionsArray.length - 1
        //         ].timeStamp.substring(11, 25)
        //       : "no actions"}
        //   </Text>
        //   <Text>
        //     type:{" "}
        //     {scriptReducer.actionsArray.length > 0
        //       ? scriptReducer.actionsArray[
        //           scriptReducer.actionsArray.length - 1
        //         ].type
        //       : "no actions"}
        //   </Text>
        //   <Text>
        //     subtype:{" "}
        //     {scriptReducer.actionsArray.length > 0
        //       ? scriptReducer.actionsArray[
        //           scriptReducer.actionsArray.length - 1
        //         ].subtype
        //       : "no actions"}
        //   </Text>
        //   <Text>
        //     quality:{" "}
        //     {scriptReducer.actionsArray.length > 0
        //       ? scriptReducer.actionsArray[
        //           scriptReducer.actionsArray.length - 1
        //         ].quality
        //       : "no actions"}
        //   </Text>
        // </View>
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

import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Modal,
  Animated,
  Pressable,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import * as ScreenOrientation from "expo-screen-orientation";
import TemplateView from "./subcomponents/TemplateView";
import { Gesture } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import Timeline from "./subcomponents/Timeline";
import { useEventListener } from "expo";
import ScriptingPortraitVideo from "./subcomponents/ScriptingPortraitVideo";
import ScriptingLandscapeVideo from "./subcomponents/ScriptingLandscapeVideo";
import SwipePad from "./subcomponents/swipePads/SwipePad";
import SwipePadReception from "./subcomponents/swipePads/SwipePadReception";
import SwipePadServe from "./subcomponents/swipePads/SwipePadServe";
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

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ButtonKvImage from "./subcomponents/ButtonKvImage";
import ButtonKv from "./subcomponents/ButtonKv";

const table01data = {
  User41: "Ted",
  User42: "Sarah",
  User56: "Jeremy",
  User62: "Melody",
};
const table02data = ["Lea", "Odeyssa", "Yoann", "Johanne"];
const table03data = ["Def", "Set", "Att"];
const table04data = ["DefSub", "SetSub", "AttSub"];
const setOptions = [0, 1, 2, 3];
const scoreOptions = Array.from({ length: 26 }, (_, i) => i);

export default function Scripting({ navigation, route }) {
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
  // timeline
  const [progress, setProgress] = useState(0);

  // orientation
  const [orientation, setOrientation] = useState("portrait");

  // Dynamic Styles
  const containerDynamic = {
    width:
      orientation == "landscape"
        ? userReducer.portraitHeight
        : userReducer.portraitWidth,
    // width: 200,
    height:
      orientation == "landscape"
        ? userReducer.portraitWidth
        : userReducer.portraitHeight,
    flexDirection: orientation == "landscape" ? "row" : "column",
  };

  // scripting
  const [currentAction, setCurrentAction] = useState({});
  const [isDeleteScriptModalVisible, setIsDeleteScriptModalVisible] =
    useState(false);

  // New 2025-02-14
  // Belongs to Set Team Analyzed SinglePickerWithSideBorders
  // const [setsTeamAnalyzed, setSetsTeamAnalyzed] = useState(0);
  // // Belongs to Score Team Analyzed SinglePickerWithSideBorders
  // const [scoreTeamAnalyzed, setScoreTeamAnalyzed] = useState(0);
  // // Belongs to Score Team Opponentn SinglePickerWithSideBorders
  // const [scoreTeamOpponent, setScoreTeamOpponent] = useState(0);
  // const [setsTeamOpponent, setSetsTeamOpponent] = useState(0);
  // // Belongs to positional formation SinglePickerWithSideBorders
  // const [rotation, setRotation] = useState("P1");
  // const [quality, setQuality] = useState(0);
  // const [position, setPosition] = useState(1);
  // const [playerName, setPlayerName] = useState(table02data[0]);
  // const [type, setType] = useState(table03data[0]);
  // const [subtype, setSubtype] = useState(table04data[0]);
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
    scriptReducer.playerNamesArrayRotated[0]
  );
  const [type, setType] = useState(scriptReducer.typesArray[0]);
  const [subtype, setSubtype] = useState(scriptReducer.subtypesArray[0]);
  // const stdPickerStylePortrait = {
  //   color: "white",
  //   fontSize: 25,
  //   backgroundColor: "#310732",
  //   itemHeight: 60,
  //   width: 40,
  //   borderRadius: 15,
  // };
  // const stdPickerStyleLandscape = {
  //   color: "white",
  //   fontSize: 20,
  //   backgroundColor: "#310732",
  //   itemHeight: 40,
  //   width: 40,
  //   borderRadius: 15,
  // };
  // const truncateArrayElements = (arr, maxLength) => {
  //   return arr.map((item) =>
  //     item.length > maxLength ? item.substring(0, maxLength) : item
  //   );
  // };

  // END New 2025-02-14

  useEffect(() => {
    // setStartTime(userReducer.video.setTimeStampsArray[currentSet]);
    // setEndTime(userReducer.video.setTimeStampsArray[currentSet + 1]);

    // if (Platform.OS === "android") {
    ScreenOrientation.unlockAsync();
    checkOrientation();
    const subscriptionScreenOrientation =
      ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    return () => {
      subscriptionScreenOrientation.remove();
      ScreenOrientation.lockAsync();
    };
    // }
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
  // const checkOrientation = async () => {
  //   // console.log("in checkOrientation");
  //   const orientation = await ScreenOrientation.getOrientationAsync();
  //   // console.log(`orientation is ${orientation}`);
  //   if (
  //     o.orientationInfo.orientation == 4 ||
  //     o.orientationInfo.orientation == 3
  //   ) {
  //     setOrientation("landscape");
  //   } else {
  //     setOrientation("portrait");
  //   }
  // };
  // const handleOrientationChange = async (o) => {
  //   // console.log(
  //   //   `o.orientationInfo.orientation: ${o.orientationInfo.orientation}`
  //   // );
  //   setOrientation(o.orientationInfo.orientation);
  //   if (
  //     o.orientationInfo.orientation == 4 ||
  //     o.orientationInfo.orientation == 3
  //   ) {
  //     setOrientation("landscape");
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  //     );
  //   } else {
  //     setOrientation("portrait");
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.PORTRAIT_UP
  //     );
  //   }
  // };

  // const changeScreenOrientation = async () => {
  //   if (orientation == "landscape") {
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.PORTRAIT_UP
  //     );
  //     setOrientation("portrait");
  //   } else if (orientation == "portrait") {
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  //     );
  //     setOrientation("landscape");
  //   }
  // };

  // ------ Video Stuff --------
  // Remove "file://" prefix from the URI string
  const videoSource = route.params.videoUri.startsWith("file://")
    ? route.params.videoUri.replace("file://", "")
    : route.params.videoUri;
  // Player Stuff
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.timeUpdateEventInterval = 1; // Update every second
    player.play();
  });

  const setCurrentTimeManager = (timeToSet) => {
    player.currentTime = timeToSet;
  };

  const handleSetSelection = (index) => {
    setCurrentSet(index);
    player.currentTime = userReducer.video.setTimeStampsArray[index];
  };

  const playerPausePlay = () => {
    if (!player.playing) {
      player.play();
    } else {
      player.pause();
    }
  };
  const playerGoToAction = (direction = "next") => {
    // Get the current time of the player
    const currentTime = player.currentTime;

    // Determine the action based on the direction
    let targetAction;
    if (direction === "next") {
      // Find the next action with a timeStamp greater than the current time
      targetAction = scriptReducerActionArray.find(
        (action) => action.timeStamp > currentTime + 0.001
      );
    } else if (direction === "previous") {
      // Find the previous action with a timeStamp less than or equal to the current time
      targetAction = [...scriptReducerActionArray]
        .reverse()
        .find((action) => action.timeStamp <= currentTime);
    }

    // If a valid action is found, set the player's current time to that timeStamp
    if (targetAction) {
      console.log(
        `Moving to ${direction} action with timeStamp: ${targetAction.timeStamp}`
      );
      player.currentTime = targetAction.timeStamp;
    } else {
      console.log(`No ${direction} action found.`);
    }
  };

  // Modifs V2
  useEventListener(player, "timeUpdate", (payload) => {
    // console.log("useVideoPlayer status changed: ", payload.currentTime);

    const currentTime = player.currentTime;

    // Update the progress relative to the current set
    setProgress(currentTime / player.duration);

    if (scriptReducerActionArray.length === 0) {
      setCurrentAction(null); // If the array is empty, set currentAction to null
    } else {
      let actionFound = false; // Flag to track if a valid action is found
      for (let i = scriptReducer.actionsArray.length - 1; i >= 0; i--) {
        if (scriptReducer.actionsArray[i].timeStamp < player.currentTime) {
          setCurrentAction(scriptReducer.actionsArray[i]); // Set currentAction to the found action
          actionFound = true;
          break; // Exit the loop as soon as we find the desired element
        }
      }
      if (!actionFound) {
        setCurrentAction(null); // If no valid action is found, set currentAction to null
      }
    }
  });
  //// #####################################
  /// --- NEW Scripting with SwipePad ------
  //// #####################################
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

  const determineTapPlayer = (x, y) => {
    if (y < gestureViewCoords.height / 2 && x < gestureViewCoords.width / 3) {
      // P4 ; array postion 3
      setPlayerName(scriptReducer.playerNamesArrayRotated[3]);
      setPositionalArea(scriptReducer.positionalAreasArray[3]);
    } else if (
      y < gestureViewCoords.height / 2 &&
      x < gestureViewCoords.width * (2 / 3)
    ) {
      // P3 ; array postion 2
      setPlayerName(scriptReducer.playerNamesArrayRotated[2]);
      setPositionalArea(scriptReducer.positionalAreasArray[2]);
    } else if (y < gestureViewCoords.height / 2) {
      // P2 ; array postion 1
      setPlayerName(scriptReducer.playerNamesArrayRotated[1]);
      setPositionalArea(scriptReducer.positionalAreasArray[1]);
    } else if (x < gestureViewCoords.width / 3) {
      // P5 ; array postion 4
      setPlayerName(scriptReducer.playerNamesArrayRotated[4]);
      setPositionalArea(scriptReducer.positionalAreasArray[4]);
    } else if (x < gestureViewCoords.width * (2 / 3)) {
      // P6 ; array postion 5
      setPlayerName(scriptReducer.playerNamesArrayRotated[5]);
      setPositionalArea(scriptReducer.positionalAreasArray[5]);
    } else {
      // P1 ; array postion 0
      setPlayerName(scriptReducer.playerNamesArrayRotated[0]);
      setPositionalArea(scriptReducer.positionalAreasArray[0]);
    }
  };

  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    if (tapIsActive) {
      const timestamp = new Date().toISOString();
      const { x, y, absoluteX, absoluteY } = event;
      // console.log(`x: ${x}, y:${y}`);
      const padPosCenterX = calculatePadPositionCenter(absoluteX, absoluteY).x;
      const padPosCenterY = calculatePadPositionCenter(absoluteX, absoluteY).y;
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
      determineTapPlayer(x, y);

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

    if (distanceFromCenter > userReducer.circleRadiusInner) {
      addNewActionToScriptReducersActionsArray({
        type: currentActionType,
        subtype: currentActionSubtype,
      });
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
        if (relativeToPadCenterX > boundary75X) {
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Def
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        } else if (Math.abs(relativeToPadCenterX) < boundary75X) {
          wheelPositionOuter = 8;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Def
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        } else {
          wheelPositionOuter = 9;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Def
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        }
      }
    } else if (relativeToPadCenterY > boundary45Y) {
      // Left
      wheelPositionMiddle = 3;
      handleSwipeColorChange(wheelPositionMiddle);
      setCurrentActionType(scriptReducer.typesArray[wheelPositionMiddle - 1]); // Set
      setCurrentActionSubtype("");
      if (!inMiddleCircle) {
        wheelPositionOuter = 10;
        if (relativeToPadCenterY > Math.abs(boundary15Y)) {
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Set
          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        } else if (relativeToPadCenterY > boundary15Y) {
          wheelPositionOuter = 11;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Set

          setCurrentActionSubtype(
            scriptReducer.subtypesArray[wheelPositionOuter - 5]
          );
        } else {
          wheelPositionOuter = 12;
          handleSwipeColorChange(wheelPositionMiddle, wheelPositionOuter);
          setCurrentActionType(
            scriptReducer.typesArray[wheelPositionMiddle - 1]
          ); // Set
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
      setSwipeColorDict(userReducer.defaultWheelColors);
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
    setSwipePadServeIsActive(false);
    setSwipePadReceptionIsActive(false);
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
      if (swipePadServeIsActive) {
        return (
          <SwipePadServe
            styleVwMainPosition={styleVwMainPosition}
            swipeColorDict={swipeColorDict}
            swipeTextStyleDict={swipeTextStyleDict}
            numTrianglesMiddle={numTrianglesMiddle}
            numTrianglesOuter={numTrianglesOuter}
          />
        );
      } else if (swipePadReceptionIsActive) {
        return (
          <SwipePadReception
            styleVwMainPosition={styleVwMainPosition}
            swipeColorDict={swipeColorDict}
            swipeTextStyleDict={swipeTextStyleDict}
            numTrianglesMiddle={numTrianglesMiddle}
            numTrianglesOuter={numTrianglesOuter}
          />
        );
      }
      // if (padVisible) {
      else {
        return (
          <SwipePad
            styleVwMainPosition={styleVwMainPosition}
            swipeColorDict={swipeColorDict}
            swipeTextStyleDict={swipeTextStyleDict}
            numTrianglesMiddle={numTrianglesMiddle}
            numTrianglesOuter={numTrianglesOuter}
          />
        );
      }
    }
    // return null; // Nothing renders if all are false
  };
  //// #####################################
  /// ---- END New Scripting SwipePad ----
  //// #####################################

  // // ------ Scripting Gestures ------

  // const addNewActionToScriptReducersActionsArray = (actionPropertiesObj) => {
  //   // const updateScriptReducerActionsArray = (actionPropertiesObj) => {

  //   const newActionObj = {
  //     dateScripted: new Date().toISOString(), // Convert to ISO string
  //     timeStamp: player.currentTime,
  //     type: actionPropertiesObj.type,
  //     subType: "tap - sub",
  //     quality: 0,
  //     playerId: "Player 1",
  //     scriptId: scriptReducer.scriptId,
  //     newAction: true,
  //   };

  //   console.log(`adding new action with timeStamp = ${newActionObj.timeStamp}`);
  //   // updateScriptReducerActionsArray(newActionObj);

  //   // create new array with
  //   let newScriptReducerActionArray = [
  //     ...scriptReducer.actionsArray,
  //     newActionObj,
  //   ];
  //   // sort
  //   newScriptReducerActionArray.sort((a, b) => a.timeStamp - b.timeStamp);
  //   dispatch(
  //     replaceScriptActionArray({ actionsArray: newScriptReducerActionArray })
  //   );

  //   // dispatch(appendAction({ newActionObj }));
  //   if (scriptReducerActionArray.length > 0) {
  //     setScriptReducerActionArray([...scriptReducerActionArray, newActionObj]);
  //   } else {
  //     setScriptReducerActionArray([newActionObj]);
  //   }
  // };

  // // Gesture handling: Pan gesture for swipe detection
  // const gestureSwipeScripting = Gesture.Pan().onEnd((event) => {
  //   const { translationX, translationY } = event;
  //   const script = {
  //     script: "",
  //     timeStamp: "",
  //   };
  //   // const tempScriptArray = scriptArray;
  //   if (Math.abs(translationX) > Math.abs(translationY)) {
  //     if (translationX > 0) {
  //       script.script = "right";
  //       script.timeStamp = player.currentTime;
  //       // addActionToScript({ type: "swipe-right" });
  //       addNewActionToScriptReducersActionsArray({ type: "swipe-right" });
  //     } else {
  //       script.script = "left";
  //       script.timeStamp = player.currentTime;

  //       addNewActionToScriptReducersActionsArray({ type: "swipe-left" });
  //     }
  //   } else {
  //     if (translationY > 0) {
  //       script.script = "down";
  //       script.timeStamp = player.currentTime;
  //       // Alert.alert("Swipe", `Swiped Down at ${player.currentTime}`);
  //       addNewActionToScriptReducersActionsArray({ type: "swipe-down" });
  //     } else {
  //       script.script = "up";
  //       script.timeStamp = player.currentTime;
  //       // Alert.alert("Swipe", `Swiped Up at ${player.currentTime}`);
  //       addNewActionToScriptReducersActionsArray({ type: "swipe-up" });
  //     }
  //   }
  //   // tempScriptArray.push(script);
  //   // setScriptArray(tempScriptArray);
  // });

  // // Tap ScriptingPortrait Mode
  // const gestureTapActionArea = Gesture.Tap().onEnd((event) => {
  //   console.log("tap registered");
  //   const actionObj = { type: "tap" };
  //   addNewActionToScriptReducersActionsArray(actionObj);
  // });

  // // Combine swipe and tap gestures
  // const combinedGesturesScripting = Gesture.Race(
  //   gestureSwipeScripting,
  //   // gestureTapScripting
  //   gestureTapActionArea
  // );

  // const changeQuality = (changeValue) => {
  //   if (!currentAction) return;

  //   const newQuality = Math.max(
  //     Math.min(currentAction.quality + changeValue, 2),
  //     -2
  //   );

  //   dispatch(
  //     updateQualityPropertyInObjectOfActionsArray({
  //       timeStamp: currentAction.timeStamp,
  //       quality: newQuality,
  //     })
  //   );
  // };

  // // Send Script to API
  // const handleBtnSendCurrentScriptToAPI = async () => {
  //   console.log("- in sendCurrentScriptToAPI");

  //   const sendActionsArray = [];

  //   // Use a single .map() to process both actions
  //   // scriptReducer.actionsArray.map((action, index) => {
  //   scriptReducerActionArray.map((action, index) => {
  //     if (action?.newAction) {
  //       sendActionsArray.push({ ...action }); // Add a copy of the object to sendActionsArray
  //       action.newAction = false; // Update the property to false
  //     }
  //   });

  //   const bodyObj = {
  //     scriptsArray: sendActionsArray,
  //     videoId: userReducer.video.id,
  //   };
  //   try {
  //     const response = await fetch(
  //       `${process.env.EXPO_PUBLIC_API_URL}/scripts`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${userReducer.token}`, // Add token to Authorization header
  //         },
  //         body: JSON.stringify(bodyObj),
  //       }
  //     );
  //     console.log("--> after fetch in sendCurrentScriptToAPI ");
  //     if (response.status === 200) {
  //       const resJson = await response.json();
  //       console.log(resJson);
  //       const tempScriptId = resJson.actionsArray[0].scriptId;
  //       dispatch(
  //         replaceScriptActionArray({
  //           actionsArray: resJson.actionsArray,
  //           scriptId: tempScriptId,
  //         })
  //       );
  //       setScriptId(tempScriptId);
  //       window.alert(`Successfully registered actions to API`);
  //     } else {
  //       console.log(
  //         `There was a server error (handleBtnSendCurrentScriptToAPI) : ${response.status}`
  //       );
  //       window.alert(
  //         `Failed to  register actions to API, error: ${response.status}`
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //     window.alert("An error occurred while sending the request.");
  //   }
  // };

  // // Delete script
  // const handleBtnDeleteScript = async () => {
  //   console.log("deleteScript");
  //   console.log(
  //     `fetching ${process.env.EXPO_PUBLIC_API_URL}/scripts/${scriptReducer.scriptId}`
  //   );
  //   const response = await fetch(
  //     `${process.env.EXPO_PUBLIC_API_URL}/scripts/${scriptReducer.scriptId}`,
  //     {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${userReducer.token}`, // Add token to Authorization header
  //       },
  //     }
  //   );
  //   if (response.status === 200) {
  //     const resJson = await response.json();
  //     console.log(resJson);

  //     dispatch(deleteScript());
  //     setScriptReducerActionArray([]);
  //     setIsDeleteScriptModalVisible(false);
  //     setScriptId(false);
  //   } else {
  //     console.log(`There was a server error: ${response.status}`);
  //   }
  // };

  const handleBackPress = async (navigation) => {
    player.pause();
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    navigation.goBack();
  };

  // console.log(`before jsx orientation: ${orientation}`);
  // if (Platform.OS === "android") {
  return orientation == "landscape" ? (
    // ------ LANDSCAPE ---------
    <View style={[styles.container, containerDynamic]}>
      <ScriptingLandscapeVideo
        player={player}
        progress={progress}
        setCurrentTimeManager={setCurrentTimeManager}
        timelineWidth={400}
        handleSetSelection={handleSetSelection}
        combinedGesturesScripting={combinedGesturesScripting}
        navigation={navigation}
        scriptReducerActionArray={scriptReducerActionArray}
        playerGoToAction={playerGoToAction}
        playerPausePlay={playerPausePlay}
        changeScreenOrientation={changeScreenOrientation}
        scriptId={scriptId}
      />
    </View>
  ) : (
    // -------- PORTRAIT ------------

    // <TemplateView navigation={navigation} player={player}>
    <View style={{ flex: 1 }}>
      <View style={[styles.container, containerDynamic]}>
        <ScriptingPortraitVideo
          navigation={navigation}
          player={player}
          progress={progress}
          setCurrentTimeManager={setCurrentTimeManager}
          timelineWidth={300}
          handleSetSelection={handleSetSelection}
          scriptReducerActionArray={scriptReducerActionArray}
          // combinedGesturesScripting={combinedGesturesScripting}
          // handleBtnSendCurrentScriptToAPI={handleBtnSendCurrentScriptToAPI}
          setIsDeleteScriptModalVisible={setIsDeleteScriptModalVisible}
          playerGoToAction={playerGoToAction}
          playerPausePlay={playerPausePlay}
          // changeScreenOrientation={changeScreenOrientation}
          // scriptId={scriptId}
          // changeQuality={changeQuality}
          currentAction={currentAction}
          // -- new based on ScriptingLive --
          handleSetCirclePress={handleBackPress}
          setOptions={setOptions}
          setsTeamAnalyzed={setsTeamAnalyzed}
          setSetsTeamAnalyzed={setSetsTeamAnalyzed}
          scoreOptions={scoreOptions}
          setScoreTeamAnalyzed={setScoreTeamAnalyzed}
          scoreTeamAnalyzed={scoreTeamAnalyzed}
          setScoreTeamOpponent={setScoreTeamOpponent}
          scoreTeamOpponent={scoreTeamOpponent}
          setsTeamOpponent={setsTeamOpponent}
          setSetsTeamOpponent={setSetsTeamOpponent}
          stdPickerStyle={stdPickerStyleLandscape}
          setRotation={setRotation}
          rotation={rotation}
          setQuality={setQuality}
          quality={quality}
          // setPosition={setPosition}
          // position={position}
          // truncateArrayElements={truncateArrayElements}
          // table02data={table02data}
          // setPlayerName={setPlayerName}
          // playerName={playerName}
          // table03data={table03data}
          // setType={setType}
          // type={type}
          // setSubtype={setSubtype}
          // subtype={subtype}
          // table04data={table04data}
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
        />
      </View>
      {renderSwipePad()}
      <Modal
        transparent
        visible={isDeleteScriptModalVisible}
        animationType="fade"
      >
        <View style={styles.modalDownloadBackdrop}>
          <View style={styles.downloadModal}>
            <View style={styles.vwModalButtonKvImage}>
              <ButtonKvImage
                onPress={() => setIsDeleteScriptModalVisible(false)}
              >
                <FontAwesomeIcon icon={faX} />
              </ButtonKvImage>
            </View>
            <Text style={styles.modalText}>
              Are you sure you want to delete?
            </Text>
            <ButtonKv
              colorBackground={"red"}
              width={70}
              onPress={() => handleBtnDeleteScript()}
            >
              Yes
            </ButtonKv>
          </View>
        </View>
      </Modal>
    </View>
    // </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
    justifyContent: "center",
  },

  // Modal styles Download
  modalDownloadBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  downloadModal: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  vwModalButtonKvImage: {
    // backgroundColor: "green",
    width: "100%",
    // justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

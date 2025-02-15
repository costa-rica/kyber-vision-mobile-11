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
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import Timeline from "./subcomponents/Timeline";
import { useEventListener } from "expo";
import ScriptingPortraitVideo from "./subcomponents/ScriptingPortraitVideo";
import ScriptingLandscapeVideo from "./subcomponents/ScriptingLandscapeVideo";
import ScriptingPortraitVideoOBE from "./subcomponents/ScriptingPortraitVideoOBEbackup";
import {
  newScript,
  // appendAction,
  // logoutOfSessionScripts,
  deleteScript,
  replaceScriptActionArray,
  updatePropertyInObjectOfActionsArray,
} from "../reducers/script";
// import { userLoginSession } from "../reducers/user";
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
  const [scriptId, setScriptId] = useState(scriptReducer.scriptId);
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
  const [type, setType] = useState(table03data[0]);
  const [subtype, setSubtype] = useState(table04data[0]);
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
  const truncateArrayElements = (arr, maxLength) => {
    return arr.map((item) =>
      item.length > maxLength ? item.substring(0, maxLength) : item
    );
  };

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

  const changeScreenOrientation = async () => {
    if (orientation == "landscape") {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setOrientation("portrait");
    } else if (orientation == "portrait") {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
      setOrientation("landscape");
    }
  };

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

  // ------ Scripting Gestures ------

  const addNewActionToScriptReducersActionsArray = (actionPropertiesObj) => {
    // const updateScriptReducerActionsArray = (actionPropertiesObj) => {

    const newActionObj = {
      dateScripted: new Date().toISOString(), // Convert to ISO string
      timeStamp: player.currentTime,
      type: actionPropertiesObj.type,
      subType: "tap - sub",
      quality: 0,
      playerId: "Player 1",
      scriptId: scriptReducer.scriptId,
      newAction: true,
    };

    console.log(`adding new action with timeStamp = ${newActionObj.timeStamp}`);
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
  };

  // Gesture handling: Pan gesture for swipe detection
  const gestureSwipeScripting = Gesture.Pan().onEnd((event) => {
    const { translationX, translationY } = event;
    const script = {
      script: "",
      timeStamp: "",
    };
    // const tempScriptArray = scriptArray;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        script.script = "right";
        script.timeStamp = player.currentTime;
        // addActionToScript({ type: "swipe-right" });
        addNewActionToScriptReducersActionsArray({ type: "swipe-right" });
      } else {
        script.script = "left";
        script.timeStamp = player.currentTime;

        addNewActionToScriptReducersActionsArray({ type: "swipe-left" });
      }
    } else {
      if (translationY > 0) {
        script.script = "down";
        script.timeStamp = player.currentTime;
        // Alert.alert("Swipe", `Swiped Down at ${player.currentTime}`);
        addNewActionToScriptReducersActionsArray({ type: "swipe-down" });
      } else {
        script.script = "up";
        script.timeStamp = player.currentTime;
        // Alert.alert("Swipe", `Swiped Up at ${player.currentTime}`);
        addNewActionToScriptReducersActionsArray({ type: "swipe-up" });
      }
    }
    // tempScriptArray.push(script);
    // setScriptArray(tempScriptArray);
  });

  // Tap ScriptingPortrait Mode
  const gestureTapActionArea = Gesture.Tap().onEnd((event) => {
    console.log("tap registered");
    const actionObj = { type: "tap" };
    addNewActionToScriptReducersActionsArray(actionObj);
  });

  // Combine swipe and tap gestures
  const combinedGesturesScripting = Gesture.Race(
    gestureSwipeScripting,
    // gestureTapScripting
    gestureTapActionArea
  );

  const changeQuality = (changeValue) => {
    if (!currentAction) return;

    const newQuality = Math.max(
      Math.min(currentAction.quality + changeValue, 2),
      -2
    );

    dispatch(
      updatePropertyInObjectOfActionsArray({
        timeStamp: currentAction.timeStamp,
        quality: newQuality,
      })
    );
  };

  // Send Script to API
  const handleBtnSendCurrentScriptToAPI = async () => {
    console.log("- in sendCurrentScriptToAPI");

    const sendActionsArray = [];

    // Use a single .map() to process both actions
    // scriptReducer.actionsArray.map((action, index) => {
    scriptReducerActionArray.map((action, index) => {
      if (action?.newAction) {
        sendActionsArray.push({ ...action }); // Add a copy of the object to sendActionsArray
        action.newAction = false; // Update the property to false
      }
    });

    const bodyObj = {
      scriptsArray: sendActionsArray,
      videoId: userReducer.video.id,
    };
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/scripts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userReducer.token}`, // Add token to Authorization header
          },
          body: JSON.stringify(bodyObj),
        }
      );
      console.log("--> after fetch in sendCurrentScriptToAPI ");
      if (response.status === 200) {
        const resJson = await response.json();
        console.log(resJson);
        const tempScriptId = resJson.actionsArray[0].scriptId;
        dispatch(
          replaceScriptActionArray({
            actionsArray: resJson.actionsArray,
            scriptId: tempScriptId,
          })
        );
        setScriptId(tempScriptId);
        window.alert(`Successfully registered actions to API`);
      } else {
        console.log(
          `There was a server error (handleBtnSendCurrentScriptToAPI) : ${response.status}`
        );
        window.alert(
          `Failed to  register actions to API, error: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      window.alert("An error occurred while sending the request.");
    }
  };

  // Delete script
  const handleBtnDeleteScript = async () => {
    console.log("deleteScript");
    console.log(
      `fetching ${process.env.EXPO_PUBLIC_API_URL}/scripts/${scriptReducer.scriptId}`
    );
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/scripts/${scriptReducer.scriptId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userReducer.token}`, // Add token to Authorization header
        },
      }
    );
    if (response.status === 200) {
      const resJson = await response.json();
      console.log(resJson);

      dispatch(deleteScript());
      setScriptReducerActionArray([]);
      setIsDeleteScriptModalVisible(false);
      setScriptId(false);
    } else {
      console.log(`There was a server error: ${response.status}`);
    }
  };

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
          combinedGesturesScripting={combinedGesturesScripting}
          handleBtnSendCurrentScriptToAPI={handleBtnSendCurrentScriptToAPI}
          setIsDeleteScriptModalVisible={setIsDeleteScriptModalVisible}
          playerGoToAction={playerGoToAction}
          playerPausePlay={playerPausePlay}
          changeScreenOrientation={changeScreenOrientation}
          scriptId={scriptId}
          changeQuality={changeQuality}
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
          table03data={table03data}
          setType={setType}
          type={type}
          setSubtype={setSubtype}
          subtype={subtype}
          table04data={table04data}
        />
      </View>
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

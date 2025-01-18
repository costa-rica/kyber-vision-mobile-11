import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Timeline from "./Timeline";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import ButtonKvImage from "./ButtonKvImage";
import ButtonKv from "./ButtonKv";

export default function ScriptingPortraitVideo(props) {
  useEffect(() => {
    console.log("in ScriptingPortraitVideo useEffect");
  }, [props.scriptReducerActionArray, props.scriptId]);

  const viewLastAction = (
    <View style={styles.vwLastActionSub}>
      <View style={styles.vwLastActionSubBox}>
        <Text style={styles.txtVwLastActionSubBoxTitle}>Time</Text>
        <Text style={styles.txtVwLastActionSubBoxValue}>
          {props.currentAction &&
            Math.round(props.currentAction?.timeStamp * 10) / 10}
        </Text>
      </View>
      <View style={styles.vwLastActionSubBox}>
        <Text style={styles.txtVwLastActionSubBoxTitle}>Action:</Text>
        <Text style={styles.txtVwLastActionSubBoxValue}>
          {props.currentAction?.type}
        </Text>
      </View>
      <View style={styles.vwLastActionSubBox}>
        <Text style={styles.txtVwLastActionSubBoxTitle}>Quality:</Text>
        <Text style={styles.txtVwLastActionSubBoxValue}>
          {props.currentAction?.quality}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={styles.vwGestureAndVideo}>
        <GestureDetector
          style={styles.vwGestureDectorVideo}
          gesture={props.combinedGesturesScripting}
        >
          <VideoView
            style={styles.vwVideo}
            player={props.player}
            nativeControls={false}
          />
        </GestureDetector>
      </GestureHandlerRootView>
      <View style={styles.vwTimelineAndPlayerControls}>
        {/* Custom Timeline */}
        <GestureHandlerRootView style={styles.gestureViewTimeline}>
          <Timeline
            progress={props.progress}
            setCurrentTimeManager={props.setCurrentTimeManager}
            timelineWidth={props.timelineWidth}
            player={props.player}
            // scriptReducerActionArray={props.scriptReducerActionArray}
          />
        </GestureHandlerRootView>

        {/* Set Selection */}
        <View style={styles.vwControls}>
          <View style={styles.vwQuality}>
            <ButtonKvImage
              onPress={() => {
                props.changeQuality(-1);
              }}
            >
              <Image
                source={require("../../assets/images/btnQualityNegative.png")}
                alt="logo"
                resizeMode="contain"
              />
            </ButtonKvImage>
            <View style={styles.vwQuailtyValue}>
              <Text style={styles.txtVwQuailtyValue}>
                {props.currentAction?.quality}
              </Text>
            </View>
            <ButtonKvImage
              onPress={() => {
                props.changeQuality(1);
                // checkValue();
              }}
            >
              <Image
                source={require("../../assets/images/btnQualityPositive.png")}
                alt="logo"
                resizeMode="contain"
              />
            </ButtonKvImage>
          </View>
          <View style={styles.vwOtherControls}>
            {Platform.OS == "ios" && (
              <ButtonKvImage
                onPress={() => {
                  console.log("rotate screen to landscape");
                  props.changeScreenOrientation();
                }}
              >
                <FontAwesomeIcon icon={faRotate} size={20} />
              </ButtonKvImage>
            )}
            <TouchableOpacity
              style={styles.touchOpPlay}
              // onPress={() => props.playerGoToAction("previous")}
              onPress={() =>
                props.setCurrentTimeManager(props.player.currentTime - 2)
              }
            >
              <Image
                source={require("../../assets/images/videoBackArrow.png")}
                alt="logo"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.touchOpPlay}
              onPress={() => props.playerPausePlay()}
            >
              <Image
                source={
                  props.player.playing
                    ? require("../../assets/images/btnPause.png")
                    : require("../../assets/images/btnPlay.png")
                }
                alt="logo"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchOpPlay}
              // onPress={() => props.playerGoToAction("next")}
              onPress={() =>
                props.setCurrentTimeManager(props.player.currentTime + 10)
              }
            >
              <Image
                source={require("../../assets/images/videoForwardArrow.png")}
                alt="logo"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.vwSendScriptControls}>
            {/* {props.scriptReducerActionArray.length > 0 && ( */}
            <ButtonKv
              width={150}
              onPress={() => props.handleBtnSendCurrentScriptToAPI()}
            >
              Enregistrer actions
            </ButtonKv>
            {/* )} */}
            {/* {props.scriptId && ( */}
            <ButtonKv
              width={120}
              onPress={() => {
                props.setIsDeleteScriptModalVisible(true);
                // setCurrentActionsArray();
              }}
            >
              Supprimer actions
            </ButtonKv>
            {/* )} */}
          </View>
        </View>
      </View>
      <View style={styles.vwDisplayRecentAction}>
        <Text style={styles.txtDerniereAction}>Dernière action</Text>
        {viewLastAction}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(200,200,200,.9)",
  },
  vwGestureAndVideo: {
    // backgroundColor: "purple",
    width: "100%",
    height: 250, // Ensure fixed height for VideoView
  },
  vwVideo: {
    width: "100%",
    height: "100%", // Matches parent height
  },

  // --- Timeline ---
  gestureViewTimeline: {
    alignItems: "center",
  },

  // ---- vwControls ------
  vwControls: {
    // backgroundColor: "rgba(150,150,150,.9)",
    paddingTop: 20,
    gap: 20,
  },
  vwQuality: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  txtVwQuailtyValue: {
    fontSize: 30,
    fontFamily: "ApfelGrotezk",
  },
  vwOtherControls: {
    flexDirection: "row",
    // backgroundColor: "purple",
    alignItems: "center",
    justifyContent: "center",
  },
  vwSendScriptControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  // ------ Display Latest Action
  vwDisplayRecentAction: {
    // backgroundColor: "green",
    // flex: 1,
    // padding: 10,
    borderColor: "white",
    borderWidth: 2,
    margin: 5,
    borderRadius: 12,
  },
  txtDerniereAction: {
    fontSize: 20,
    textAlign: "center",
    // padding: 5,
    color: "white",
    fontFamily: "ApfelGrotezk",
  },
  vwLastActionSub: {
    flexDirection: "row",
    // gap: 5,
    justifyContent: "space-around",
  },
  vwLastActionSubBox: {
    // flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    gap: 10,
  },
  txtVwLastActionSubBoxTitle: {
    fontSize: 18,
    fontFamily: "ApfelGrotezk",
  },
  txtVwLastActionSubBoxValue: {
    fontSize: 24,
    color: "gray",
    fontFamily: "ApfelGrotezk",
  },
});

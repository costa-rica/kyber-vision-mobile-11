import { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEventListener } from "expo";
import * as ScreenOrientation from "expo-screen-orientation";
// import TemplateView from "./subcomponents/TemplateView";
import TemplateView from "./TemplateView";
import ButtonKv from "./ButtonKv";
import SwitchKv from "./SwitchKv";
import Timeline from "./Timeline";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";

export default function ReviewVideoPortrait(
  props
  //   {
  //   navigation,
  //   route,
  //   progress,
  //   player,
  //   setCurrentTimeManager,
  // }
) {
  const reviewReducer = useSelector((state) => state.review);
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={{ width: 100, height: 50 }}>
          <TouchableOpacity
            // style={styles.touchOpCircle}
            onPress={() => {
              props.handleBackPress();
            }}
          >
            <Image
              //style={{ width: 24, height: 24 }} // Adjust based on expected size
              source={require("../../assets/images/btnBackArrowWhite.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text>Review Video Portrait</Text>
      {/* Video */}
      <View style={styles.videoContainer}>
        <VideoView
          style={styles.vwVideo}
          player={props.player}
          // nativeControls={false}
        />
      </View>
      {/* Timeline */}
      <View style={{ width: Dimensions.get("window").width }}>
        <GestureHandlerRootView style={styles.gestureViewTimeline}>
          <Timeline
            videoProgress={props.progress}
            setCurrentTimeManager={props.setCurrentTimeManager}
          />
        </GestureHandlerRootView>
      </View>
      <View style={styles.containerBottom}>
        <Text>Actions</Text>
        {reviewReducer.reviewReducerActionsArray.map((action, index) => {
          if (action.isDisplayed) {
            return (
              <Text key={index}>
                {action.timestamp} :{action.type}
              </Text>
            );
          }
        })}
        {reviewReducer.reviewReducerListOfPlayerDbObjects &&
          reviewReducer.reviewReducerListOfPlayerDbObjects.map(
            (playerDbObject, index) => (
              <Text key={index}>{playerDbObject.firstName}</Text>
            )
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
  },
  containerTop: {
    borderWidth: 1,
    borderStyle: "dashed",
    flexDirection: "row",
    // justifyContent: "space-around",
    alignItems: "center",
  },
  videoContainer: {
    flex: 1,
    backgroundColor: "blue",
    height: 300,
    width: Dimensions.get("window").width,
  },
  vwVideo: {
    width: "100%",
    height: "100%", // Matches parent height
  },

  // --- Timeline ---
  gestureViewTimeline: {
    alignItems: "center",
  },
  containerBottom: {
    flex: 1,
    backgroundColor: "green",
  },
});

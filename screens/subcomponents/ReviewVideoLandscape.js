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

export default function ReviewVideoLandscape({
  navigation,
  route,
  progress,
  player,
  setCurrentTimeManager,
}) {
  return (
    <View style={styles.container}>
      <Text>Review Video</Text>
      <View style={styles.videoContainer}>
        <VideoView
          style={styles.vwVideo}
          player={player}
          // nativeControls={false}
        />
      </View>
      <View style={{ width: Dimensions.get("window").width }}>
        <GestureHandlerRootView style={styles.gestureViewTimeline}>
          <Timeline
            videoProgress={progress}
            setCurrentTimeManager={setCurrentTimeManager}
          />
        </GestureHandlerRootView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
  },
  videoContainer: {
    flex: 1,
    backgroundColor: "green",
  },
  vwVideo: {
    width: "100%",
    height: "100%", // Matches parent height
  },

  // --- Timeline ---
  gestureViewTimeline: {
    alignItems: "center",
  },
});

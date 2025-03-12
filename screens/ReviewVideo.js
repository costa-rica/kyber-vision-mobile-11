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
import TemplateView from "./subcomponents/TemplateView";
import ButtonKv from "./subcomponents/ButtonKv";
import SwitchKv from "./subcomponents/SwitchKv";
import Timeline from "./subcomponents/Timeline";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import ReviewVideoLandscape from "./subcomponents/ReviewVideoLandscape";

export default function ReviewVideo({ navigation, route }) {
  // Video progress state
  const [progress, setProgress] = useState(0);
  // orientation
  const [orientation, setOrientation] = useState("portrait");

  // // Dynamic Styles
  // const containerDynamic = {
  //   width:
  //     orientation == "landscape"
  //       ? userReducer.portraitHeight
  //       : userReducer.portraitWidth,
  //   // width: 200,
  //   height:
  //     orientation == "landscape"
  //       ? userReducer.portraitWidth
  //       : userReducer.portraitHeight,
  //   flexDirection: orientation == "landscape" ? "row" : "column",
  // };

  // useEffect(() => {
  //   // setStartTime(userReducer.video.setTimeStampsArray[currentSet]);
  //   // setEndTime(userReducer.video.setTimeStampsArray[currentSet + 1]);

  //   // if (Platform.OS === "android") {
  //   ScreenOrientation.unlockAsync();
  //   checkOrientation();
  //   const subscriptionScreenOrientation =
  //     ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

  //   return () => {
  //     subscriptionScreenOrientation.remove();
  //     ScreenOrientation.lockAsync();
  //   };
  //   // }
  // });

  useEffect(() => {
    return () => {
      player.pause();
    };
  }, []);

  const videoSource = route.params.videoUri.startsWith("file://")
    ? route.params.videoUri.replace("file://", "")
    : route.params.videoUri;
  // Player Stuff
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.timeUpdateEventInterval = 1; // Update every second
    player.play();
  });

  // useEffect(() => {
  //   fetch("http://192.168.1.128:3000/videos/stream/5")
  //     .then((res) => console.log("Response OK:", res.ok))
  //     .catch((err) => console.log("Fetch error:", err));
  // }, []);

  // Seek video
  const setCurrentTimeManager = (timeToSet) => {
    player.currentTime = timeToSet;
  };

  useEventListener(player, "timeUpdate", () => {
    setProgress(player.currentTime / player.duration);
  });

  return (
    <ReviewVideoLandscape
      navigation={navigation}
      route={route}
      progress={progress}
      player={player}
      setCurrentTimeManager={setCurrentTimeManager}
    />
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

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
import ReviewVideoPortrait from "./subcomponents/ReviewVideoPortrait";
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {
  filterReviewReducerActionsArrayOnPlayer,
  // updateReviewReducerIsPlayingforActionsArray,
  // setManuallySelectedAction,
  // updateReviewReducerIsPlayingforActionsArrayV4,
  pressedActionInReviewReducerActionArray,
  updateReviewReducerIsPlayingforActionsArrayV5,
  // setSelectedActionObject,
} from "../reducers/review";

export default function ReviewVideo({ navigation, route }) {
  const dispatch = useDispatch();
  const reviewReducer = useSelector((state) => state.review);
  const userReducer = useSelector((state) => state.user);
  // Video progress state
  const [progress, setProgress] = useState(0);
  // orientation
  const [orientation, setOrientation] = useState("portrait");

  // // for TESTing -> allows to change orientation
  // useEffect(() => {
  //   ScreenOrientation.unlockAsync();
  //   checkOrientation();
  //   const subscriptionScreenOrientation =
  //     ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

  //   return () => {
  //     subscriptionScreenOrientation.remove();
  //     ScreenOrientation.lockAsync();
  //   };
  // });
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
  // for PRODUCTION -> forces to landscape
  useEffect(() => {
    const lockToLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
      setOrientation("landscape");
    };

    lockToLandscape(); // Force landscape mode when component mounts

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ); // Reset to portrait when leaving
    };
  }, []);

  const handleBackPress = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    ); // Force back to portrait
    setOrientation("portrait");
    navigation.goBack();
  };

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

  // Seek video
  const setCurrentTimeManager = (
    timeToSet,
    // manuallySelectedActionId = null
    actionObject = null
  ) => {
    // dispatch(setManuallySelectedAction(manuallySelectedActionId));
    // dispatch(setSelectedActionObject(actionObject));
    dispatch(pressedActionInReviewReducerActionArray(actionObject));
    player.currentTime = timeToSet;
  };

  useEventListener(player, "timeUpdate", () => {
    setProgress(player.currentTime / player.duration);
    // dispatch(updateReviewReducerIsPlayingforActionsArray(player.currentTime));
    dispatch(updateReviewReducerIsPlayingforActionsArrayV5(player.currentTime));
  });

  // Filtering actions
  const filterActions = (parameterName, object) => {
    if (parameterName === "player") {
      dispatch(filterReviewReducerActionsArrayOnPlayer(object));
    }
  };

  const handlePressRequestMontageVideo = async () => {
    const seledtionsCount = reviewReducer.reviewReducerActionsArray.filter(
      (action) => action.isDisplayed
    ).length;
    if (seledtionsCount > 5) {
      Alert.alert(
        `You are about to request a montage of ${seledtionsCount} actions`, // Title
        "Are you sure you want to proceed?", // Description
        [
          {
            text: "No",
            onPress: () => console.log("❌ No Pressed"),
            style: "cancel", // iOS cancel style
          },
          {
            text: "Yes",
            onPress: () => requestMontageVideo(),
          },
        ],
        { cancelable: false } // Prevents dismissing by tapping outside on Android
      );
      // Alert.alert(
      //   "Video request sent", // Title
      //   "Check your email for the video.", // Description
      //   [
      //     { text: "OK", onPress: () => console.log("OK Pressed") }, // Button
      //   ]
      // );
    } else {
      requestMontageVideo();
    }
  };

  const requestMontageVideo = async () => {
    console.log(`in requestMontage video`);
    console.log(reviewReducer.reviewReducerVideoObject.id);

    const response = await fetch(
      // `${process.env.EXPO_PUBLIC_API_URL}/videos//montage-service/queue-a-job/${reviewReducer.reviewReducerVideoObject.id}`,
      `${process.env.EXPO_PUBLIC_API_URL}/videos//montage-service/queue-a-job`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userReducer.token}`,
        },
        body: JSON.stringify({
          matchId: 1,
          videoId: reviewReducer.reviewReducerVideoObject.id,
          actionsArray: reviewReducer.reviewReducerActionsArray.filter(
            (action) => action.isDisplayed
          ),
          token: userReducer.token,
        }),
      }
    );

    if (response.status !== 200) {
      // console.log(`There was a server error: ${response.status}`);
      alert(`There was a server error: ${response.status}`);
      return;
    } else {
      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        const resJson = await response.json();
        // alert("Video request sent:check your email for video download");
        // alert(resJson.message);
        Alert.alert(
          "Video request sent", // Title
          "Check your email for the video.", // Description
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }, // Button
          ]
        );
      }
    }
  };

  return orientation == "portrait" ? (
    <ReviewVideoPortrait
      navigation={navigation}
      route={route}
      progress={progress}
      player={player}
      setCurrentTimeManager={setCurrentTimeManager}
      handleBackPress={handleBackPress}
      filterActions={filterActions}
      handlePressRequestMontageVideo={handlePressRequestMontageVideo}
    />
  ) : (
    <ReviewVideoLandscape
      navigation={navigation}
      route={route}
      progress={progress}
      player={player}
      setCurrentTimeManager={setCurrentTimeManager}
      handleBackPress={handleBackPress}
      filterActions={filterActions}
      handlePressRequestMontageVideo={handlePressRequestMontageVideo}
    />
  );
  // return (
  //   <ReviewVideoPortrait
  //     navigation={navigation}
  //     route={route}
  //     progress={progress}
  //     player={player}
  //     setCurrentTimeManager={setCurrentTimeManager}
  //   />
  // );
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

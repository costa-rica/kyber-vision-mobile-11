import { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";
// import TimelineLandscape from "./TimelineLandscape";
import Timeline from "./Timeline";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import ButtonKvImage from "./ButtonKvImage";

export default function ScriptingLandscapeVideo(props) {
  const userReducer = useSelector((state) => state.user);
  const [expanded, setExpanded] = useState(false); // Manage expanded/collapsed state of the set selection
  const [showVideoControls, setShowVideoControls] = useState(true);
  // Dynamic Styles
  const videoViewStyle = {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  };

  const bottomContainerDynamic = {
    width: Dimensions.get("screen").width,
  };

  useEffect(() => {
    console.log("in ScriptingLandscapeVideo useEffect");
    console.log("test");
  }, []);

  // console.log(`width: ${Dimensions.get("screen").width}`);
  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <GestureDetector gesture={props.combinedGesturesScripting}>
          <VideoView
            style={[videoViewStyle]}
            player={props.player}
            nativeControls={false}
          />
        </GestureDetector>
      </GestureHandlerRootView>

      {/* Add button container */}
      <View style={styles.containerTopLeft}>
        <View style={styles.vwBtnBack}>
          <TouchableOpacity
            style={styles.touchOpBtnBack}
            onPress={() => props.navigation.goBack()}
          >
            <Image
              style={styles.btnImgBackArrow}
              source={require("../../assets/images/btnBackArrow.png")}
              alt="logo"
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* Set Selection */}
        <View style={styles.vwSetSelectionGrayBandContainer}>
          <View style={styles.vwSetGrayBand}>
            <View style={styles.vwSubSetGrayBand}>
              <View style={styles.vwTxtSet}>
                <Text style={styles.txtSet}>Set: {props.currentSet + 1}</Text>
              </View>
              <View style={styles.vwBtnDisplaySets}>
                <TouchableOpacity
                  style={styles.touchOpSet}
                  onPress={() => setExpanded(!expanded)}
                >
                  <Image
                    style={styles.btnImgDownArrow}
                    source={
                      expanded
                        ? require("../../assets/images/btnBackArrow.png")
                        : require("../../assets/images/btnDownArrow.png")
                    }
                    alt="back arrow"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {expanded && (
              <View style={styles.vwSetOptions}>
                {userReducer.video.setTimeStampsArray
                  .slice(0, -1)
                  .map((_, index) => {
                    if (index !== props.currentSet) {
                      return (
                        <TouchableOpacity
                          style={styles.touchOpVwSetOptionWhiteBand}
                          onPress={() => {
                            props.handleSetSelection(index);
                            setExpanded(false);
                          }}
                          key={index}
                        >
                          <View style={styles.vwSetOptionWhiteBand}>
                            <Text style={styles.txtSetOption}>
                              Set {index + 1}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  })}
              </View>
            )}
          </View>
        </View>
      </View>
      {/* <View style={[styles.containerBottom, bottomContainerDynamic]}> */}
      <View style={[styles.containerBottom, bottomContainerDynamic]}>
        {/* Custom Timeline */}
        <GestureHandlerRootView style={styles.gestureViewTimeline}>
          <Timeline
            progress={props.progress}
            // currentSet={props.currentSet}
            setCurrentTimeManager={props.setCurrentTimeManager}
            timelineWidth={props.timelineWidth}
            // startTime={props.startTime}
            // endTime={props.endTime}
            scriptReducerActionArray={props.scriptReducerActionArray}
            player={props.player}
          />
        </GestureHandlerRootView>
        <View style={styles.containerBottomRight}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(200,200,200,.9)",
    justifyContent: "center",
  },
  // vwVideo: {
  //   width: Dimensions.get("window").width,
  //   height: 300,
  // },

  // -- Container Top Left ---
  containerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 3,
    flexDirection: "row",
    justifyContent: "flex-start", // horizontally
  },
  vwBtnBack: {
    alignItems: "center", // Center the child horizontally
    padding: 10, // Makes it look centered
  },
  touchOpBtnBack: {
    borderRadius: 20,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  btnImgBackArrow: {
    width: 33, // Set the desired size for the Image
    height: 33, // Ensure the Image is square
  },

  // --- Set Selection Gray Band ---
  vwSetSelectionGrayBandContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
  },
  vwSetGrayBand: {
    backgroundColor: "#A3A3A3",
    borderRadius: 25,
    padding: 5,
  },
  vwSubSetGrayBand: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtSet: { color: "white" },
  vwSetOptions: {
    borderRadius: 10,
    width: "100%",
    padding: 5,
    gap: 5,
  },
  txtSetOption: { color: "#A3A3A3" },
  btnImgDownArrow: {
    width: 30,
    height: 30,
  },

  vwBtnDisplaySets: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  vwSetOptionWhiteBand: {
    backgroundColor: "white",
    borderRadius: 35,
    width: 60,
    padding: 5,
  },

  // --- Container Bottom: Timeline ----
  containerBottom: {
    position: "absolute", // Overlay the container
    bottom: 0, // Distance from the bottom of the screen
    left: 0, // Distance from the right of the screen
    // width: Dimensions.get("screen").width,
    // width: 100,
    flexDirection: "row",
    // backgroundColor: "green",
    justifyContent: "space-between",
  },

  containerBottomRight: {
    flexDirection: "row", // Stack items vertically
    alignItems: "center", // Align children to the right
    justifyContent: "center",
    paddingRight: 20, // Ensure padding from the edge
    //paddingBottom: 10, // Space from bottom
    // width: 250,
    // backgroundColor: "purple",
    flex: 1,
  },
  // --- Timeline ---
  gestureViewTimeline: {
    height: 100,
    // backgroundColor: "rgba(100,200,200,.9)",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    // flex: 1,
  },
});

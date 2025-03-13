import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  appendReviewFilterArrayPlayerDbObjects,
  removeReviewFilterArrayPlayerDbObjects,
} from "../../reducers/review";
import { useVideoPlayer, VideoView } from "expo-video";

export default function ReviewVideoLandscape(props) {
  const reviewReducer = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const vwVideo = {
    flex: 1,
    backgroundColor: "green",
    height: Dimensions.get("window").height,
    width: "100%",
  };
  const arrowImage = isDropdownVisible
    ? require("../../assets/images/btnBackArrow.png")
    : require("../../assets/images/btnReviewVideoPlayersDownArrow.png");

  return (
    <View style={styles.container}>
      <View style={styles.containerTopRight}>
        <View style={styles.vwPlayersDropDown}>
          <View style={styles.vwPlayersSelected}>
            {reviewReducer.reviewFilterArrayPlayerDbObjects.map(
              (playerDbObject) => (
                <TouchableOpacity
                  key={playerDbObject.id}
                  onPress={() =>
                    dispatch(
                      removeReviewFilterArrayPlayerDbObjects(playerDbObject)
                    )
                  }
                  style={styles.touchOpSelectPlayer}
                >
                  <Text>{playerDbObject.firstName.substring(0, 3)}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
          <View style={styles.vwPlayersDropDownArrow}>
            <TouchableOpacity
              onPress={() => setDropdownVisible(!isDropdownVisible)}
            >
              <Image source={arrowImage} resizeMode="contain" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={vwVideo}>
        <VideoView style={styles.vwVideo} player={props.player} />
      </View>
      {isDropdownVisible && (
        <View style={styles.vwPlayersOptions}>
          {reviewReducer.reviewActionsArrayUniqueListOfPlayerDbObjects.map(
            (playerDbObject) => (
              <TouchableOpacity
                key={playerDbObject.id}
                onPress={() =>
                  dispatch(
                    appendReviewFilterArrayPlayerDbObjects(playerDbObject)
                  )
                }
                style={styles.touchOpSelectPlayer}
              >
                <Text>{playerDbObject.firstName.substring(0, 3)}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "purple",
  },
  containerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 400,
    height: 50,
    zIndex: 1,
    backgroundColor: "rgba(119,119,119,.74)",
    justifyContent: "center",
    borderBottomLeftRadius: 12, // Round bottom-left corner
  },
  vwPlayersDropDown: {
    backgroundColor: "rgba(74,74,74,.74)",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  vwPlayersOptions: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "rgba(74,74,74,.74)",
    zIndex: 1,
    borderRadius: 12,
    flexDirection: "row",
    gap: 5,
    padding: 5,
  },
  touchOpSelectPlayer: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 12,
  },

  vwVideo: {
    width: "100%",
    height: "100%", // Matches parent height
  },
});

// import { useState, useEffect } from "react";
// import {
//   View,
//   TouchableOpacity,
//   Image,
//   Text,
//   StyleSheet,
//   Dimensions,
//   Switch,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { useVideoPlayer, VideoView } from "expo-video";
// import { useEventListener } from "expo";
// import * as ScreenOrientation from "expo-screen-orientation";
// // import TemplateView from "./subcomponents/TemplateView";
// import TemplateView from "./TemplateView";
// import ButtonKv from "./ButtonKv";
// import SwitchKv from "./SwitchKv";
// import Timeline from "./Timeline";
// import {
//   GestureHandlerRootView,
//   GestureDetector,
//   Gesture,
// } from "react-native-gesture-handler";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   appendReviewFilterArrayPlayerDbObjects,
//   removeReviewFilterArrayPlayerDbObjects,
// } from "../../reducers/review";

// export default function ReviewVideoLandscape(props) {
//   const reviewReducer = useSelector((state) => state.review);
//   const dispatch = useDispatch();
//   const vwVideo = {
//     flex: 1,
//     backgroundColor: "green",
//     height: Dimensions.get("window").height,
//     width: "100%",
//   };
//   return (
//     <View style={styles.container}>
//       <View style={styles.containerTopLeft}>
//         {/* <View style={{ width: 100, height: 50 }}> */}
//         <TouchableOpacity
//           // style={styles.touchOpCircle}
//           onPress={() => {
//             props.handleBackPress();
//           }}
//         >
//           <Image
//             //style={{ width: 24, height: 24 }} // Adjust based on expected size
//             source={require("../../assets/images/btnBackArrowWhite.png")}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//         {/* </View> */}

//         {/* <Text>Review Video Landscape</Text> */}
//       </View>
//       <View style={styles.containerTopRight}>
//         <View style={styles.vwPlayersDropDown}>
//           <View style={styles.vwPlayersSelected}>
//             <Text>Selected Players</Text>
//           </View>
//           <View style={styles.vwPlayersDropDownArrow}>
//             <TouchableOpacity
//               onPress={() => {
//                 console.log("pressed down arrow");
//               }}
//             >
//               <Image
//                 source={require("../../assets/images/btnReviewVideoPlayersDownArrow.png")}
//                 resizeMode="contain"
//               />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//       {/* vwPlayersOptions is only shwn when dropdown arrow is pressed */}
//       <View style={styles.vwPlayersOptions}>
//         {reviewReducer.reviewActionsArrayUniqueListOfPlayerDbObjects.map(
//           (playerDbObject, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => {
//                 console.log(`pressed player ${playerDbObject}`);
//               }}
//               style={styles.touchOpSelectPlayer}
//             >
//               <Text>{playerDbObject.firstName.substring(0, 3)}</Text>
//             </TouchableOpacity>
//           )
//         )}
//         <TouchableOpacity
//           onPress={() => {
//             console.log(`pressed player TEst`);
//           }}
//           style={styles.touchOpSelectPlayer}
//         >
//           <Text>Test</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={vwVideo}>
//         <VideoView
//           style={styles.vwVideo}
//           player={props.player}
//           // nativeControls={false}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "purple",
//   },
//   containerTopLeft: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     zIndex: 1,
//   },
//   containerTopRight: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     width: 400,
//     height: 50,
//     zIndex: 1,
//     backgroundColor: "rgba(119,119,119,.74)",
//     justifyContent: "center",
//   },
//   vwPlayersDropDown: {
//     backgroundColor: "rgba(74,74,74,.74)",
//     justifyContent: "flex-end",
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   vwPlayersOptions: {
//     position: "absolute",
//     top: 50,
//     right: 0,
//     backgroundColor: "rgba(74,74,74,.74)",
//     zIndex: 1,
//     borderRadius: 12,
//     flexDirection: "row",
//     gap: 5,
//     padding: 5,
//   },
//   touchOpSelectPlayer: {
//     backgroundColor: "white",
//     padding: 5,
//     borderRadius: 12,
//   },
//   vwVideo: {
//     width: "100%",
//     height: "100%", // Matches parent height
//   },

//   // --- Timeline ---
//   gestureViewTimeline: {
//     alignItems: "center",
//   },
// });

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
// import SwitchKv from "./SwitchKv";
import SwitchKvWhite from "./SwitchKvWhite";
import Timeline from "./Timeline";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ButtonKvImage from "./ButtonKvImage";

export default function ReviewVideoLandscape(props) {
  const reviewReducer = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [topRightIsVisible, setTopRightIsVisible] = useState(false);
  const vwVideo = {
    flex: 1,
    backgroundColor: "white",
    height: Dimensions.get("window").height,
    width: "100%",
  };
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.containerTopRight}>
        <View style={styles.vwPlayersSelectedAndDropDownSuper}>
          <Text style={styles.txtPlayersTitle}>Players</Text>
          <View style={styles.vwPlayersSelectedAndDropDown}>
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
                    <Text style={styles.txtPlayer}>
                      {playerDbObject.firstName.substring(0, 3)}
                    </Text>
                    <Image
                      source={require("../../assets/images/whiteX.png")}
                      resizeMode="contain"
                      style={styles.imgWhiteX}
                    />
                  </TouchableOpacity>
                )
              )}
            </View>
            <View style={styles.vwPlayersDropDownArrow}>
              <TouchableOpacity
                onPress={() => setDropdownVisible(!isDropdownVisible)}
              >
                <Image
                  source={require("../../assets/images/btnReviewVideoPlayersDownArrow.png")}
                  resizeMode="contain"
                  style={{
                    transform: [
                      { rotate: isDropdownVisible ? "90deg" : "0deg" },
                    ],
                    width: 20,
                    height: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.vwFavoritesSwitchAndTitle}>
          <Text style={styles.txtFavoritesTitle}>Favorites Only</Text>
          <View style={styles.vwFavoritesSwitch}>
            <SwitchKvWhite state={favoritesOnly} setState={setFavoritesOnly} />
          </View>
        </View>
      </View>
      <View style={styles.containerMiddleRight}>
        <TouchableOpacity
          onPress={() => {
            console.log("pressed middle right");
          }}
          style={styles.touchOpMiddleRight}
        >
          <Image
            source={require("../../assets/images/btnShareDiagram.png")}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
          <Text style={styles.txtMiddleRight}>Share or export 12 actions</Text>
        </TouchableOpacity>
      </View>

      <View style={vwVideo}>
        <VideoView
          style={styles.vwVideo}
          player={props.player}
          nativeControls={false}
        />
      </View>
      <View style={styles.containerBottom}>
        <ButtonKvImage
          onPress={() => {
            console.log("rotate screen to landscape");
            // correctOrientationFromStart();
            props.player.playing ? props.player.pause() : props.player.play();
          }}
          style={{ padding: 0 }}
        >
          <View style={styles.vwBtnPausePlay}>
            <Image
              source={
                props.player.playing
                  ? require("../../assets/images/btnPause.png")
                  : require("../../assets/images/btnPlay.png")
              }
              alt="logo"
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
            />
          </View>
        </ButtonKvImage>

        <View style={styles.vwActions}>
          {reviewReducer.reviewActionsArray.map((action, index) => (
            <TouchableOpacity
              style={styles.touchOpAction}
              key={index}
              onPress={() => {
                props.setCurrentTimeManager(action.timestamp);
              }}
            >
              <Text style={styles.txtAction}>{index} </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {/* Timeline */}
      <View style={{ width: Dimensions.get("window").width }}>
        <GestureHandlerRootView style={styles.gestureViewTimeline}>
          <Timeline
            videoProgress={props.progress}
            setCurrentTimeManager={props.setCurrentTimeManager}
            player={props.player}
          />
        </GestureHandlerRootView>
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
    // backgroundColor: "purple",
  },

  containerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    // width: 400,
    // height: 50,
    zIndex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomLeftRadius: 12, // Round bottom-left corner
    backgroundColor: "rgba(74,74,74,.74)",
    flexDirection: "row",
    gap: 10,
    padding: 3,
  },
  vwFavoritesSwitch: {
    height: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  txtFavoritesTitle: {
    color: "white",
    fontWeight: "bold",
  },
  vwPlayersSelectedAndDropDownSuper: {
    // justifyContent: "center",
    alignItems: "center",
    padding: 3,
  },
  txtPlayersTitle: {
    color: "white",
    fontWeight: "bold",
  },
  vwPlayersSelectedAndDropDown: {
    backgroundColor: "rgba(209,207,201,1)",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    padding: 3,
    borderRadius: 5,
    height: 50,
  },
  vwPlayersSelected: {
    flexDirection: "row",
    gap: 5,
  },
  imgWhiteX: {
    width: 12,
    height: 12,
  },
  // -- hidden --
  vwPlayersOptions: {
    position: "absolute",
    top: 80,
    right: 120,
    backgroundColor: "rgba(74,74,74,.74)",
    zIndex: 1,
    borderRadius: 12,
    flexDirection: "row",
    gap: 5,
    padding: 5,
  },
  touchOpSelectPlayer: {
    // backgroundColor: "white",
    backgroundColor: "rgba(110,110,110,1)",
    padding: 5,
    borderRadius: 5,
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  txtPlayer: {
    color: "white",
    fontWeight: "bold",
    // fontFamily: "ApfelGrotezk",
  },

  // --- middle right: share ---
  containerMiddleRight: {
    position: "absolute",
    top: 80,
    right: 0,
    width: 70,
    backgroundColor: "rgba(74,74,74,.74)",
    zIndex: 1,
    borderRadius: 12,
    flexDirection: "row",
    gap: 5,
    padding: 5,
    // alignItems: "center",
    justifyContent: "center",
  },
  touchOpMiddleRight: {
    // backgroundColor: "rgba(110,110,110,1)",
    padding: 2,
    borderRadius: 5,
    // flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
  },
  txtMiddleRight: {
    color: "white",
    // fontWeight: "bold",
    fontFamily: "ApfelGrotezk",
    fontSize: 12,
    textAlign: "center",
  },
  vwVideo: {
    width: "100%",
    height: "100%", // Matches parent height
    backgroundColor: "black",
  },

  // -- BOTTOM ---
  containerBottom: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    // backgroundColor: "rgba(74,74,74,.74)",
    zIndex: 1,
    // borderRadius: 12,
    flexDirection: "row",
    gap: 5,
    // padding: 5,
  },
  vwBtnPausePlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 35,
    width: 60,
    height: 40,
    // padding: 5,
  },
  vwActions: {
    flexDirection: "row",
    // backgroundColor: "green",
    gap: 5,
  },
  txtAction: {
    color: "white",
    fontWeight: "bold",
    // fontFamily: "ApfelGrotezk",
    fontSize: 15,
  },
  touchOpAction: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "rgba(110,110,110,1)",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  // --- Timeline ---
  gestureViewTimeline: {
    alignItems: "center",
    height: 10,
  },
  // containerBottom: {
  //   flex: 1,
  //   backgroundColor: "green",
  // },
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

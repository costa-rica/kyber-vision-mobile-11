import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import SinglePickerWithSideBorders from "./pickers/SinglePickerWithSideBorders";
import DoublePickerWithSideBorders from "./pickers/DoublePickerWithSideBorders";
import ButtonKv from "./ButtonKv";
// Implement Video Player
import { useVideoPlayer, VideoView } from "expo-video";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Timeline from "./Timeline";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ButtonKvImage from "./ButtonKvImage";

export default function ScriptingPortraitVideo(props) {
  const scriptReducer = useSelector((state) => state.script);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("in ScriptingPortraitVideo useEffect");
  }, [props.scriptReducerActionArray, props.scriptId]);

  /// New Gesture logic
  const [vwVolleyballCourtCoords, setVwVolleyballCourtCoords] = useState(null);
  const handleVwVolleyballCourtAndGestSuperLayout = (event) => {
    console.log(
      `- 1 handleVwVolleyballCourtAndGestSuperLayout event ${Platform.OS}-`
    );
    console.log(event.nativeEvent.layout);

    const { width, height, x, y } = event.nativeEvent.layout;

    setVwVolleyballCourtCoords({ x, y, width, height }); // Store this separately first

    props.setGestureViewCoords((prev) => ({
      ...prev,
      x: x,
      width: width,
      y: y,
      height: height,
    }));
  };

  useEffect(() => {
    console.log("Updating gesture view coordinates after parent view layout");
  }, [vwVolleyballCourtCoords]);

  const handleGestureHandlerRootViewLayout = (event) => {
    console.log(`- 2 handleGestureHandlerRootViewLayout event ${Platform.OS}-`);
    console.log(event.nativeEvent.layout);

    const { height, y } = event.nativeEvent.layout;

    props.setGestureViewCoords((prev) => {
      const new_y = prev.y + y;
      console.log(`prev.y: ${prev.y}, new_y: ${new_y}`);

      return {
        ...prev,
        y: new_y,
        height: height,
      };
    });

    console.log(`setGestureViewCoords have been set`);
  };

  /// END New Gesture Logic
  const pressedAButton = (message = "Pressed a button") => {
    Alert.alert(`${message} `);
  };
  return (
    <View style={styles.container}>
      <View style={styles.vwBtnBackArrow}>
        <TouchableOpacity
          style={styles.touchOpBtnBackArrow}
          onPress={() => {
            props.navigation.goBack();
          }}
        >
          <Image
            style={styles.imgBtnBackArrow}
            source={require("../../assets/images/btnBackArrow.png")}
            alt="logo"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.containerTop}>
        <Text>Video Scripting</Text>
        <View style={styles.vwTitle}>
          <Text style={styles.txtTitleAdmin}>AUC vs Arles</Text>
        </View>
        <View style={styles.vwScore}>
          <View style={styles.vwScoreSubGroup}>
            <View style={styles.vwScoreSetTeamAnalyzed}>
              {/* Belongs to Set Team Analyzed SinglePickerWithSideBorders */}

              <SinglePickerWithSideBorders
                arrayElements={props.setOptions}
                itemHeight={props.stdPickerHeight}
                onChange={props.setSetsTeamAnalyzed}
                value={props.setsTeamAnalyzed}
                style={props.stdPickerStyle}
                pickerName={"setsTeamAnalyzedPortrait"}
              />
            </View>
            {/* <View style={{ flex: 1 }} /> */}
            <View style={styles.vwScoreBothTeamsScores}>
              <DoublePickerWithSideBorders
                arrayElements={props.scoreOptions}
                onChange={props.setScoreTeamAnalyzed}
                value={props.scoreTeamAnalyzed}
                onChange02={props.setScoreTeamOpponent}
                value02={props.scoreTeamOpponent}
                // itemHeight={props.stdPickerHeight}
                // elementsFontSize={props.stdPickerFontSize}
                // parentViewWidth={props.stdPickerParentViewWidth}
                // elementPickerBorderRadius={props.stdPickerBorderRadius}
                style={props.stdPickerStyle}
                pickerName={"scoreTeamAnalyzedPortrait"}
                pickerName02={"scoreTeamOpponentPortrait"}
              />
            </View>

            {/* Belongs to Score SinglePickerWithSideBorders */}
            <View style={styles.vwScoreSetTeamOpponent}>
              <SinglePickerWithSideBorders
                arrayElements={props.setOptions}
                onChange={props.setSetsTeamOpponent}
                value={props.setsTeamOpponent}
                style={props.stdPickerStyle}
                pickerName="setsTeamOpponentPortrait"
              />
            </View>
          </View>

          <View style={styles.vwScorePoistionalFormation}>
            <SinglePickerWithSideBorders
              arrayElements={["P1", "P2", "P3", "P4", "P5", "P6"]}
              onChange={props.setRotation}
              value={props.rotation}
              style={{ ...props.stdPickerStyle, width: 50 }}
              pickerName="rotationPortrait"
            />
          </View>
        </View>
        <View
          style={[styles.vwVideoAndGestSuper, {}]}
          onLayout={(event) => handleVwVolleyballCourtAndGestSuperLayout(event)}
        >
          <GestureHandlerRootView
            onLayout={(event) => handleGestureHandlerRootViewLayout(event)}
            style={{}} //This is key to make sure the flex properties will trickle down to <Image>
          >
            <GestureDetector gesture={props.combinedGestures}>
              {/* <View style={styles.vwGestureAndVideo}> */}
              <VideoView
                style={styles.vwVideo}
                player={props.player}
                nativeControls={false}
              />
              {/* </View> */}
            </GestureDetector>
          </GestureHandlerRootView>
        </View>
        {/* --- END vwVideoAndGestSuper ---*/}
        <View style={{ width: Dimensions.get("window").width }}>
          <GestureHandlerRootView style={styles.gestureViewTimeline}>
            <Timeline
              videoProgress={props.progress}
              setCurrentTimeManager={props.setCurrentTimeManager}
              player={props.player}
            />
          </GestureHandlerRootView>
        </View>
        <View style={styles.vwVideoControls}>
          <View style={styles.vwVideoControlsLeft}>
            <ButtonKv
              onPress={() => pressedAButton("Manage video speed")}
              style={{
                padding: 0,
                backgroundColor: "#806181",
                justifyContent: "center",
                width: 70,
              }}
            >
              x 1.0
            </ButtonKv>
          </View>
          <View style={styles.vwVideoControlsRight}>
            <ButtonKv
              onPress={() =>
                props.setCurrentTimeManager(props.player.currentTime - 5)
              }
              style={{
                padding: 0,
                backgroundColor: "#806181",
                justifyContent: "center",
                width: 50,
              }}
            >
              -5
            </ButtonKv>
            <ButtonKv
              onPress={() =>
                props.setCurrentTimeManager(props.player.currentTime - 1)
              }
              style={{
                padding: 0,
                backgroundColor: "#806181",
                justifyContent: "center",
                width: 50,
              }}
            >
              -1
            </ButtonKv>
            <ButtonKvImage
              onPress={() => {
                console.log("rotate screen to landscape");
                // correctOrientationFromStart();
                props.player.playing
                  ? props.player.pause()
                  : props.player.play();
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
                />
              </View>
            </ButtonKvImage>
            <ButtonKv
              onPress={() => {
                pressedAButton("forward 5 seconds");
                props.setCurrentTimeManager(props.player.currentTime + 5);
              }}
              style={{
                padding: 0,
                backgroundColor: "#806181",
                justifyContent: "center",
                width: 50,
              }}
            >
              +5
            </ButtonKv>
            <ButtonKv
              onPress={() =>
                props.setCurrentTimeManager(props.player.currentTime + 10)
              }
              style={{
                padding: 0,
                backgroundColor: "#806181",
                justifyContent: "center",
                width: 50,
              }}
            >
              +10
            </ButtonKv>
          </View>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.vwBlackLineDivider} />
        <View style={styles.vwActionDetails}>
          <View style={styles.vwActionDetailsQuality}>
            <SinglePickerWithSideBorders
              arrayElements={scriptReducer.qualityArray}
              onChange={props.handleChangeQuality}
              value={
                scriptReducer.actionsArray[
                  scriptReducer.actionsArray.length - 1
                ]?.quality || "0"
              }
              style={props.stdPickerStyle}
              pickerName={"qualityPortrait"}
            />
          </View>
          <View style={styles.vwActionDetailsPosition}>
            <SinglePickerWithSideBorders
              arrayElements={scriptReducer.positionalAreasArray}
              onChange={props.setPositionalArea}
              value={props.positionalArea}
              style={props.stdPickerStyle}
              pickerName="positionalAreaPortrait"
            />
          </View>
          <View style={styles.vwActionDetailsPlayer}>
            <SinglePickerWithSideBorders
              arrayElements={props.truncateArrayElements(
                scriptReducer.playerNamesArrayRotated,
                4
              )}
              onChange={props.setPlayerName}
              value={props.playerName}
              style={{ ...props.stdPickerStyle, width: 60, fontSize: 18 }}
              selectedIsBold={false}
              pickerName="playerPortrait"
            />
          </View>
          <View style={styles.vwActionDetailsType}>
            <SinglePickerWithSideBorders
              arrayElements={scriptReducer.typesArray}
              onChange={props.handleChangeType}
              // value={props.type}
              value={
                scriptReducer.actionsArray[
                  scriptReducer.actionsArray.length - 1
                ]?.type || "Bloc"
              }
              style={{ ...props.stdPickerStyle, width: 50, fontSize: 20 }}
              selectedIsBold={false}
              pickerName={"typePortrait"}
            />
          </View>
          <View style={styles.vwActionDetailsSubtype}>
            <SinglePickerWithSideBorders
              arrayElements={scriptReducer.subtypesArray}
              onChange={props.handleChangeSubtype}
              value={
                scriptReducer.actionsArray[
                  scriptReducer.actionsArray.length - 1
                ]?.subtype || ""
              }
              style={{ ...props.stdPickerStyle, width: 60, fontSize: 15 }}
              pickerName={"subtypePortrait"}
            />
          </View>
        </View>
        <View style={styles.vwScriptingManagement}>
          <View style={styles.vwScriptingManagementLeft}>
            <ButtonKv
              onPress={() => {
                Alert.alert("start");
                // props.setPosition((prev) => prev + 1);
              }}
              // colorBackground={"#970F9A"}
              // colorText={"white"}
              // width={140}
              // fontSize={20}
              style={{
                backgroundColor: "#970F9A",
                color: "white",
                width: 140,
                fontSize: 20,
              }}
            >
              Start
            </ButtonKv>
          </View>
          <View style={styles.vwScriptingManagementRight}>
            <View style={styles.vwScriptingManagementRightLeft}>
              <ButtonKv
                onPress={() => props.handlePressedServeOrReception("S")}
                style={{
                  backgroundColor: "#310732",
                  color: "white",
                  width: 40,
                  fontSize: 20,
                }}
              >
                S
              </ButtonKv>
              <ButtonKv
                onPress={() => props.handlePressedServeOrReception("R")}
                style={{
                  backgroundColor: "#310732",
                  color: "white",
                  width: 40,
                  fontSize: 20,
                }}
              >
                R
              </ButtonKv>
            </View>
            <View style={styles.vwScriptingManagementRightRight}>
              <ButtonKv
                onPress={() => props.handleWinRallyButtonPress()}
                style={{
                  backgroundColor: "#970F9A",
                  color: "white",
                  width: 40,
                  fontSize: 20,
                }}
              >
                W
              </ButtonKv>
              <ButtonKv
                onPress={() => props.setScoreTeamOpponent((prev) => prev + 1)}
                style={{
                  backgroundColor: "#970F9A",
                  color: "white",
                  width: 40,
                  fontSize: 20,
                }}
              >
                L
              </ButtonKv>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

// Styles for main container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F2EBF2",
    // justifyContent: "center",
  },
  containerTop: {
    flex: 1,
    // backgroundColor: "green",
    alignItems: "center",
  },
  vwBtnBackArrow: {
    // position: "absolute",
    marginBottom: -20,
    paddingTop: 10,
    paddingLeft: 10,
  },
  touchOpBtnBackArrow: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25, // Makes it a circle
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  imgBtnBackArrow: {
    width: "100%",
    height: "100%",
    borderRadius: 17, // Match circle's border radius
  },
  vwTitle: {
    borderBottomWidth: 1,
    borderColor: "#970F9A",
    width: Dimensions.get("window").width * 0.8,
  },
  txtTitleAdmin: {
    fontSize: 20,
    color: "#970F9A",
    fontFamily: "ApfelGrotezk",
    backgroundColor: "#F2EBF2",
    textAlign: "center",
  },
  vwScore: {
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    borderRadius: 15,
  },
  vwScoreSubGroup: {
    flexDirection: "row",
  },
  vwScoreSetTeamAnalyzed: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  vwScoreBothTeamsScores: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  vwScoreSetTeamOpponent: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  vwScorePoistionalFormation: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  // ----- New Gesture Video ---

  vwVideoAndGestSuper: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "purple",
    width: "100%",
    height: 240, // Ensure fixed height for VideoView
  },

  vwVideo: {
    width: "100%",
    height: "100%", // Matches parent height
  },

  // --- Timeline ---
  gestureViewTimeline: {
    alignItems: "center",
  },

  // --- Video Controls ---
  vwVideoControls: {
    // flex: 1,
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  vwBtnPausePlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#806181",
    borderRadius: 35,
    width: 60,
    height: 40,
    // padding: 5,
  },
  vwVideoControlsLeft: {},
  vwVideoControlsRight: {
    flexDirection: "row",
    gap: 5,
  },
  // -------- BOTTOM --------

  containerBottom: {
    // flex: 1,
    // backgroundColor: "#F2EBF2",
    // backgroundColor: "rgba(0, 0, 0, 0.3)",
    minHeight: 200,
  },
  vwBlackLineDivider: {
    width: Dimensions.get("window").width,
    height: 10,
    backgroundColor: "#310732",
  },
  vwActionDetails: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    flexDirection: "row",
    minHeight: 100,
    alignItems: "flex-start",
    width: "100%",
  },
  vwActionDetailsQuality: {
    flexDirection: "row",
  },
  vwActionDetailsPosition: {
    flexDirection: "row",
  },
  vwActionDetailsPlayer: {
    flexDirection: "row",
  },
  vwScriptingManagement: {
    // flex: 1,
    backgroundColor: "transparent",
    // width: Dimensions.get("window").width,
    // height: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  vwScriptingManagementLeft: {
    padding: 20,
    // backgroundColor: "gray",
    // margin: 20,
  },
  vwScriptingManagementRight: {
    padding: 20,
    margin: 20,
    gap: 10,
    flexDirection: "row",
  },
  vwScriptingManagementRightLeft: {
    padding: 10,
    // margin: 10,
    gap: 20,
  },
  vwScriptingManagementRightRight: {
    padding: 10,
    // margin: 10,
    gap: 20,
  },
});

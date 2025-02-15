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

export default function ScriptingPortraitVideo(props) {
  useEffect(() => {
    console.log("in ScriptingPortraitVideo useEffect");
  }, [props.scriptReducerActionArray, props.scriptId]);

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
        <Text>Live Scripting</Text>
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
              />
            </View>

            {/* Belongs to Score SinglePickerWithSideBorders */}
            <View style={styles.vwScoreSetTeamOpponent}>
              <SinglePickerWithSideBorders
                arrayElements={props.setOptions}
                onChange={props.setSetsTeamOpponent}
                value={props.setsTeamOpponent}
                style={props.stdPickerStyle}
              />
            </View>
          </View>

          <View style={styles.vwScorePoistionalFormation}>
            <SinglePickerWithSideBorders
              arrayElements={["P1", "P2", "P3", "P4", "P5", "P6"]}
              onChange={props.setPositionalFormation}
              value={props.positionalFormation}
              style={{ ...props.stdPickerStyle, width: 50 }}
            />
          </View>
        </View>
        <View style={styles.vwGestureAndVideo}>
          <VideoView
            style={styles.vwVideo}
            player={props.player}
            // nativeControls={false}
          />
        </View>
        {/* <View style={styles.vwVollyballCourt}>
          <Image
            source={require("../../assets/images/imgVollyballCourt.png")}
            alt="imgVollyballCourt"
            resizeMode="contain"
          />

        </View> */}
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.vwBlackLineDivider} />
        <View style={styles.vwActionDetails}>
          <View style={styles.vwActionDetailsQuality}>
            <SinglePickerWithSideBorders
              arrayElements={[-2, -1, 0, 1, 2]}
              onChange={props.setQuality}
              value={props.quality}
              style={props.stdPickerStyle}
            />
          </View>
          <View style={styles.vwActionDetailsPosition}>
            <SinglePickerWithSideBorders
              arrayElements={[1, 2, 3, 4, 5, 6]}
              onChange={props.setPosition}
              value={props.position}
              style={props.stdPickerStyle}
            />
          </View>
          <View style={styles.vwActionDetailsPlayer}>
            <SinglePickerWithSideBorders
              arrayElements={props.truncateArrayElements(props.table02data, 4)}
              onChange={props.setPlayerName}
              value={props.playerName}
              style={{ ...props.stdPickerStyle, width: 60, fontSize: 18 }}
              selectedIsBold={false}
            />
          </View>
          <View style={styles.vwActionDetailsType}>
            <SinglePickerWithSideBorders
              arrayElements={props.table03data}
              onChange={props.setType}
              value={props.type}
              style={{ ...props.stdPickerStyle, width: 50, fontSize: 20 }}
              selectedIsBold={false}
            />
          </View>
          <View style={styles.vwActionDetailsSubtype}>
            <SinglePickerWithSideBorders
              arrayElements={props.truncateArrayElements(props.table04data, 4)}
              onChange={props.setSubtype}
              value={props.subtype}
              style={{ ...props.stdPickerStyle, width: 60, fontSize: 15 }}
            />
          </View>
        </View>
        <View style={styles.vwScriptingManagement}>
          <View style={styles.vwScriptingManagementLeft}>
            <ButtonKv
              onPress={() => {
                Alert.alert("start");
                props.setPosition((prev) => prev + 1);
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
                onPress={() => console.log("presssed S")}
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
                onPress={() => console.log("presssed R")}
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
                onPress={() => console.log("presssed W")}
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
                onPress={() => console.log("presssed L")}
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
    // width: "100%",
    // height: "100%",
    // borderRadius: 35, // Match circle's border radius
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
    // flex: 1,
    width: Dimensions.get("window").width * 0.9,
    flexDirection: "row",
    // backgroundColor: "rgba(0, 0, 0, 0.3)",
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
  vwVollyballCourt: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
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

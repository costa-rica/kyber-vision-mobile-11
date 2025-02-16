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
import { useState, useEffect } from "react";
import ButtonKv from "./ButtonKv";
// SwipePad
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

export default function ScriptingPortraitLive(props) {
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

  // const handleGestureHandlerRootViewLayout = (event) => {
  //   console.log(`- 2 handleGestureHandlerRootViewLayout event ${Platform.OS}-`);
  //   console.log(event.nativeEvent.layout);
  //   const { width, height, x, y } = event.nativeEvent.layout;
  //   const new_y = props.gestureViewCoords.low_y + y;
  //   console.log(`y: ${props.gestureViewCoords.low_y}, new_y: ${new_y}`);
  //   props.setGestureViewCoords({
  //     ...props.gestureViewCoords,
  //     low_y: new_y,
  //     high_y: new_y + height,
  //   });

  //   console.log(`setGestureViewCoords have been set`);
  // };
  // const handleVwVolleyballCourtAndGestSuperLayout = (event) => {
  //   console.log(
  //     `- 1 handleVwVolleyballCourtAndGestSuperLayout event ${Platform.OS}-`
  //   );
  //   console.log(event.nativeEvent.layout);
  //   const { width, height, x, y } = event.nativeEvent.layout;
  //   props.setGestureViewCoords({
  //     low_x: x,
  //     high_x: x + width,
  //     low_y: y,
  //     high_y: y + height,
  //   });
  // };
  // useEffect(() => {
  //   if (vwVolleyballCourtCoords) {
  //     console.log("Updating gesture view coordinates after parent view layout");
  //     props.setGestureViewCoords((prev) => ({
  //       ...prev,
  //       low_y: vwVolleyballCourtCoords.y + (prev.low_y || 0),
  //       high_y: vwVolleyballCourtCoords.y + (prev.high_y || 0),
  //     }));
  //   }
  // }, [vwVolleyballCourtCoords]);
  return (
    <View style={styles.container}>
      {/* <Text style={{ position: "absolute", left: 100, top: 10 }}>
        low_y:{props.gestureBoundaries.low_y} high_y:{" "}
        {props.gestureBoundaries.high_y}
      </Text> */}
      <View
        style={styles.containerTop}
        // onLayout={(event) => handleContainerTopLayout(event)}
      >
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
        <Text>Live Scripting</Text>
        <View
          style={styles.vwTitle}
          // onLayout={(event) => handleVwTitleLayout(event)}
        >
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
        <View
          style={styles.vwVolleyballCourtAndGestSuper}
          onLayout={(event) => handleVwVolleyballCourtAndGestSuperLayout(event)}
        >
          <GestureHandlerRootView
            onLayout={(event) => handleGestureHandlerRootViewLayout(event)}
            style={{}} //This is key to make sure the flex properties will trickle down to <Image>
          >
            <GestureDetector gesture={props.combinedGestures}>
              <Image
                source={require("../../assets/images/imgVollyballCourt.png")}
                alt="imgVollyballCourt"
                resizeMode="contain"
                style={styles.imgVolleyballCourt}
              />
            </GestureDetector>
          </GestureHandlerRootView>
        </View>
      </View>
      <View
        style={styles.containerBottom}
        // onLayout={(event) => {
        //   handleContainerBottomLayout(event);
        // }}
      >
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
              arrayElements={props.tableTypeDummyData}
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
                onPress={() => Alert.alert("pressed S")}
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
                onPress={() => Alert.alert("pressed R")}
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
                onPress={() => Alert.alert("pressed W")}
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
                onPress={() => Alert.alert("pressed L")}
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
    // marginBottom: -20,
    paddingTop: 10,
    paddingLeft: 10,
    width: "100%",
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
  vwVolleyballCourtAndGestSuper: {
    flex: 1,
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "purple",
  },
  vwVolleyballCourt: {
    paddingTop: 20,
    justifyContent: "center",
    // backgroundColor: "green",
  },
  imgVolleyballCourt: {
    // backgroundColor: "red",
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

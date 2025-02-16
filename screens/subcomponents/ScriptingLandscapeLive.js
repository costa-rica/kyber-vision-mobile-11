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

export default function ScriptingLandscapeLive(props) {
  const handleBackPress = async (navigation) => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    navigation.goBack();
  };
  const [vwVolleyballCourtCoords, setVwVolleyballCourtCoords] = useState(null);
  const handleContainerMiddleLayout = (event) => {
    console.log(`- 1 handleContainerMiddleLayout event ${Platform.OS}-`);
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
  const handleImageLayout = (event) => {
    console.log(`- 2 handleImageLayout event-`);
    console.log(event.nativeEvent.layout);

    const { x, y, width, height } = event.nativeEvent.layout;
    console.log(`x: ${x}, y: ${y}, width: ${width}, height: ${height}`);
    props.setGestureViewCoords((prev) => {
      const new_y = prev.y + y;
      console.log(`prev.y: ${prev.y}, new_y: ${new_y}`);

      return {
        ...prev,
        // y: new_y,
        x: x,
        width: width,
        height: height,
      };
    });
    console.log(`setGestureViewCoords have been set`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View>
          <TouchableOpacity
            // style={styles.touchOpCircle}
            onPress={() => {
              handleBackPress(props.navigation);
            }}
          >
            <Image
              //style={{ width: 24, height: 24 }} // Adjust based on expected size
              source={require("../../assets/images/btnBackArrowTransparent.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.vwTopCenterBlurryCapsule}>
          <View style={styles.vwPositionCapsule}>
            <SinglePickerWithSideBorders
              arrayElements={["P1", "P2", "P3", "P4", "P5", "P6"]}
              onChange={props.setPositionalFormation}
              value={props.positionalFormation}
              style={{
                ...props.stdPickerStyle,
                itemHeight: 30,
                fontSize: 15,
                width: 50,
              }}
            />
          </View>
          <View style={styles.vwTeamName}>
            <Text style={styles.txtTeamName}>Aix'Otic</Text>
          </View>
          <View style={styles.vwSetCircles}>
            {Array.from({ length: 3 }).map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.handleSetCirclePress("analyzed", index + 1)
                }
                style={[
                  styles.touchOpSetsCircle,
                  props.setsTeamAnalyzed > index &&
                    styles.touchOpSetsCircleFilled,
                ]}
              />
            ))}
          </View>
          <View style={styles.vwScore}>
            <DoublePickerWithSideBorders
              arrayElements={props.scoreOptions}
              onChange={props.setScoreTeamAnalyzed}
              value={props.scoreTeamAnalyzed}
              onChange02={props.setScoreTeamOpponent}
              value02={props.scoreTeamOpponent}
              style={{
                ...props.stdPickerStyle,
                backgroundColor: "rgba(74,74,74,0.56)",
              }}
            />
          </View>
          <View style={styles.vwSetCircles}>
            {Array.from({ length: 3 }).map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  props.handleSetCirclePress("opponent", index + 1)
                }
                style={[
                  styles.touchOpSetsCircle,
                  props.setsTeamOpponent > index &&
                    styles.touchOpSetsCircleFilled,
                ]}
              />
            ))}
          </View>
          <View style={styles.vwTeamName}>
            <Text style={styles.txtTeamName}>ext.</Text>
          </View>
        </View>
        <View style={styles.vwSettingsGearBtn}>
          <TouchableOpacity
            onPress={() => {
              handleBackPress(props.navigation);
            }}
          >
            <Image
              style={{ width: 24, height: 24 }} // Adjust based on expected size
              source={require("../../assets/images/btnGear.png")}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={styles.containerMiddle}
        onLayout={(event) => handleContainerMiddleLayout(event)}
      >
        <GestureHandlerRootView
        // onLayout={(event) => handleGestureHandlerRootViewLayout(event)}
        >
          <GestureDetector gesture={props.combinedGestures}>
            <View style={styles.vwVolleyballCourt}>
              <Image
                source={require("../../assets/images/imgVollyballCourt.png")}
                alt="imgVollyballCourt"
                // width="100" // Ensures it takes the full width of the container
                // height="100" // Ensures it takes the full height of vwVollyballCourt
                resizeMode="contain" // Prevents stretching
                style={styles.imgVolleyBallCourt}
                onLayout={(event) => handleImageLayout(event)}
              />
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
        <View style={styles.vwScriptingManagement}>
          {/* <View style={styles.vwScriptingManagementLeft}>
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
          </View> */}
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
      <View style={styles.containerBottom}>
        <View
          style={[
            styles.vwBlackLineDivider,
            { width: Dimensions.get("window").width },
          ]}
        />
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
          <View style={styles.vwScriptingManagementLeft}>
            <ButtonKv
              onPress={() => {
                Alert.alert("start");
              }}
              style={{ backgroundColor: "#970F9A", width: 100, fontSize: 25 }}
            >
              Start
            </ButtonKv>
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
    // borderWidth: 1,
    // borderStyle: "dashed",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  vwTopCenterBlurryCapsule: {
    flexDirection: "row",
    width: "80%",
    // borderWidth: 1,
    // borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#806181",
    borderRadius: 24,
    gap: 15,
  },
  vwPositionCapsule: {
    // backgroundColor: "gray",
  },
  vwTeamName: {
    backgroundColor: "#806181",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  txtTeamName: {
    color: "white",
  },
  vwSetCircles: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "green",
  },
  touchOpSetsCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    marginHorizontal: 1,
    backgroundColor: "white",
  },
  touchOpSetsCircleFilled: {
    backgroundColor: "gray",
  },
  vwSettingsGearBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerMiddle: {
    flex: 1,
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  vwVolleyballCourt: {
    // backgroundColor: "green",
    justifyContent: "center",
  },
  imgVolleyBallCourt: {
    alignSelf: "center", // <-- necessary for centering image
    height: "95%",
    // width: undefined,
    aspectRatio: 16 / 9, // <-- necessary for good sizing of image
    resizeMode: "contain",
  },
  vwScriptingManagement: {
    position: "absolute",
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    // backgroundColor: "green",
  },

  vwScriptingManagementRight: {
    flexDirection: "row",
  },
  vwScriptingManagementRightLeft: {
    // padding: 10,
    // margin: 10,
    gap: 20,
  },
  vwScriptingManagementRightRight: {
    paddingTop: 20,
    // margin: 10,
    gap: 20,
  },
  containerBottom: {
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  vwBlackLineDivider: {
    // width: Dimensions.get("window").width,
    height: 10,
    backgroundColor: "#310732",
  },
  vwActionDetails: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: "5%",
    // paddingRight: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    flexDirection: "row",
    // minHeight: 100,
    // alignItems: "flex-start",
    width: "40%",
    gap: "2%",
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
});

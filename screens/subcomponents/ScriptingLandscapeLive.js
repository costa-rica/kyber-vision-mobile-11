import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import SinglePickerWithSideBorders from "./pickers/SinglePickerWithSideBorders";
import DoublePickerWithSideBorders from "./pickers/DoublePickerWithSideBorders";
import { useState } from "react";

export default function ScriptingLandscapeLive(props) {
  const handleBackPress = async (navigation) => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    navigation.goBack();
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
              // elementsArray={props.scoreOptions}
              // setSelectedElement={props.setScoreTeamAnalyzed}
              // selectedElement={props.scoreTeamAnalyzed}
              // setSelectedElement02={props.setScoreTeamOpponent}
              // selectedElement02={props.scoreTeamOpponent}
              // itemHeight={props.stdPickerHeightLandscape}
              // elementsFontSize={props.stdPickerFontSizeLandscape}
              // parentViewWidth={props.stdPickerParentViewWidth}
              // elementPickerBorderRadius={props.stdPickerBorderRadius}
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
      <View style={styles.containerMiddle}>
        <View style={styles.vwVolleyballCourt}>
          <Image
            source={require("../../assets/images/imgVollyballCourt.png")}
            alt="imgVollyballCourt"
            // width="100" // Ensures it takes the full width of the container
            // height="100" // Ensures it takes the full height of vwVollyballCourt
            resizeMode="contain" // Prevents stretching
            style={styles.imgVolleyBallCourt}
          />
        </View>
      </View>
      <View style={styles.containerBottom}>
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
              onChange={props.setPlayer}
              value={props.player}
              style={{ ...props.stdPickerStyle, width: 60, fontSize: 18 }}
            />
          </View>
          <View style={styles.vwActionDetailsType}>
            <SinglePickerWithSideBorders
              arrayElements={props.table03data}
              onChange={props.setType}
              value={props.type}
              style={{ ...props.stdPickerStyle, width: 50, fontSize: 20 }}
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
        <Text>Bottom</Text>
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
    borderWidth: 1,
    borderStyle: "dashed",
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
    borderWidth: 1,
    borderStyle: "dashed",
  },
  vwVolleyballCourt: {
    // backgroundColor: "green",
    justifyContent: "center",
  },
  imgVolleyBallCourt: {
    alignSelf: "center", // <-- necessary for centering image
    // height: 305, // Match the height of vwVollyballCourt
    // // width: undefined, // Let the width adjust based on the image aspect ratio
    // aspectRatio: 1, // Ensures the width is determined by the image's natural aspect ratio
    // resizeMode: "contain", // Prevents distortion
    // backgroundColor: "green",
    height: "95%",
    width: undefined,
    aspectRatio: 16 / 9, // Replace with the correct aspect ratio of your image
    resizeMode: "contain",
  },
  containerBottom: {
    borderWidth: 1,
    borderStyle: "dashed",
  },

  vwActionDetails: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    flexDirection: "row",
    // minHeight: 100,
    alignItems: "flex-start",
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

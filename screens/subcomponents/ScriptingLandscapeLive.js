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
              elementsArray={["P1", "P2", "P3", "P4", "P5", "P6"]}
              setSelectedElement={props.setPositionalFormation}
              selectedElement={props.positionalFormation}
              itemHeight={props.stdPickerHeightLandscape}
              elementsFontSize={props.stdPickerFontSizeLandscape}
              parentViewWidth={40}
              elementPickerBorderRadius={15}
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
              elementsArray={props.scoreOptions}
              setSelectedElement={props.setScoreTeamAnalyzed}
              selectedElement={props.scoreTeamAnalyzed}
              setSelectedElement02={props.setScoreTeamOpponent}
              selectedElement02={props.scoreTeamOpponent}
              itemHeight={props.stdPickerHeightLandscape}
              elementsFontSize={props.stdPickerFontSizeLandscape}
              parentViewWidth={props.stdPickerParentViewWidth}
              elementPickerBorderRadius={props.stdPickerBorderRadius}
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
        <View style={styles.vwVollyballCourt}>
          <Image
            source={require("../../assets/images/imgVollyballCourt.png")}
            alt="imgVollyballCourt"
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.containerBottom}>
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
    borderWidth: 1,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center ",
  },
  vwVollyballCourt: {
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center ",
  },
  containerBottom: {
    borderWidth: 1,
    borderStyle: "dashed",
  },
});

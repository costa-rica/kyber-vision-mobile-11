import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import SinglePickerWithSideBorders from "./pickers/SinglePickerWithSideBorders";
import DoublePickerWithSideBorders from "./pickers/DoublePickerWithSideBorders";
import { useState } from "react";
import ButtonKv from "./ButtonKv";

export default function ScriptingPortraitLive(props) {
  return (
    <View style={styles.container}>
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
                elementsArray={props.setOptions}
                itemHeight={props.stdPickerHeight}
                setSelectedElement={props.setSetsTeamAnalyzed}
                selectedElement={props.setsTeamAnalyzed}
                elementsFontSize={props.stdPickerFontSize}
                parentViewWidth={props.stdPickerParentViewWidth}
              />
            </View>
            {/* <View style={{ flex: 1 }} /> */}
            <View style={styles.vwScoreBothTeamsScores}>
              <DoublePickerWithSideBorders
                elementsArray={props.scoreOptions}
                setSelectedElement={props.setScoreTeamAnalyzed}
                selectedElement={props.scoreTeamAnalyzed}
                setSelectedElement02={props.setScoreTeamOpponent}
                selectedElement02={props.scoreTeamOpponent}
                itemHeight={props.stdPickerHeight}
                elementsFontSize={props.stdPickerFontSize}
                parentViewWidth={props.stdPickerParentViewWidth}
                elementPickerBorderRadius={props.stdPickerBorderRadius}
              />
            </View>

            {/* Belongs to Score SinglePickerWithSideBorders */}
            <View style={styles.vwScoreSetTeamOpponent}>
              <SinglePickerWithSideBorders
                elementsArray={props.setOptions}
                setSelectedElement={props.setSetsTeamOpponent}
                selectedElement={props.setsTeamOpponent}
                itemHeight={props.stdPickerHeight}
                elementsFontSize={props.stdPickerFontSize}
                parentViewWidth={props.stdPickerParentViewWidth}
                elementPickerBorderRadius={props.stdPickerBorderRadius}
              />
            </View>
          </View>

          <View style={styles.vwScorePoistionalFormation}>
            <SinglePickerWithSideBorders
              elementsArray={["P1", "P2", "P3", "P4", "P5", "P6"]}
              setSelectedElement={props.setPositionalFormation}
              selectedElement={props.positionalFormation}
              itemHeight={props.stdPickerHeight}
              elementsFontSize={20}
              parentViewWidth={40}
              elementPickerBorderRadius={15}
            />
          </View>
        </View>
        <View style={styles.vwVollyballCourt}>
          <Image
            // source={require("../../assets/images/imgVollyballCourt.png")}
            source={require("../../assets/images/imgVollyballCourt.png")}
            alt="imgVollyballCourt"
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.vwBlackLineDivider} />
        <View style={styles.vwActionDetails}>
          <View style={styles.vwActionDetailsQuality}>
            {/* Belongs to Quailty */}
            <SinglePickerWithSideBorders
              elementsArray={[-2, -1, 0, 1, 2]}
              setSelectedElement={props.setQuality}
              selectedElement={props.quality}
              itemHeight={props.stdPickerHeight}
              elementsFontSize={props.stdPickerFontSize}
              parentViewWidth={props.stdPickerParentViewWidth}
              elementPickerBorderRadius={props.stdPickerBorderRadius}
            />
          </View>
          <View style={styles.vwActionDetailsPosition}>
            <SinglePickerWithSideBorders
              elementsArray={[1, 2, 3, 4, 5, 6]}
              setSelectedElement={props.setPosition}
              selectedElement={props.position}
              // selectedElement={5}
              itemHeight={props.stdPickerHeight}
              elementsFontSize={props.stdPickerFontSize}
              parentViewWidth={props.stdPickerParentViewWidth}
              elementPickerBorderRadius={props.stdPickerBorderRadius}
            />
          </View>
          <View style={styles.vwActionDetailsPlayer}>
            <SinglePickerWithSideBorders
              //   elementsArray={[1, 2, 3]}
              elementsArray={props.truncateArrayElements(props.table02data, 4)}
              setSelectedElement={props.setPlayer}
              selectedElement={props.player}
              itemHeight={props.stdPickerHeight}
              elementsFontSize={18}
              parentViewWidth={60}
              elementPickerBorderRadius={props.stdPickerBorderRadius}
              cutoff={4}
            />
            {/* <View style={styles.vwSpacer} /> */}
            {/* <View style={styles.vwBlackLineDivider} /> */}
          </View>
          <View style={styles.vwActionDetailsType}>
            <SinglePickerWithSideBorders
              elementsArray={props.table03data}
              setSelectedElement={props.setType} // Pass callback function
              selectedElement={props.type}
              itemHeight={props.stdPickerHeight}
              elementsFontSize={20}
              parentViewWidth={50}
              elementPickerBorderRadius={props.stdPickerBorderRadius}
            />
          </View>
          <View style={styles.vwActionDetailsSubtype}>
            <SinglePickerWithSideBorders
              elementsArray={props.truncateArrayElements(props.table04data, 4)}
              setSelectedElement={props.setSubtype} // Pass callback function
              selectedElement={props.subtype}
              itemHeight={props.stdPickerHeight}
              elementsFontSize={15}
              parentViewWidth={60}
              elementPickerBorderRadius={props.stdPickerBorderRadius}
            />
          </View>
        </View>
        <View style={styles.vwScriptingManagement}>
          {/* <Text>selected player: {player}</Text> */}
          <View style={styles.vwScriptingManagementLeft}>
            <ButtonKv
              onPress={() => {
                console.log("start something ... and change position");
                setPosition((prev) => prev + 1);
              }}
              colorBackground={"#970F9A"}
              colorText={"white"}
              width={140}
              fontSize={20}
            >
              Start
            </ButtonKv>
          </View>
          <View style={styles.vwScriptingManagementRight}>
            <View style={styles.vwScriptingManagementRightLeft}>
              <ButtonKv
                onPress={() => console.log("presssed S")}
                colorBackground={"#310732"}
                colorText={"white"}
                width={40}
                fontSize={20}
              >
                S
              </ButtonKv>
              <ButtonKv
                onPress={() => console.log("presssed R")}
                colorBackground={"#310732"}
                colorText={"white"}
                width={40}
                fontSize={20}
              >
                R
              </ButtonKv>
            </View>
            <View style={styles.vwScriptingManagementRightRight}>
              <ButtonKv
                onPress={() => console.log("presssed W")}
                colorBackground={"#970F9A"}
                colorText={"white"}
                width={40}
                fontSize={20}
              >
                W
              </ButtonKv>
              <ButtonKv
                onPress={() => console.log("presssed L")}
                colorBackground={"#970F9A"}
                colorText={"white"}
                width={40}
                fontSize={20}
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
  },
  vwScriptingManagementLeft: {
    padding: 20,
    // backgroundColor: "gray",
    margin: 20,
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

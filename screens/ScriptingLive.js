import { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import TemplateView from "./subcomponents/TemplateView";
import ButtonKv from "./subcomponents/ButtonKv";
import SwitchKv from "./subcomponents/SwitchKv";
import CustomPicker from "./subcomponents/pickers/CustomPicker";
import SinglePickerWithSideBorders from "./subcomponents/pickers/SinglePickerWithSideBorders";
import DoublePickerWithSideBorders from "./subcomponents/pickers/DoublePickerWithSideBorders";

const table01data = {
  User41: "Ted",
  User42: "Sarah",
  User56: "Jeremy",
  User62: "Melody",
};
const table02data = ["Lea", "Odeyssa", "Yoann", "Johanne"];
const table03data = ["Def", "Set", "Att"];
const setOptions = Array.from({ length: 5 }, (_, i) => i + 1);
const scoreOptions = Array.from({ length: 25 }, (_, i) => i + 1);
export default function ScriptingLive({ navigation }) {
  // Standardized Picker UI Parameters
  const stdPickerHeight = 40;
  const stdPickerFontSize = 25;
  const stdPickerParentViewWidth = 40;
  const stdPickerBorderRadius = 15;

  // Belongs to Set Team Analyzed SinglePickerWithSideBorders
  const [setTeamAnalyzed, setSetTeamAnalyzed] = useState(0);
  // Belongs to Score Team Analyzed SinglePickerWithSideBorders
  const [scoreTeamAnalyzed, setScoreTeamAnalyzed] = useState(0);
  // Belongs to Score Team Opponentn SinglePickerWithSideBorders
  const [scoreTeamOpponent, setScoreTeamOpponent] = useState(0);
  // Belongs to positional formation SinglePickerWithSideBorders
  const [positionalFormation, setPositionalFormation] = useState("P1");
  const [quality, setQuality] = useState(0);
  const [position, setPosition] = useState(0);
  const [player, setPlayer] = useState(table02data[0]);
  const [type, setType] = useState(table03data[0]);

  // --- Dynamic styles ---

  const styleVwVerticalLineLeft = {
    position: "absolute",
    top: stdPickerHeight * 0.2,
    left: 5,
    borderColor: "white",
    borderWidth: 1,
    height: stdPickerHeight * 0.6,
    width: 1,
    zIndex: 100,
  };
  const styleVwVerticalLineRight = {
    position: "absolute",
    top: stdPickerHeight * 0.2,
    right: 5,
    borderColor: "white",
    borderWidth: 1,
    height: stdPickerHeight * 0.6,
    width: 1,
    zIndex: 100,
  };

  // const vwSetTeamAnalyzedPicker = {
  //   backgroundColor: "black",
  //   borderRadius: setTeamAnalyzedPickerBorderRadius,
  // };

  return (
    <TemplateView navigation={navigation} hideSettings={true} noGrayBand={true}>
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
                elementsArray={setOptions}
                setSelectedNumber={setSetTeamAnalyzed} // Pass callback function
                itemHeight={stdPickerHeight}
                elementsFontSize={stdPickerFontSize}
                parentViewWidth={stdPickerParentViewWidth}
                elementPickerBorderRadius={stdPickerBorderRadius}
              />
            </View>
            {/* <View style={{ flex: 1 }} /> */}
            <View style={styles.vwScoreBothTeamsScores}>
              <DoublePickerWithSideBorders
                elementsArray={scoreOptions}
                setSelectedNumber={setScoreTeamAnalyzed} // Pass callback function
                setSelectedNumber02={setScoreTeamOpponent} // Pass callback function
                itemHeight={stdPickerHeight}
                elementsFontSize={stdPickerFontSize}
                parentViewWidth={stdPickerParentViewWidth}
                elementPickerBorderRadius={stdPickerBorderRadius}
              />
            </View>

            {/* Belongs to Score SinglePickerWithSideBorders */}
            <View style={styles.vwScoreSetTeamOpponent}>
              {/* <View style={{ flex: 1 }} /> */}
              <SinglePickerWithSideBorders
                elementsArray={setOptions}
                setSelectedNumber={setScoreTeamOpponent} // Pass callback function
                itemHeight={stdPickerHeight}
                elementsFontSize={stdPickerFontSize}
                parentViewWidth={stdPickerParentViewWidth}
                elementPickerBorderRadius={stdPickerBorderRadius}
              />
            </View>
          </View>

          <View style={styles.vwScorePoistionalFormation}>
            <SinglePickerWithSideBorders
              elementsArray={["P1", "P2", "P3"]}
              setSelectedNumber={setPositionalFormation} // Pass callback function
              itemHeight={stdPickerHeight}
              elementsFontSize={20}
              parentViewWidth={40}
              elementPickerBorderRadius={15}
            />
          </View>
        </View>
        <View style={styles.vwVollyballCourt}>
          <Image
            // source={require("../../assets/images/imgVollyballCourt.png")}
            source={require("../assets/images/imgVollyballCourt.png")}
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
              setSelectedNumber={setQuality} // Pass callback function
              itemHeight={stdPickerHeight}
              elementsFontSize={stdPickerFontSize}
              parentViewWidth={stdPickerParentViewWidth}
              elementPickerBorderRadius={stdPickerBorderRadius}
            />
          </View>
          <View style={styles.vwActionDetailsPosition}>
            <SinglePickerWithSideBorders
              elementsArray={[1, 2, 3, 4, 5, 6]}
              setSelectedNumber={setPosition} // Pass callback function
              itemHeight={stdPickerHeight}
              elementsFontSize={stdPickerFontSize}
              parentViewWidth={stdPickerParentViewWidth}
              elementPickerBorderRadius={stdPickerBorderRadius}
            />
          </View>
          <View style={styles.vwActionDetailsPlayer}>
            <SinglePickerWithSideBorders
              elementsArray={table02data}
              setSelectedNumber={setPlayer} // Pass callback function
              itemHeight={stdPickerHeight}
              elementsFontSize={stdPickerFontSize}
              // parentViewWidth={60}
              parentViewWidth={player.length * 20}
              elementPickerBorderRadius={stdPickerBorderRadius}
            />
            {/* <View style={styles.vwSpacer} /> */}
            {/* <View style={styles.vwBlackLineDivider} /> */}
          </View>
          <View style={styles.vwActionDetailsType}>
            <SinglePickerWithSideBorders
              elementsArray={table03data}
              setSelectedNumber={setType} // Pass callback function
              itemHeight={stdPickerHeight}
              elementsFontSize={stdPickerFontSize}
              parentViewWidth={type.length * 20}
              // parentViewWidth={stdPickerParentViewWidth}
              elementPickerBorderRadius={stdPickerBorderRadius}
            />
          </View>
        </View>
        <View styles={styles.vwTest}>
          <Text>selected player: {player}</Text>
        </View>
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
  },
  containerTop: {
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
    paddingTop: 20,
  },

  // -------- BOTTOM --------

  containerBottom: {
    flex: 1,
    // backgroundColor: "#F2EBF2",
    // backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  vwBlackLineDivider: {
    width: Dimensions.get("window").width,
    height: 10,
    backgroundColor: "#310732",
  },
  vwActionDetails: {
    // paddingLeft: 10,
    // paddingRight: 10,
    backgroundColor: "green",
    // justifyContent: "flex-start",
    // justifyContent: "space-between",
    flexDirection: "row",
  },
  vwActionDetailsQuality: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
  },
  vwActionDetailsPosition: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
  },
  vwActionDetailsPlayer: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
  },
  vwSpacer: {
    flex: 1,
    // backgroundColor: "purple",
    // height: "100%",
    // widht: 20,
    // width: Dimensions.get("window").width,
    height: 10,
    backgroundColor: "purple",
  },
  // Goes with Picker to DoublePickerWithSideBorders
  // pickerContainer: {
  //   backgroundColor: "black",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   borderRadius: 15,
  // },
});

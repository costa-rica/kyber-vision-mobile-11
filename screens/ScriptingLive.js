import { useEffect, useState } from "react";
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
import SinglePickerWithSideBorders from "./subcomponents/pickers/SinglePickerWithSideBorders";
import DoublePickerWithSideBorders from "./subcomponents/pickers/DoublePickerWithSideBorders";
import CustomPicker from "./subcomponents/pickers/CustomPicker";

const table01data = {
  User41: "Ted",
  User42: "Sarah",
  User56: "Jeremy",
  User62: "Melody",
};
const table02data = ["Lea", "Odeyssa", "Yoann", "Johanne"];
const table03data = ["Def", "Set", "Att"];
const table04data = ["DefSub", "SetSub", "AttSub"];
const setOptions = Array.from({ length: 3 }, (_, i) => i + 1);
const scoreOptions = Array.from({ length: 25 }, (_, i) => i + 1);
export default function ScriptingLive({ navigation }) {
  // Standardized Picker UI Parameters
  const stdPickerHeight = 60;
  const stdPickerFontSize = 25;
  const stdPickerParentViewWidth = 40;
  const stdPickerBorderRadius = 15;

  // Belongs to Set Team Analyzed SinglePickerWithSideBorders
  const [setTeamAnalyzed, setSetTeamAnalyzed] = useState(1);
  // Belongs to Score Team Analyzed SinglePickerWithSideBorders
  const [scoreTeamAnalyzed, setScoreTeamAnalyzed] = useState(1);
  // Belongs to Score Team Opponentn SinglePickerWithSideBorders
  const [scoreTeamOpponent, setScoreTeamOpponent] = useState(1);
  const [setTeamOpponent, setSetTeamOpponent] = useState(1);
  // Belongs to positional formation SinglePickerWithSideBorders
  const [positionalFormation, setPositionalFormation] = useState("P1");
  const [quality, setQuality] = useState(0);
  const [position, setPosition] = useState(1);
  const [player, setPlayer] = useState(table02data[0]);
  const [type, setType] = useState(table03data[0]);
  const [subtype, setSubtype] = useState(table04data[0]);

  useEffect(() => {}, [position]);
  // --- Dynamic styles ---
  const truncateArrayElements = (arr, maxLength) => {
    return arr.map((item) =>
      item.length > maxLength ? item.substring(0, maxLength) : item
    );
  };

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
                itemHeight={stdPickerHeight}
                setSelectedElement={setSetTeamAnalyzed}
                selectedElement={setTeamAnalyzed}
                elementsFontSize={stdPickerFontSize}
                parentViewWidth={stdPickerParentViewWidth}
              />
            </View>
            {/* <View style={{ flex: 1 }} /> */}
            <View style={styles.vwScoreBothTeamsScores}>
              <DoublePickerWithSideBorders
                elementsArray={scoreOptions}
                setSelectedElement={setScoreTeamAnalyzed}
                selectedElement={scoreTeamAnalyzed}
                setSelectedElement02={setScoreTeamOpponent}
                selectedElement02={scoreTeamOpponent}
                itemHeight={stdPickerHeight}
                elementsFontSize={stdPickerFontSize}
                parentViewWidth={stdPickerParentViewWidth}
                elementPickerBorderRadius={stdPickerBorderRadius}
              />
            </View>

            {/* Belongs to Score SinglePickerWithSideBorders */}
            <View style={styles.vwScoreSetTeamOpponent}>
              <SinglePickerWithSideBorders
                elementsArray={setOptions}
                setSelectedElement={setSetTeamOpponent}
                selectedElement={setTeamOpponent}
                itemHeight={stdPickerHeight}
                elementsFontSize={stdPickerFontSize}
                parentViewWidth={stdPickerParentViewWidth}
                elementPickerBorderRadius={stdPickerBorderRadius}
              />
            </View>
          </View>

          <View style={styles.vwScorePoistionalFormation}>
            <SinglePickerWithSideBorders
              elementsArray={["P1", "P2", "P3", "P4", "P5", "P6"]}
              setSelectedElement={setPositionalFormation}
              selectedElement={positionalFormation}
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
              setSelectedElement={setQuality}
              selectedElement={quality}
              itemHeight={stdPickerHeight}
              elementsFontSize={stdPickerFontSize}
              parentViewWidth={stdPickerParentViewWidth}
              elementPickerBorderRadius={stdPickerBorderRadius}
            />
          </View>
          <View style={styles.vwActionDetailsPosition}>
            <SinglePickerWithSideBorders
              elementsArray={[1, 2, 3, 4, 5, 6]}
              setSelectedElement={setPosition}
              selectedElement={position}
              // selectedElement={5}
              itemHeight={stdPickerHeight}
              elementsFontSize={stdPickerFontSize}
              parentViewWidth={stdPickerParentViewWidth}
              elementPickerBorderRadius={stdPickerBorderRadius}
            />
          </View>
          <View style={styles.vwActionDetailsPlayer}>
            <SinglePickerWithSideBorders
              // elementsArray={table02data}
              elementsArray={truncateArrayElements(table02data, 4)}
              setSelectedElement={setPlayer}
              selectedElement={player}
              itemHeight={stdPickerHeight}
              elementsFontSize={18}
              parentViewWidth={60}
              elementPickerBorderRadius={stdPickerBorderRadius}
              cutoff={4}
            />
            {/* <View style={styles.vwSpacer} /> */}
            {/* <View style={styles.vwBlackLineDivider} /> */}
          </View>
          <View style={styles.vwActionDetailsType}>
            <SinglePickerWithSideBorders
              elementsArray={table03data}
              setSelectedElement={setType} // Pass callback function
              selectedElement={type}
              itemHeight={stdPickerHeight}
              elementsFontSize={20}
              parentViewWidth={50}
              elementPickerBorderRadius={stdPickerBorderRadius}
            />
          </View>
          <View style={styles.vwActionDetailsSubtype}>
            <SinglePickerWithSideBorders
              elementsArray={truncateArrayElements(table04data, 4)}
              setSelectedElement={setSubtype} // Pass callback function
              selectedElement={subtype}
              itemHeight={stdPickerHeight}
              elementsFontSize={15}
              parentViewWidth={60}
              elementPickerBorderRadius={stdPickerBorderRadius}
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
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
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

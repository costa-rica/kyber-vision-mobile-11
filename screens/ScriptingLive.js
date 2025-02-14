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
import SinglePickerWithSideBorders from "./subcomponents/pickers/SinglePickerWithSideBorders";
import DoublePickerWithSideBorders from "./subcomponents/pickers/DoublePickerWithSideBorders";
import * as ScreenOrientation from "expo-screen-orientation";
import ScriptingLandscapeLive from "./subcomponents/ScriptingLandscapeLive";
import ScriptingPortraitLive from "./subcomponents/ScriptingPortraitLive";
const table01data = {
  User41: "Ted",
  User42: "Sarah",
  User56: "Jeremy",
  User62: "Melody",
};
const table02data = ["Lea", "Odeyssa", "Yoann", "Johanne"];
const table03data = ["Def", "Set", "Att"];
const table04data = ["DefSub", "SetSub", "AttSub"];
const setOptions = [0, 1, 2, 3];
// const setOptions = Array.from({ length: 3 }, (_, i) => i + 1);
// const setOptions = Array.from({ length: 3 }, (_, i) => i);
// const scoreOptions = Array.from({ length: 25 }, (_, i) => i + 1);
// const scoreOptions = Array.from({ length: 25 }, (_, i) => i);
const scoreOptions = Array.from({ length: 26 }, (_, i) => i);

export default function ScriptingLive({ navigation }) {
  // console.log(`scoreOPtions are: ${scoreOptions}`);
  // Standardized Picker UI Parameters
  // const stdPickerHeight = 60;
  // const stdPickerFontSize = 25;
  // const stdPickerParentViewWidth = 40;
  // const stdPickerBorderRadius = 15;
  // const stdPickerHeightLandscape = 40;
  // const stdPickerFontSizeLandscape = 20;

  const stdPickerStylePortrait = {
    color: "white",
    fontSize: 25,
    backgroundColor: "#310732",
    itemHeight: 60,
    width: 40,
    borderRadius: 15,
  };
  const stdPickerStyleLandscape = {
    color: "white",
    fontSize: 20,
    backgroundColor: "#310732",
    itemHeight: 40,
    width: 40,
    borderRadius: 15,
  };

  // Belongs to Set Team Analyzed SinglePickerWithSideBorders
  const [setsTeamAnalyzed, setSetsTeamAnalyzed] = useState(0);
  // Belongs to Score Team Analyzed SinglePickerWithSideBorders
  const [scoreTeamAnalyzed, setScoreTeamAnalyzed] = useState(0);
  // Belongs to Score Team Opponentn SinglePickerWithSideBorders
  const [scoreTeamOpponent, setScoreTeamOpponent] = useState(0);
  const [setsTeamOpponent, setSetsTeamOpponent] = useState(0);
  // Belongs to positional formation SinglePickerWithSideBorders
  const [positionalFormation, setPositionalFormation] = useState("P1");
  const [quality, setQuality] = useState(0);
  const [position, setPosition] = useState(1);
  const [player, setPlayer] = useState(table02data[0]);
  const [type, setType] = useState(table03data[0]);
  const [subtype, setSubtype] = useState(table04data[0]);

  // orientation
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    // console.log("- Position useEffect");
    ScreenOrientation.unlockAsync();
    checkOrientation();
    const subscriptionScreenOrientation =
      ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    return () => {
      subscriptionScreenOrientation.remove();
      ScreenOrientation.lockAsync();
    };
  });

  const checkOrientation = async () => {
    // console.log("in checkOrientation");
    const orientation = await ScreenOrientation.getOrientationAsync();
    // console.log(`orientation is ${orientation}`);
    if (
      o.orientationInfo.orientation == 4 ||
      o.orientationInfo.orientation == 3
    ) {
      setOrientation("landscape");
    } else {
      setOrientation("portrait");
    }
  };
  const handleOrientationChange = async (o) => {
    // console.log(
    //   `o.orientationInfo.orientation: ${o.orientationInfo.orientation}`
    // );
    setOrientation(o.orientationInfo.orientation);
    if (
      o.orientationInfo.orientation == 4 ||
      o.orientationInfo.orientation == 3
    ) {
      setOrientation("landscape");
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    } else {
      setOrientation("portrait");
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  useEffect(() => {}, [position]);
  // --- Dynamic styles ---
  const truncateArrayElements = (arr, maxLength) => {
    // console.log("- in trucnateArrayEleements");
    // console.log(arr);
    return arr.map((item) =>
      item.length > maxLength ? item.substring(0, maxLength) : item
    );
  };

  // Handles set selection for a team
  // team: "analyzed" | "opponent"
  const handleSetCirclePress = (team, setIndex) => {
    if (team === "analyzed") {
      if (setsTeamAnalyzed === setIndex) {
        setSetsTeamAnalyzed(setIndex - 1);
      } else if (setsTeamAnalyzed + 1 === setIndex) {
        setSetsTeamAnalyzed(setIndex);
      }
    } else {
      if (setsTeamOpponent === setIndex) {
        setSetsTeamOpponent(setIndex - 1);
      } else if (setsTeamOpponent + 1 === setIndex) {
        setSetsTeamOpponent(setIndex);
      }
    }
  };

  return orientation == "landscape" ? (
    // ------ LANDSCAPE ---------
    <ScriptingLandscapeLive
      handleSetCirclePress={handleSetCirclePress}
      setsTeamAnalyzed={setsTeamAnalyzed}
      scoreOptions={scoreOptions}
      setScoreTeamAnalyzed={setScoreTeamAnalyzed}
      scoreTeamAnalyzed={scoreTeamAnalyzed}
      setScoreTeamOpponent={setScoreTeamOpponent}
      scoreTeamOpponent={scoreTeamOpponent}
      setsTeamOpponent={setsTeamOpponent}
      stdPickerStyle={stdPickerStyleLandscape}
      setPositionalFormation={setPositionalFormation}
      positionalFormation={positionalFormation}
      setQuality={setQuality}
      quality={quality}
      setPosition={setPosition}
      position={position}
      truncateArrayElements={truncateArrayElements}
      table02data={table02data}
      setPlayer={setPlayer}
      player={player}
      table03data={table03data}
      setType={setType}
      type={type}
      setSubtype={setSubtype}
      subtype={subtype}
      table04data={table04data}
    />
  ) : (
    <TemplateView navigation={navigation} hideSettings={true} noGrayBand={true}>
      <ScriptingPortraitLive
        stdPickerStyle={stdPickerStylePortrait}
        setOptions={setOptions}
        setSetsTeamAnalyzed={setSetsTeamAnalyzed}
        setsTeamAnalyzed={setsTeamAnalyzed}
        scoreOptions={scoreOptions}
        setScoreTeamAnalyzed={setScoreTeamAnalyzed}
        scoreTeamAnalyzed={scoreTeamAnalyzed}
        setScoreTeamOpponent={setScoreTeamOpponent}
        scoreTeamOpponent={scoreTeamOpponent}
        setSetsTeamOpponent={setSetsTeamOpponent}
        setsTeamOpponent={setsTeamOpponent}
        setPositionalFormation={setPositionalFormation}
        positionalFormation={positionalFormation}
        setQuality={setQuality}
        quality={quality}
        setPosition={setPosition}
        position={position}
        truncateArrayElements={truncateArrayElements}
        table02data={table02data}
        setPlayer={setPlayer}
        player={player}
        table03data={table03data}
        setType={setType}
        type={type}
        setSubtype={setSubtype}
        subtype={subtype}
        table04data={table04data}
      />
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
  },
});

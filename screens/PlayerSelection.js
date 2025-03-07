import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TemplateView from "./subcomponents/TemplateView";
import { setScriptingForPlayerObject } from "../reducers/script";

export default function PlayerSelection({ navigation }) {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const [playerListTop, setPlayerListTop] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    fetchPlayerListApiCall();
  }, []);

  const fetchPlayerListApiCall = async () => {
    console.log(`API URL: ${process.env.EXPO_PUBLIC_API_URL}/players/team/1`);

    try {
      // const response = await fetch(
      //   `${process.env.EXPO_PUBLIC_API_URL}/admin-db/table/Player`
      // );
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/players/team/1`,
        {
          headers: { Authorization: `Bearer ${userReducer.token}` },
        }
      );
      if (response.status !== 200) {
        console.log(`There was a server error: ${response.status}`);
        return;
      }

      const resJson = await response.json();
      // console.log(resJson);
      setSelectedTeam(resJson.team);
      const tempPlayerList = [];
      for (const elem of resJson.players) {
        tempPlayerList.push(elem);
      }

      setPlayerListTop(tempPlayerList);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const pressSelect = () => {
    if (selectedPlayer) {
      dispatch(setScriptingForPlayerObject(selectedPlayer));
      // navigation.navigate("ScriptingLive");
      navigation.navigate("ScriptingLive03");
    } else {
      alert("Must select a player");
    }
  };

  const PlayerRow = ({ player, onSelect }) => {
    return (
      <TouchableOpacity
        onPress={() => onSelect(player)}
        style={styles.touchOpPlayerRow}
      >
        <Text
          style={[
            styles.playerText,
            { fontSize: player === selectedPlayer ? 20 : 16 },
          ]}
        >
          {player.shirtNumber}/ {player.firstName} {player.lastName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <TemplateView navigation={navigation} hideSettings={true} noGrayBand={true}>
      {/* -------- TOP ----- */}
      <View style={styles.containerTop}>
        <View style={styles.vwLogo}>
          <Image
            style={styles.image}
            source={require("../assets/images/KyberV2shinyV02.png")}
            alt="logo"
            resizeMode="contain"
          />
        </View>
      </View>
      {/* -------- MIDDLE ----- */}
      <View style={styles.containerMiddle}>
        <View style={styles.vwTeamTop}>
          {/* <Text>Team Top</Text> */}
          <View style={styles.vwTeamNameGroup}>
            <Image
              style={styles.image}
              source={require("../assets/images/imgTeamPurple.png")}
              alt="logo"
              resizeMode="contain"
            />
            <View style={styles.vwTeamNameGroupRight}>
              <View style={styles.vwTextTeamName}>
                <Text
                  style={{ color: "#970F9A", fontSize: 16, paddingBottom: 5 }}
                >
                  {selectedTeam?.teamName}
                </Text>
              </View>
              <View
                style={{
                  borderColor: "#970F9A",
                  borderWidth: 1,
                  width: "100%",
                }}
              />
            </View>
          </View>
          <View style={styles.vwFlatList}>
            <FlatList
              data={playerListTop}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <PlayerRow player={item} onSelect={setSelectedPlayer} />
              )}
            />
          </View>
        </View>
        <View style={styles.vwTeamBottom}>
          {/* <Text>Team Bottom</Text> */}
        </View>
        <View style={styles.vwSelection}>
          {/* <Text>Selected player</Text> */}
          <View style={styles.vwSelectedPlayerGroup}>
            <View style={styles.vwSelectedPlayerGroupTop}>
              <Text style={styles.txtSelectedPlayerTeamName}>Team Name </Text>
            </View>
            <View style={styles.vwSelectedPlayerGroupBottom}>
              <View style={styles.vwSelectedPlayerShirtNumber}>
                <Text style={styles.txtShirtNumber}>
                  {selectedPlayer?.shirtNumber}
                </Text>
              </View>
              <View style={styles.vwSelectedPlayerName}>
                <Text style={styles.txtSelectedPlayerName}>
                  {selectedPlayer?.firstName}
                </Text>
                <Text style={styles.txtSelectedPlayerName}>
                  {selectedPlayer?.lastName}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* -------- BOTTOM ----- */}
      <View style={styles.containerBottom}>
        <TouchableOpacity
          style={[
            styles.touchOpButton,
            { backgroundColor: "#970F9A", fontSize: 35 },
          ]}
          onPress={() => {
            // Alert.alert("Select");
            pressSelect();
          }}
        >
          <Text style={styles.txtButton}>Select</Text>
        </TouchableOpacity>
      </View>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  // ----- TOP Container -----
  vwLogo: {
    height: 50,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },

  // ----- MIDDLE Container -----
  containerMiddle: {
    flex: 1,
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    // justifyContent: "space-around",
    // justifyContent: "flex-start",
    // padding: 20,
    alignItems: "flex-start",
    gap: 10,
  },
  vwTeamTop: {
    // backgroundColor: "white",
    height: 200,
    width: "100%",
    // overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
  },
  vwTeamBottom: {
    // backgroundColor: "white",
    height: 200,
    width: "100%",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
  },
  vwSelection: {
    flex: 1,
    // backgroundColor: "white",
    // height: 200,
    width: "100%",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
  },
  vwTeamNameGroup: {
    width: Dimensions.get("window").width * 0.85,
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "white",
    // justifyContent: "flex-end",
    paddingBottom: 5,
    height: 40,
  },
  vwTeamNameGroupRight: {
    paddingLeft: 10,
    paddingRight: 10,
    width: "90%",
    // height: "100%",
    justifyContent: "flex-end",
    // justifyContent: "space-between",
    // backgroundColor: "white",
    // borderBottomWidth: 5,
    // borderBottomColor: "970F9A",
  },
  vwTextTeamName: {
    justifyContent: "center",
    paddingLeft: 10,
  },
  vwFlatList: {
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.8,
    height: 150,
    borderRadius: 10,
  },
  touchOpPlayerRow: {
    padding: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  playerText: {
    fontSize: 16,
  },
  vwSelectedPlayerGroup: {
    borderColor: "#970F9A",
    borderWidth: 1,
    borderRadius: 12,
    padding: 5,
    margin: 10,
  },
  vwSelectedPlayerGroupTop: {
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
  },
  txtSelectedPlayerTeamName: {
    color: "#970F9A",
    fontSize: 30,
    fontWeight: "bold",
  },
  vwSelectedPlayerGroupBottom: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  vwSelectedPlayerShirtNumber: {
    backgroundColor: "#E1B5D5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    // padding: 5,
    width: "15%",
    height: 40,
  },
  txtShirtNumber: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  vwSelectedPlayerName: {
    backgroundColor: "#E1B5D5",
    borderRadius: 12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txtSelectedPlayerName: {
    color: "#970F9A",
    fontSize: 16,
    fontWeight: "bold",
  },
  // ----- BOTTOM Container -----
  containerBottom: {
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    // height: "15%",
    display: "flex",
    alignItems: "center",
    paddingBottom: 20,
  },

  touchOpButton: {
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: Dimensions.get("window").width * 0.8,
  },
  txtButton: {
    color: "white",
    fontSize: 30,
    fontStyle: "italic",
    fontWeight: "bold",
    fontFamily: "ApfelGrotezk",
    // flexWrap: "wrap",
    textAlign: "center",
  },
});

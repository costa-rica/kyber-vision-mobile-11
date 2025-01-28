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

const table01data = {
  User41: "Ted",
  User42: "Sarah",
  User56: "Jeremy",
  User62: "Melody",
};
const table02data = ["Lea", "Odeyssa", "Yoann", "Johanne"];
export default function Admin({ navigation }) {
  const [groupAdmin, setGroupAdmin] = useState(false);
  const [createPlayers, setCreatePlayers] = useState(false);
  const [editScripts, setEditScripts] = useState(false);

  const pressedAButton = (message = "Pressed a button") => {
    const text = `\n\nToggle Switch values: \n\ngroupAdmin: ${groupAdmin} \n createPlayers: ${createPlayers} \n editScripts: ${editScripts}`;
    Alert.alert(`${message} \n ${text}`);
  };

  return (
    <TemplateView navigation={navigation} hideSettings={true} noGrayBand={true}>
      <View style={styles.container}>
        <View style={styles.vwContainerTop}>
          <View style={styles.vwTitle}>
            <Text style={styles.txtTitleAdmin}>Admin</Text>
          </View>
          <View style={styles.vwLogo}>
            <Image
              style={styles.image}
              source={require("../assets/images/KyberV2shinyV02.png")}
              alt="logo"
              resizeMode="contain"
            />
          </View>
          <ButtonKv
            colorBackground={"#970F9A"}
            width={Dimensions.get("window").width * 0.8}
            onPress={() => pressedAButton("Pressed Manage Users button")}
          >
            Manage Users
          </ButtonKv>
          <View style={styles.vwScrollViewUsers}>
            <ScrollView>
              {Object.entries(table01data).map(([key, value], index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.txtUsersRow}>
                    {value} {key}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.vwOptionsMiddle}>
            <View style={styles.vwOptionsMiddleOption}>
              <View style={styles.vwCapsulePurple}>
                <Text style={styles.txtVwCapsulePurple}>Create Admin</Text>
              </View>
              <SwitchKv state={groupAdmin} setState={setGroupAdmin} />
            </View>
            <View style={styles.vwOptionsMiddleOption}>
              <View style={styles.vwCapsulePurple}>
                <Text style={styles.txtVwCapsulePurple}>Create Players</Text>
              </View>
              <SwitchKv state={createPlayers} setState={setCreatePlayers} />
            </View>
            <View style={styles.vwOptionsMiddleOption}>
              <View style={styles.vwCapsulePurple}>
                <Text style={styles.txtVwCapsulePurple}>Edit Scripts</Text>
              </View>
              <SwitchKv state={editScripts} setState={setEditScripts} />
            </View>
          </View>
        </View>
        <View style={styles.containerMiddle}>
          <ButtonKv
            colorBackground={"#970F9A"}
            width={Dimensions.get("window").width * 0.8}
            onPress={() => pressedAButton()}
          >
            Manage Team
          </ButtonKv>

          <View style={styles.vwScrollViewTeam}>
            <ScrollView>
              {table02data.map((elem, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.txtUsersRow}>{elem}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.vwManageTeamButtons}>
            <ButtonKv
              colorBackground={"#E1B5D5"}
              colorText={"#8D0B90"}
              width={Dimensions.get("window").width * 0.4}
              onPress={() => pressedAButton("Pressed Remove Player")}
            >
              Remove Player
            </ButtonKv>
            <ButtonKv
              colorBackground={"#E1B5D5"}
              colorText={"#8D0B90"}
              width={Dimensions.get("window").width * 0.4}
              onPress={() => pressedAButton("Pressed Create player ...")}
            >
              Create player ...
            </ButtonKv>
          </View>
        </View>
      </View>
      {/* -------- BOTTOM ----- */}
      <View style={styles.containerBottom}>
        <View style={styles.vwBottomBand}>
          <TouchableOpacity
            style={styles.touchOpCircleTeamIcon}
            onPress={() => pressedAButton("Pressed Team icon")}
          >
            <Image
              style={styles.imgTeam}
              source={require("../assets/images/teamIcon.png")}
              alt="logo"
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.vwBottomBandInnerRight}
            onPress={() =>
              pressedAButton("Pressed AUC 13 VB - Départementale F")
            }
          >
            <Text style={styles.txtBottomBandInnerRight}>
              AUC 13 VB - Départementale F
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TemplateView>
  );
}

const modalTextSize = 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
  },
  vwContainerTop: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    // backgroundColor: "green",
  },
  vwTitle: {
    borderBottomWidth: 1,
    borderColor: "#970F9A",
    width: 285,
  },
  txtTitleAdmin: {
    fontSize: 20,
    color: "#970F9A",
    fontFamily: "ApfelGrotezk",
    backgroundColor: "#F2EBF2",
    textAlign: "center",
  },
  vwLogo: {
    height: 50,
    width: "100%",
    alignItems: "center",
  },

  vwScrollViewUsers: {
    // flex: 1,
    width: "90%",
    // marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 10,
  },
  txtUsersRow: {
    fontFamily: "ApfelGrotezk",
    textAlign: "center",
    fontSize: 16,
  },

  vwOptionsMiddle: {
    gap: 10,
  },
  vwOptionsMiddleOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 100,
    alignItems: "center",
  },
  vwCapsulePurple: {
    backgroundColor: "#970F9A",
    borderRadius: 35,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  txtVwCapsulePurple: {
    color: "white",
    fontSize: 20,
    fontFamily: "ApfelGrotezk",
  },

  // --------- Middle container -----

  containerMiddle: {
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  vwScrollViewTeam: {
    width: "90%",
    // marginTop: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 10,
  },
  vwManageTeamButtons: {
    flexDirection: "row",
  },

  // ----- BOTTOM Container -----
  containerBottom: {
    // borderTopWidth: 2, // Adjust thickness as needed
    // borderTopColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    // height: "55%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  vwBottomBand: {
    marginTop: 10,
    borderRadius: 35,
    width: "95%",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  touchOpCircleTeamIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#A3A3A3",
    borderRadius: 30, // Makes it a circle
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  imgTeam: {
    width: "50%",
    height: "50%",
    borderRadius: 35, // Match circle's border radius
  },
  vwBottomBandInnerRight: {
    backgroundColor: "#F2EBF2",
    paddingLeft: 5,
  },
  txtBottomBandInnerRight: {
    fontSize: 20,
    color: "#A3A3A3",
    fontFamily: "ApfelGrotezk",
    backgroundColor: "#F2EBF2",
  },
});

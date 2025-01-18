import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Animated,
  Easing,
  Switch,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
export default function VwSettings({ navigation }) {
  // --- Modal ----
  const [isDownload, setIsDownload] = useState(false);
  const [isSync, setIsSync] = useState(false);
  const [isVibrations, setIsVibrations] = useState(false);

  const toggleDownload = () => setIsDownload((previousState) => !previousState);
  const toggleSync = () => setIsSync((previousState) => !previousState);
  const toggleVibrations = () =>
    setIsVibrations((previousState) => !previousState);

  return (
    <View style={styles.modalContent}>
      <View style={styles.modalVwOne}>
        <Text style={styles.modalTxtHeader}>Confidentialité</Text>
      </View>

      <View style={styles.modalVwTwo}>
        <Text style={styles.modalTxt}>Qui peut voir mes stats</Text>
        <TouchableOpacity
          style={styles.modalTouchOp}
          onPress={() => console.log("pressed modal buttton")}
        >
          <Text style={styles.modalTouchOpText}>Moi et mon coach</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modalVwTwo}>
        <Text style={styles.modalTxt}>
          Qui peut faire la revue de mes actions
        </Text>
        <TouchableOpacity
          style={styles.modalTouchOp}
          onPress={() => console.log("pressed modal buttton")}
        >
          <Text style={styles.modalTouchOpText}>Mon équipe</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.modalVwTwo}>
        <Text style={styles.modalTxt}>Qui peut commenter mes actions</Text>
        <TouchableOpacity
          style={styles.modalTouchOp}
          onPress={() => console.log("pressed modal buttton")}
        >
          <Text style={styles.modalTouchOpText}>Mon coach et ma famille</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.modalVwOne}>
        <Text style={styles.modalTxtHeader}>Préférences</Text>
      </View>

      <View style={styles.modalVwTwo}>
        <Text style={styles.modalTxt}>
          Télécharger avec les données mobiles
        </Text>
        <View style={styles.modalVwSwitch}>
          <Switch
            trackColor={{ false: "#ddd", true: "gray" }}
            thumbColor={isDownload ? "white" : "gray"}
            onValueChange={toggleDownload}
            value={isDownload}
            style={styles.modalSwitch}
          />
        </View>
      </View>
      <View style={styles.modalVwTwo}>
        <Text style={styles.modalTxt}>
          Synchroniser les nouvelles vidéos automatiquement
        </Text>
        <View style={styles.modalVwSwitch}>
          <Switch
            trackColor={{ false: "#ddd", true: "gray" }}
            thumbColor={isSync ? "white" : "gray"}
            onValueChange={toggleSync}
            value={isSync}
            style={styles.modalSwitch}
          />
        </View>
      </View>
      <View style={styles.modalVwTwo}>
        <Text style={styles.modalTxt}>
          Synchroniser les nouvelles vidéos automatiquement
        </Text>
        <View style={styles.modalVwSwitch}>
          <Switch
            trackColor={{ false: "#ddd", true: "gray" }}
            thumbColor={isVibrations ? "white" : "gray"}
            onValueChange={toggleVibrations}
            value={isVibrations}
            style={styles.modalSwitch}
          />
        </View>
      </View>
    </View>
  );
}

const modalTextSize = 18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // --------- MODAL -----

  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20, // Rounded borders
    borderColor: "#a3a3a3",
    borderWidth: 4,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 25,
    gap: 10,
  },
  modalVwOne: {
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    paddingTop: 20,
  },

  modalTxtHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    fontSize: modalTextSize,
  },
  modalVwTwo: {
    // backgroundColor: "green",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 5,
  },
  modalTxt: {
    display: "flex",
    justifyContent: "center",
    fontSize: modalTextSize,
    width: "45%",
    flexWrap: "wrap",
    // backgroundColor: "green",
    // paddingRight: 2.5,
  },

  modalTouchOp: {
    backgroundColor: "white",
    borderRadius: 35, // Makes it a circle
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    width: "45%",
    // paddingLeft: 2.5,
  },
  modalTouchOpText: {
    fontSize: modalTextSize,
    flexWrap: "wrap",
    // width: "0%",
  },
  modalVwSwitch: {
    borderRadius: 35, // Makes it a circle
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    width: "45%",
    transform: Platform.OS === "android" ? [{ scale: 1.4 }] : [{ scale: 1.0 }],
  },
  modalSwitch: {
    borderWidth: 1, // Border around the switch
    borderColor: "#ccc", // Border color
    borderRadius: 20, // Rounded corners
  },
});

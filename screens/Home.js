import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  Modal,
  Animated,
  Easing,
  Switch,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, reducerSetScreenDimensions } from "../reducers/user";
import { useSelector } from "react-redux";
import TemplateView from "./subcomponents/TemplateView";
import ButtonKvImage from "./subcomponents/ButtonKvImage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);

  return (
    <TemplateView navigation={navigation}>
      <View style={styles.container}>
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
          <View style={styles.vwWelcome}>
            <Text style={styles.txtWelcome}>Welcome to TribeName</Text>
          </View>
        </View>
        {/* -------- MIDDLE ----- */}
        <View style={styles.containerMiddle}>
          {/* <Text> Middle </Text> */}
          <View style={styles.containerMiddleTop}>
            <View style={styles.vwButtons}>
              <TouchableOpacity
                style={[styles.touchOpButton, { backgroundColor: "#A3A3A3" }]}
                onPress={() => Alert.alert("Scripting")}
              >
                <Text style={styles.txtButton}>Scripting</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchOpButton, { backgroundColor: "#A3A3A3" }]}
                onPress={() => Alert.alert("Video Review")}
              >
                <Text style={styles.txtButton}>Video Review</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchOpButton, { backgroundColor: "#A3A3A3" }]}
                onPress={() => Alert.alert("Upload")}
              >
                <Text style={styles.txtButton}>Upload</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchOpButton, { backgroundColor: "#A3A3A3" }]}
                onPress={() => Alert.alert("Sync")}
              >
                <Text style={styles.txtButton}>Sync</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.vwButtons}>
              <TouchableOpacity
                style={[styles.touchOpButton, { backgroundColor: "#A3A3A3" }]}
                onPress={() => Alert.alert("Analysis")}
              >
                <Text style={styles.txtButton}>Analysis</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchOpButton, { backgroundColor: "#A3A3A3" }]}
                onPress={() => Alert.alert("System Review")}
              >
                <Text style={styles.txtButton}>System Review</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchOpButton, { backgroundColor: "#A3A3A3" }]}
                onPress={() => Alert.alert("Setup")}
              >
                <Text style={styles.txtButton}>Setup</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchOpButton, { backgroundColor: "#A3A3A3" }]}
                onPress={() => Alert.alert("Admin")}
              >
                <Text style={styles.txtButton}>Admin</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.touchOpButton,
              { backgroundColor: "#970F9A", fontSize: 35 },
            ]}
            onPress={() => Alert.alert("Exit")}
          >
            <Text style={styles.txtButton}>Exit</Text>
          </TouchableOpacity>
        </View>
        {/* -------- BOTTOM ----- */}
        <View style={styles.containerBottom}>
          <View style={styles.vwBottomBand}>
            <TouchableOpacity
              style={styles.touchOpCircleTeamIcon}
              onPress={() => Alert.alert("Team Icon")}
            >
              <Image
                style={styles.imgTeam}
                source={require("../assets/images/teamIcon.png")}
                alt="logo"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.vwBottomBandInnerRight}>
              <Text style={styles.txtBottomBandInnerRight}>
                AUC 13 VB - Départementale F
              </Text>
            </TouchableOpacity>
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

  // ----- TOP Container -----
  vwLogo: {
    height: 50,
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  vwWelcome: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  txtWelcome: {
    color: "#8D0B90",
    fontSize: 32,
    fontFamily: "ApfelGrotezk",
    textAlign: "center",
  },
  // ----- MIDDLE Container -----
  containerMiddle: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
  },
  containerMiddleTop: {
    flexDirection: "row",
    // height: "25%",
    display: "flex",
    justifyContent: "center",
  },

  // containerMiddleBottom: {
  //   flex: 1,
  //   display: "flex",
  //   alignItems: "center",
  // },
  vwButtons: {
    flex: 1,
    padding: 5,
    gap: 10,
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
  },
  // vwButtonsLeft: {
  //   flex: 1,
  //   borderWidth: 2, // Adjust thickness as needed
  //   borderColor: "gray", // Change color as desired
  //   borderStyle: "dashed",
  // },
  touchOpButton: {
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  txtButton: {
    color: "white",
    fontSize: 20,
    fontFamily: "ApfelGrotezk",
    // flexWrap: "wrap",
    textAlign: "center",
  },
  // touchOpButton: {
  //   backgroundColor: "#A3A3A3",
  //   marginTop: 10,
  //   borderRadius: 35,
  //   justifyContent: "center",
  //   alignItems: "flex-end",
  //   width: "75%",
  //   padding: 5,
  //   display: "flex",
  //   alignItems: "center",
  //   padding: 25,
  // },
  // txtButton: {
  //   color: "white",
  //   fontSize: 20,
  //   fontFamily: "ApfelGrotezk",
  // },

  // ----- BOTTOM Container -----
  containerBottom: {
    // borderTopWidth: 2, // Adjust thickness as needed
    // borderTopColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    // height: "15%",
    display: "flex",
    alignItems: "center",
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
    width: 70,
    height: 70,
    backgroundColor: "#A3A3A3",
    borderRadius: 35, // Makes it a circle
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgray",
  },
  imgTeam: {
    width: "60%",
    height: "60%",
    borderRadius: 35, // Match circle's border radius
  },
  vwBottomBandInnerRight: {
    backgroundColor: "white",
    paddingLeft: 5,
  },
  txtBottomBandInnerRight: {
    fontSize: 20,
    color: "#A3A3A3",
    fontFamily: "ApfelGrotezk",
    backgroundColor: "#F2EBF2",
  },
});

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
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, reducerSetScreenDimensions } from "../reducers/user";
import { useSelector } from "react-redux";
import TemplateView from "./subcomponents/TemplateView";

export default function SplashScreen({ navigation }) {
  return (
    <TemplateView
      navigation={navigation}
      noBackButton={true}
      hideSettings={true}
      noGrayBand={true}
    >
      <View style={styles.container}>
        {/* -------- TOP ----- */}
        <View style={styles.containerTop}>
          {/* <View style={styles.containerMiddleTop}> */}
          <View style={styles.vwLogo}>
            <Image
              style={styles.image}
              source={require("../assets/images/KyberV2shinyV02.png")}
              alt="logo"
              resizeMode="contain"
            />
          </View>
          <View style={styles.vwWelcome}>
            <Text style={styles.txtWelcome}>Welcome</Text>
          </View>
          {/* </View> */}
        </View>
        <View style={styles.containerBottom}>
          <TouchableOpacity
            style={[styles.touchOpButton, { backgroundColor: "#E1B5D5" }]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.txtButton}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.touchOpButton, { backgroundColor: "#970F9A" }]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.txtButton}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ position: "absolute", bottom: 0, right: 0 }}>
        Version 0.11.0
      </Text>
    </TemplateView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
    // justifyContent: "center",
    paddingTop: 100,
  },

  // ----- TOP -----
  containerTop: {
    // flex: 1,
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    // backgroundColor: "green",
    // display: "flex",
    justifyContent: "center",
  },

  vwLogo: {
    height: 50,
    width: "100%",
    // backgroundColor: "green",
    display: "flex",
    alignItems: "center",
  },

  vwWelcome: {
    //   backgroundColor: "gray",
    paddingTop: 10,
    paddingBottom: 10,
  },
  txtWelcome: {
    color: "#8D0B90",
    fontSize: 50,
    // fontFamily: "Caveat",
    fontFamily: "ApfelGrotezkSemiBold",
    // backgroundColor: "red",
    textAlign: "center",
  },
  containerBottom: {
    // flex: 1,
    // backgroundColor: "gray",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    alignItems: "center",
    paddingTop: 50,
  },
  touchOpButton: {
    backgroundColor: "#A3A3A3",
    marginTop: 10,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "flex-end",
    width: "75%",
    padding: 5,
    display: "flex",
    alignItems: "center",
    padding: 15,
  },
  txtButton: {
    color: "white",
    fontSize: 40,
    fontFamily: "ApfelGrotezk",
  },
});

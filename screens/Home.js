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
import ButtonKvImage from "./subcomponents/ButtonKvImage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import * as ScreenOrientation from "expo-screen-orientation";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const [screenDimensions, setScreenDimensions] = useState({
    portraitHeight: Dimensions.get("window").height,
    portraitWidth: Dimensions.get("window").width,
  });

  useEffect(() => {
    const loginUserApiCall = async () => {
      try {
        console.log(
          `process.env.EXPO_PUBLIC_API_URL: ${process.env.EXPO_PUBLIC_API_URL}`
        );

        const bodyObj = {
          email: process.env.EXPO_PUBLIC_EMAIL,
          password: process.env.EXPO_PUBLIC_PASSWORD,
        };

        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/users/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyObj),
          }
        );

        console.log("received response");

        if (response.status === 200) {
          const resJson = await response.json();
          console.log(resJson);

          dispatch(
            loginUser({
              email: process.env.EXPO_PUBLIC_EMAIL,
              token: resJson.token,
              // myArray: [1, 2, 3, 4],
            })
          );
          console.log(`success: ${userReducer.email}`);
        } else {
          console.log(`There was a server error: ${response.status}`);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        console.log(`An error occurred: ${error.message}`);
      }
    };

    loginUserApiCall();
    dispatch(reducerSetScreenDimensions(screenDimensions));
  }, [screenDimensions]);

  const pressedGear = () => {
    console.log("pressed button ⚙️");
  };

  const correctOrientationFromStart = async () => {
    console.log("in correctOrientationFromStart");
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    // setOrientation(1);
    setScreenDimensions({
      portraitHeight: Dimensions.get("window").height,
      portraitWidth: Dimensions.get("window").width,
    });
    dispatch(reducerSetScreenDimensions(screenDimensions));
    console.log("height: ", Dimensions.get("window").height);
  };

  return screenDimensions.portraitHeight > screenDimensions.portraitWidth ? (
    <TemplateView navigation={navigation} noBackButton={true}>
      <View style={styles.container}>
        {/* -------- MIDDLE ----- */}
        <View style={styles.containerMiddle}>
          <View style={styles.containerMiddleTop}>
            <View style={styles.vwLogo}>
              <Image
                style={styles.image}
                source={require("../assets/images/KyberV2shinyV02.png")}
                alt="logo"
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.containerMiddleBottom}>
            <TouchableOpacity
              style={styles.touchOpButton}
              onPress={() => navigation.navigate("ScriptingMatchSelection")}
            >
              <Text style={styles.txtButton}>Scripting</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchOpButton}>
              <Text style={styles.txtButton}>Analyse</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchOpButton}>
              <Text style={styles.txtButton}>Revue vidéo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.touchOpButton}
              onPress={() => navigation.navigate("Admin")}
            >
              <Text style={styles.txtButton}>Admin</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* -------- BOTTOM ----- */}
        <View style={styles.containerBottom}>
          <View style={styles.vwBottomBand}>
            <TouchableOpacity
              style={styles.touchOpCircleTeamIcon}
              onPress={() => pressedGear()}
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
  ) : (
    <View style={styles.container}>
      <Text>Turn screen over</Text>
      <ButtonKvImage
        onPress={() => {
          console.log("rotate screen to landscape");
          correctOrientationFromStart();
        }}
      >
        <FontAwesomeIcon icon={faRotate} size={20} />
      </ButtonKvImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
  },

  // ----- MIDDLE Container -----
  containerMiddle: {
    flex: 1,
    // borderTopWidth: 2, // Adjust thickness as needed
    // borderTopColor: "gray", // Change color as desired
    // borderStyle: "dashed",
  },
  containerMiddleTop: {
    height: "25%",
    display: "flex",
    justifyContent: "center",
  },
  vwLogo: {
    height: 50,
    width: "100%",
    // backgroundColor: "green",
    display: "flex",
    alignItems: "center",
  },
  containerMiddleBottom: {
    flex: 1,
    display: "flex",
    alignItems: "center",
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
    padding: 25,
  },
  txtButton: {
    color: "white",
    fontSize: 20,
    fontFamily: "ApfelGrotezk",
  },

  // ----- BOTTOM Container -----
  containerBottom: {
    // borderTopWidth: 2, // Adjust thickness as needed
    // borderTopColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    height: "15%",
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

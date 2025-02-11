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
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const [screenDimensions, setScreenDimensions] = useState({
    portraitHeight: Dimensions.get("window").height,
    portraitWidth: Dimensions.get("window").width,
  });

  //   useEffect(() => {
  //     const loginUserApiCall = async () => {
  //       try {
  //         console.log(
  //           `process.env.EXPO_PUBLIC_API_URL: ${process.env.EXPO_PUBLIC_API_URL}`
  //         );

  //         const bodyObj = {
  //           email: process.env.EXPO_PUBLIC_EMAIL,
  //           password: process.env.EXPO_PUBLIC_PASSWORD,
  //         };

  //         const response = await fetch(
  //           `${process.env.EXPO_PUBLIC_API_URL}/users/login`,
  //           {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },
  //             body: JSON.stringify(bodyObj),
  //           }
  //         );

  //         console.log("received response");

  //         if (response.status === 200) {
  //           const resJson = await response.json();
  //           console.log(resJson);

  //           dispatch(
  //             loginUser({
  //               email: process.env.EXPO_PUBLIC_EMAIL,
  //               token: resJson.token,
  //               // myArray: [1, 2, 3, 4],
  //             })
  //           );
  //           console.log(`success: ${userReducer.email}`);
  //         } else {
  //           console.log(`There was a server error: ${response.status}`);
  //         }
  //       } catch (error) {
  //         console.error("Error logging in:", error);
  //         console.log(`An error occurred: ${error.message}`);
  //       }
  //     };

  //     loginUserApiCall();
  //     dispatch(reducerSetScreenDimensions(screenDimensions));
  //   }, [screenDimensions]);
  return (
    <TemplateView navigation={navigation} noBackButton={true}>
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
          <TouchableOpacity
            style={[styles.touchOpButton, { backgroundColor: "#310732" }]}
            onPress={() => console.log("Tuto Mode")}
          >
            <Text style={styles.txtButton}>Tuto Mode</Text>
          </TouchableOpacity>
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

  // ----- MIDDLE Container -----
  containerMiddle: {
    // flex: 1,
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    // backgroundColor: "green",
    display: "flex",
    justifyContent: "center",
  },
  //   containerMiddleTop: {
  //     // height: "25%",
  //     display: "flex",
  //     justifyContent: "center",
  //   },
  vwLogo: {
    height: 50,
    width: "100%",
    // backgroundColor: "green",
    display: "flex",
    alignItems: "center",
  },
  //   containerMiddleBottom: {
  //     // flex: 1,
  //     display: "flex",
  //     alignItems: "center",
  //   },
  vwWelcome: {
    //   backgroundColor: "gray",
    paddingTop: 10,
    paddingBottom: 10,
  },
  txtWelcome: {
    color: "#8D0B90",
    fontSize: 50,
    fontFamily: "ApfelGrotezk",
    // backgroundColor: "red",
    textAlign: "center",
  },
  containerBottom: {
    flex: 1,
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
    padding: 25,
  },
  txtButton: {
    color: "white",
    fontSize: 30,
    fontFamily: "ApfelGrotezk",
  },
});

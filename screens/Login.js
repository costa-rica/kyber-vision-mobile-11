import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
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

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const [screenDimensions, setScreenDimensions] = useState({
    portraitHeight: Dimensions.get("window").height,
    portraitWidth: Dimensions.get("window").width,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        <View style={styles.containerMiddle}>
          <View style={styles.vwInputs}>
            <View style={styles.vwInputWhiteLabel}>
              <View style={styles.vwLoginLabel}>
                <Text style={styles.txtLoginLabel}>Username</Text>
              </View>
              <TextInput
                placeholder={"Username"}
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.inputUsername}
              />
            </View>
            <View style={styles.vwInputWhiteLabel}>
              <View style={styles.vwLoginLabel}>
                <Text style={styles.txtLoginLabel}>Password</Text>
              </View>
              <TextInput
                placeholder={"Password"}
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.inputUsername}
                secureTextEntry={true}
              />
            </View>
          </View>
          <View style={styles.vwButtons}>
            <TouchableOpacity
              style={[styles.touchOpButton, { backgroundColor: "#970F9A" }]}
              onPress={() => console.log("pressed Forgot Password")}
            >
              <Text style={styles.txtButton}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchOpButton, { backgroundColor: "#970F9A" }]}
              onPress={() => console.log("pressed Enter Kyber Vission")}
            >
              <Text style={styles.txtButton}>Enter Kyber Vision</Text>
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
    // width: "100%",
  },

  // ----- Top Container -----
  containerTop: {
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
    // width: "100%",
  },
  vwInputs: {
    height: 200,
    justifyContent: "space-around",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
  },
  vwInputWhiteLabel: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    padding: 10,
    flexDirection: "row",
    gap: 10,
  },
  vwLoginLabel: {
    backgroundColor: "#806181",
    padding: 5,
    borderColor: "#1AFB01",
    borderWidth: 1,
    borderRadius: 12,
  },
  txtLoginLabel: { color: "white" },
  inputUsername: {
    borderColor: "#806181",
    borderWidth: 1,
    borderRadius: 12,
    flex: 1,
    padding: 3,
    paddingLeft: 6,
  },
  vwButtons: {
    flexDirection: "row",
    // backgroundColor: "tan",
    justifyContent: "space-around",
    padding: 10,
    // width: "100%",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
  },
  touchOpButton: {
    // backgroundColor: "#A3A3A3",
    // marginTop: 10,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    padding: 5,
    // display: "flex",
    // alignItems: "center",
    // padding: 25,
  },
  txtButton: {
    color: "white",
    fontSize: 20,
    fontFamily: "ApfelGrotezk",
    // flexWrap: "wrap",
    textAlign: "center",
  },
});

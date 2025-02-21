import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Switch,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";

import SwipePad from "./subcomponents/SwipePad";
import { useEffect, useState, useRef } from "react";
import Slider from "@react-native-community/slider";
import ButtonKv from "./subcomponents/ButtonKv";
import { useDispatch } from "react-redux";
import {
  reducerSetUserSwipePadWheel,
  switchPositionGuides,
} from "../reducers/user";
import { useSelector } from "react-redux";

export default function SwipePadSettings({ route, navigation }) {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.user);
  const demoOption = "4-12";
  const [numTrianglesMiddle, setNumTrianglesMiddle] = useState(4); // 2, 4, or 5
  const [numTrianglesOuter, setNumTrianglesOuter] = useState(12); // 8, 10 or 12
  const [circleRadiusOuter, setCircleRadiusOuter] = useState(
    userReducer.circleRadiusOuter
  );
  const [circleRadiusMiddle, setCircleRadiusMiddle] = useState(
    userReducer.circleRadiusMiddle
  );
  const [circleRadiusInner, setCircleRadiusInner] = useState(
    userReducer.circleRadiusInner
  );
  const circleRadiusOuterRef = useRef(userReducer.circleRadiusOuter);
  const circleRadiusMiddleRef = useRef(userReducer.circleRadiusMiddle);
  const circleRadiusInnerRef = useRef(userReducer.circleRadiusInner);
  const [padPositionCenter, setPadPositionCenter] = useState({ x: 0, y: 0 });

  const [swipePadStartX, setSwipePadStartX] = useState(0);
  const [swipePadStartY, setSwipePadStartY] = useState(0);
  const [scriptPositionGuides, setScriptPositionGuides] = useState(
    userReducer.scriptPositionGuides
  );
  // const [tapDetails, setTapDetails] = useState({
  //   timestamp: "no date",
  //   padPosCenterX: swipePadStartX + circleRadiusOuter / 2 - 2.5,
  //   padPosCenterY: swipePadStartY + circleRadiusOuter / 2 - 2.5,
  // });

  // const calculatePadPositionCenter = (x, y) => {
  //   const centeredX = x - circleRadiusOuter;
  //   const centeredY = y - circleRadiusOuter;
  //   return { x: centeredX, y: centeredY };
  // };

  // ----- Dynamic Styles -----------------
  const styleVwMainPosition = {
    position: "absolute",
    left: padPositionCenter.x, // Center modal horizontally
    top: padPositionCenter.y, // Center modal vertically
  };
  const styleVwSwipePad = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  };
  const {
    swipeColorDict,

    swipeTextStyleDict,
    tableTypeDummyData,
  } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.vwTitle}>
        <Text style={styles.txtTitle}>Customize your wheel</Text>
      </View>

      <View style={styles.vwPositionGuides}>
        <Text style={styles.txtPositionGuides}>
          Show position guides:{userReducer.scriptPositionGuides ? "ON" : "OFF"}
        </Text>
        <View style={styles.vwSwitchPositionGuides}>
          <Switch
            trackColor={{ false: "#ddd", true: "gray" }}
            thumbColor={userReducer.scriptPositionGuides ? "white" : "gray"}
            thumbTintColor="black"
            onValueChange={() => dispatch(switchPositionGuides())}
            value={userReducer.scriptPositionGuides}
            style={styles.switchPositionGuides}
          />
        </View>
      </View>

      <View style={styleVwSwipePad}>
        <SwipePad
          styleVwMainPosition={{}}
          swipeColorDict={swipeColorDict}
          swipeTextStyleDict={swipeTextStyleDict}
          numTrianglesMiddle={numTrianglesMiddle}
          numTrianglesOuter={numTrianglesOuter}
          tableTypeDummyData={tableTypeDummyData}
        />
      </View>

      <View style={styles.vwSlider}>
        <Text style={styles.txtLabel}>Outer Circle: {circleRadiusOuter}</Text>

        <Slider
          style={{ width: 300, height: 20 }}
          minimumValue={60}
          maximumValue={120}
          step={1}
          value={circleRadiusOuter}
          onValueChange={(value) => {
            circleRadiusOuterRef.current = value; // Update ref only
          }}
          onSlidingComplete={(value) => {
            setCircleRadiusOuter(value); // Only update state after sliding stops
            dispatch(
              reducerSetUserSwipePadWheel({
                circleRadiusOuter: value,
                circleRadiusMiddle: circleRadiusMiddleRef.current,
                circleRadiusInner: circleRadiusInnerRef.current,
              })
            ); // Save to Redux
          }}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#8E8E93"
          thumbTintColor="#1EB1FC"
        />
        <Text style={styles.txtLabel}>
          Middle Circle : {circleRadiusMiddle}
        </Text>

        <Slider
          style={{ width: 300, height: 20 }}
          minimumValue={30}
          maximumValue={90}
          step={1}
          value={circleRadiusMiddle}
          onValueChange={(value) => {
            circleRadiusMiddleRef.current = value; // Update ref only
          }}
          onSlidingComplete={(value) => {
            setCircleRadiusMiddle(value); // Only update state after sliding stops
            dispatch(
              reducerSetUserSwipePadWheel({
                circleRadiusOuter: circleRadiusOuterRef.current,
                circleRadiusMiddle: value,
                circleRadiusInner: circleRadiusInnerRef.current,
              })
            ); // Save to Redux
          }}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#8E8E93"
          thumbTintColor="#1EB1FC"
        />
        <Text style={styles.txtLabel}>Center : {circleRadiusInner}</Text>

        <Slider
          style={{ width: 300, height: 20 }}
          minimumValue={10}
          maximumValue={60}
          step={1}
          value={circleRadiusInner}
          onValueChange={(value) => {
            circleRadiusInnerRef.current = value; // Update ref only
          }}
          onSlidingComplete={(value) => {
            setCircleRadiusInner(value); // Only update state after sliding stops
            dispatch(
              reducerSetUserSwipePadWheel({
                circleRadiusOuter: circleRadiusOuterRef.current,
                circleRadiusMiddle: circleRadiusMiddleRef.current,
                circleRadiusInner: value,
              })
            ); // Save to Redux
          }}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#8E8E93"
          thumbTintColor="#1EB1FC"
        />
      </View>

      <View style={{ padding: 20 }}>
        <ButtonKv
          style={{
            width: Dimensions.get("window").width * 0.8,
            backgroundColor: "#970F9A",
          }}
          onPress={() => {
            navigation.goBack();
            dispatch(
              reducerSetUserSwipePadWheel({
                circleRadiusOuter,
                circleRadiusMiddle,
                circleRadiusInner,
              })
            );
          }}
        >
          Confirm and go back
        </ButtonKv>
        <ButtonKv
          style={{ width: Dimensions.get("window").width * 0.8 }}
          onPress={() => {
            // navigation.goBack();
            // if (Platform.OS == "ios") {
            setCircleRadiusOuter(90);
            setCircleRadiusMiddle(60);
            setCircleRadiusInner(30);
            // }
            dispatch(
              reducerSetUserSwipePadWheel({
                circleRadiusOuter: 90,
                circleRadiusMiddle: 60,
                circleRadiusInner: 30,
              })
            );
          }}
        >
          Reset Default
        </ButtonKv>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    alignItems: "center",
  },
  vwTitle: {
    paddingTop: 50,
    paddingBottom: 20,
  },
  txtTitle: {
    fontSize: 30,
    color: "#fff",
  },
  vwPositionGuides: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  vwSwitchPositionGuides: {
    borderRadius: 35, // Makes it a circle
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    // width: "45%",
    transform: Platform.OS === "android" ? [{ scale: 1.4 }] : [{ scale: 1.0 }],
  },
  switchPositionGuides: {
    borderWidth: 1, // Border around the switch
    borderColor: "black", // Border color
    borderRadius: 20, // Rounded corners
  },
  vwSlider: {
    marginTop: 20,
    alignItems: "center",
  },
  txtLabel: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 5,
  },
});

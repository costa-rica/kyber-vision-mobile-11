import React, { useRef, useState } from "react";
import { Animated, Pressable, View, Text } from "react-native";

const ButtonKv = ({
  onPress,
  // colorBackground = "#A3A3A3",
  // colorText = "white",
  // width = 140,
  // fontSize = 20,
  style,
  children,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Define default styles
  const defaultStyles = {
    width: 140,
    height: 40,
    borderRadius: 35,
    backgroundColor: "#A3A3A3",
    fontSize: 20,
    color: "white",
    fontWeight: "",
    padding: 5,
    justifyContentBool: false,
  };
  // Merge provided style with default styles
  const mergedStyle = { ...defaultStyles, ...style };
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
    mergedStyle.backgroundColor
  );
  const handlePressIn = () => {
    setCurrentBackgroundColor("gray"); // Change color on press
    Animated.spring(scaleValue, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setCurrentBackgroundColor(mergedStyle.backgroundColor); // Revert color when press is released
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Call the onPress function passed as a prop
    if (onPress) {
      onPress();
    }
  };

  const styleView = {
    backgroundColor: currentBackgroundColor,
    padding: mergedStyle.padding,
    borderRadius: mergedStyle.borderRadius,
    width: mergedStyle.width,
    height: mergedStyle.height,
    justifyContent: mergedStyle.justifyContentBool ? "center" : null,
    alignItems: "center",
  };
  const styleText = {
    fontSize: mergedStyle.fontSize,
    color: mergedStyle.color,
    // textAlign: "center",
    fontFamily: "ApfelGrotezk",
    // backgroundColor: "green",
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styleView}
      >
        <Text style={styleText}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default ButtonKv;

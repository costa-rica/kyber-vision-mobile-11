import React, { useRef, useState } from "react";
import { Animated, Pressable, View, Text } from "react-native";

const ButtonKv = ({
  onPress,
  colorBackground = "#A3A3A3",
  colorText = "white",
  width = 140,
  fontSize = 20,
  children,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    useState(colorBackground);

  const handlePressIn = () => {
    setCurrentBackgroundColor("gray"); // Change color on press
    Animated.spring(scaleValue, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setCurrentBackgroundColor(colorBackground); // Revert color when press is released
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
    padding: 5,
    borderRadius: 35,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  };
  const styleText = {
    fontSize: fontSize,
    color: colorText,
    textAlign: "center",
    fontFamily: "ApfelGrotezk",
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

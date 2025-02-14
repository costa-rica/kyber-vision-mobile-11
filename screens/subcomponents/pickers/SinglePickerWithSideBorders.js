import { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import CustomPicker from "./CustomPicker";

export default function SinglePickerWithSideBorders({
  arrayElements,
  // itemHeight,
  value,
  onChange,
  style,
  // setSelectedElement,
  // elementsFontSize,
  // parentViewWidth,
  // elementPickerBorderRadius,
  // elementTextColor,
  // backgroundColor,
}) {
  const styleVwVerticalLineLeft = {
    position: "absolute",
    top: style.itemHeight * 0.2,
    left: 5,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    height: style.itemHeight * 0.6,
    width: 1,
    zIndex: 100,
  };
  const styleVwVerticalLineRight = {
    position: "absolute",
    top: style.itemHeight * 0.2,
    right: 5,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 1,
    height: style.itemHeight * 0.6,
    width: 1,
    zIndex: 100,
  };

  return (
    <View style={styles.container}>
      <View style={styleVwVerticalLineLeft} />
      <View style={styleVwVerticalLineRight} />
      <View style={styles.vwSetTeamAnalyzedPicker}>
        <CustomPicker
          arrayElements={arrayElements}
          onChange={onChange}
          value={value}
          style={style}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 15,
  },
});

import { useRef } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import CustomPicker from "./CustomPicker";

export default function DoublePickerWithSideBorders({
  arrayElements,
  value,
  value02,
  onChange,
  onChange02,
  style,
  selectedIsBold,
  pickerName,
  pickerName02,
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

  const styles = StyleSheet.create({
    container: {
      backgroundColor: style.backgroundColor,
      // backgroundColor: "black",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 15,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styleVwVerticalLineLeft} />
      <View style={styleVwVerticalLineRight} />
      <CustomPicker
        arrayElements={arrayElements}
        onChange={onChange}
        value={value}
        style={{ ...style, backgroundColor: "transparent" }}
        selectedIsBold={selectedIsBold}
        pickerName={pickerName}
      />
      <View>
        <Text style={{ color: style.color }}>-</Text>
      </View>
      <CustomPicker
        arrayElements={arrayElements}
        onChange={onChange02}
        value={value02}
        style={{ ...style, backgroundColor: "transparent" }}
        selectedIsBold={selectedIsBold}
        pickerName={pickerName02}
      />
    </View>
  );
}

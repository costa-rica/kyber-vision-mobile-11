import { useRef } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import CustomPicker from "./CustomPicker";

export default function DoublePickerWithSideBorders({
  elementsArray,
  setSelectedElement,
  selectedElement,
  setSelectedElement02,
  selectedElement02,
  itemHeight,
  elementsFontSize,
  parentViewWidth,
  elementPickerBorderRadius,
  elementTextColor,
  backgroundColor,
}) {
  const styleVwVerticalLineLeft = {
    position: "absolute",
    top: itemHeight * 0.2,
    left: 5,
    borderColor: "white",
    borderWidth: 1,
    height: itemHeight * 0.6,
    width: 1,
    zIndex: 100,
  };
  const styleVwVerticalLineRight = {
    position: "absolute",
    top: itemHeight * 0.2,
    right: 5,
    borderColor: "white",
    borderWidth: 1,
    height: itemHeight * 0.6,
    width: 1,
    zIndex: 100,
  };

  return (
    <View style={styles.container}>
      <View style={styleVwVerticalLineLeft} />
      <View style={styleVwVerticalLineRight} />
      {/* <View style={styles.vwScoreTeamAnalyzedPicker}> */}
      <CustomPicker
        elementsArray={elementsArray}
        setSelectedElement={setSelectedElement} // Pass callback function
        selectedElement={selectedElement}
        itemHeight={itemHeight}
        elementsFontSize={elementsFontSize}
        parentViewWidth={parentViewWidth}
        elementPickerBorderRadius={elementPickerBorderRadius}
      />
      {/* </View> */}
      <View>
        <Text style={{ color: "white" }}>-</Text>
      </View>
      <CustomPicker
        elementsArray={elementsArray}
        setSelectedElement={setSelectedElement02} // Pass callback function
        selectedElement={selectedElement}
        itemHeight={itemHeight}
        elementsFontSize={elementsFontSize}
        parentViewWidth={parentViewWidth}
        elementPickerBorderRadius={elementPickerBorderRadius}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#310732",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
  },
});

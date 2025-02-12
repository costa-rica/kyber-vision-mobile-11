import { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import CustomPicker from "./CustomPicker";

export default function SinglePickerWithSideBorders({
  elementsArray,
  itemHeight,
  setSelectedElement,
  selectedElement,
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
      <View style={styles.vwSetTeamAnalyzedPicker}>
        <CustomPicker
          arrayElements={elementsArray}
          setSelectedElement={setSelectedElement}
          selectedElement={selectedElement}
          itemHeight={itemHeight}
          fontSize={elementsFontSize}
          width={parentViewWidth}
          // old
          // arrayElements={elementsArray}
          // selectedElement={selectedElement}
          // setSelectedElement={setSelectedElement}
          // backgroundColor={backgroundColor}
          // color={elementTextColor}
          // itemHeight={itemHeight}
          // width={parentViewWidth}
          // fontSize={elementsFontSize}

          // older
          // width={parentViewWidth}
          // arrayPickerElements={elementsArray}
          // selectedElement={selectedElement}
          // setSelectedElement={setSelectedElement}
          // itemHeight={itemHeight}

          // OLder

          // elementsArray={elementsArray}
          // setSelectedElement={setSelectedElement} // Pass callback function
          // selectedElement={selectedElement}
          // elementsFontSize={elementsFontSize}
          // parentViewWidth={parentViewWidth}
          // elementPickerBorderRadius={elementPickerBorderRadius}
          // elementTextColor={elementTextColor}
          // backgroundColor={backgroundColor}
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

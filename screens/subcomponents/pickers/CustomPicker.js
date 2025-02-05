import { useRef } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function CustomPicker({
  elementsArray,
  itemHeight,
  setSelectedNumber,
  elementsFontSize,
  parentViewWidth,
  elementPickerBorderRadius,
  elementTextColor = "white",
  backgroundColor = "black",
}) {
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    // Get current scroll position
    const offsetY = event.nativeEvent.contentOffset.y;

    // Determine the nearest item index
    const selectedIndex = Math.round(offsetY / itemHeight);

    // Ensure index is within bounds and update parent state
    if (selectedIndex >= 0 && selectedIndex < elementsArray.length) {
      setSelectedNumber(elementsArray[selectedIndex]);
    }
  };

  // --- Dynamic Styles -----
  const styleVwScrollView = {
    height: itemHeight,
    width: parentViewWidth,
    borderRadius: elementPickerBorderRadius,
    backgroundColor: backgroundColor,
  };
  const styleVwScrollElement = {
    backgroundColor: "transparent",
    height: itemHeight,
    justifyContent: "center",
    alignItems: "center",
  };
  const styleTxtScrollElement = {
    fontSize: elementsFontSize,
    color: elementTextColor,
    fontFamily: "ApfelGrotezk",
  };

  return (
    <View style={styleVwScrollView}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight} // Ensures it snaps to item height
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16} // Ensures frequent updates
      >
        {elementsArray.map((elem, index) => (
          <View key={index} style={styleVwScrollElement}>
            <Text style={styleTxtScrollElement}>{elem}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
});

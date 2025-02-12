import { useRef, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CustomPicker({
  arrayElements,
  selectedElement,
  setSelectedElement,
  backgroundColor = "black",
  color = "white",
  itemHeight,
  width,
  fontSize,
}) {
  const scrollViewRef = useRef(null);
  // const [scrollHeight, setScrollHeight] = useState(null);
  // const [scrollY, setScrollY] = useState(null);

  // Scroll to initially selected item
  useEffect(() => {
    const initialIndex = arrayElements.indexOf(selectedElement);
    if (Platform.OS == "android") {
      scrollViewRef.current.scrollTo({
        y: initialIndex * itemHeight,
        animated: false,
      });
    }
  }, []);

  // Handles the selection when scrolling stops
  const handleScrollEnd = (event) => {
    // setScrollHeight(event.nativeEvent.contentSize.height);
    const offsetY = event.nativeEvent.contentOffset.y;
    // setScrollY(offsetY);
    let index = Math.round(offsetY / itemHeight);
    // console.log(`offsetY: ${offsetY}`);
    // Ensure the selected index is within bounds
    index = Math.max(0, Math.min(index, arrayElements.length - 1));

    setSelectedElement(arrayElements[index]);
  };

  // const handleScrollViewOnLayout = (event) => {
  //   console.log(`event.nativeEvent.layout:`);
  //   console.log(event.nativeEvent.layout);
  //   console.log(event.nativeEvent);
  //   // setScrollHeight(event.nativeEvent.contentSize.height);
  // };
  const styles = StyleSheet.create({
    vwPickerWrapper: {
      width: width, // Adjust based on the expected width of the selected text
      height: itemHeight, // Adjust based on the Picker height
      overflow: "hidden", // Hides anything outside this area
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 10,
    },
    scrollViewContainer: {
      alignItems: "center",
    },
    item: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    text: {
      fontSize: fontSize,
      textAlign: "center",
    },
    selectedText: {
      fontWeight: "bold",
      fontSize: fontSize,
    },
    vwPicker: {
      width: 120, // Keep it wider so it allows scrolling
      alignItems: "center",
      justifyContent: "center",
    },

    picker: {
      width: 200, // Needs to be wider than vwPickerWrapper to allow scrolling
      color: "white",
      backgroundColor: "black",
    },
  });

  return (
    <View style={[styles.vwPickerWrapper, { backgroundColor }]}>
      {Platform.OS === "ios" ? (
        <View style={styles.vwPicker}>
          <Picker
            selectedValue={selectedElement.toString()} // 🔹 Convert to string
            onValueChange={(itemValue) =>
              setSelectedElement(
                isNaN(itemValue) ? itemValue : Number(itemValue)
              )
            }
            style={styles.picker}
            itemStyle={{
              color: "white",
              fontWeight: "bold",
              fontSize: fontSize,
            }}
          >
            {arrayElements.map((item, index) => (
              <Picker.Item
                key={index.toString()}
                label={item.toString()}
                value={item.toString()}
              />
            ))}
          </Picker>
        </View>
      ) : (
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight} // Ensures snapping to each item
          decelerationRate="fast"
          onMomentumScrollEnd={handleScrollEnd}
          contentContainerStyle={styles.scrollViewContainer}
          scrollEventThrottle={16} // Ensures frequent updates
          // onLayout={(event) => handleScrollViewOnLayout(event)}
        >
          {arrayElements.map((item, index) => (
            <View key={index} style={[styles.item, { height: itemHeight }]}>
              <Text
                style={[
                  styles.text,
                  { color },
                  selectedElement === item && styles.selectedText,
                ]}
              >
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

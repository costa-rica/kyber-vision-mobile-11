import { useRef, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function CustomPicker({
  arrayElements,
  value,
  onChange,
  style = {},
  selectedIsBold = true,
}) {
  if (!Array.isArray(arrayElements) || arrayElements.length === 0) {
    throw new Error(
      "CustomPicker: The 'arrayElements' prop is required and must be a non-empty array."
    );
  }
  if (typeof onChange !== "function") {
    throw new Error(
      "CustomPicker: The 'onChange' prop is required and must be a function."
    );
  }
  if (value === undefined) {
    throw new Error(
      `CustomPicker: The 'value' prop is required and must be one of the elements in 'arrayElements'. Received: ${value}.`
    );
  }
  // console.log(arrayElements);
  const scrollViewRef = useRef(null);

  // Define default styles
  const defaultStyles = {
    width: 40,
    itemHeight: 40,
    borderRadius: 10,
    backgroundColor: "#310732",
    fontSize: 16,
    color: "white",
  };

  // Merge provided style with default styles
  const mergedStyle = { ...defaultStyles, ...style };

  // Scroll to initially selected item
  useEffect(() => {
    const initialIndex = arrayElements.indexOf(value);
    // console.log(`Platform.OS : ${Platform.OS}`);
    if (Platform.OS === "android") {
      scrollViewRef.current?.scrollTo({
        y: initialIndex * mergedStyle.itemHeight,
        animated: false,
      });
    }
  }, [arrayElements, value, mergedStyle.itemHeight]);

  // Handles the selection when scrolling stops
  const handleScrollEnd = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;

    let index = Math.round(offsetY / mergedStyle.itemHeight);

    // Ensure the selected index is within bounds
    index = Math.max(0, Math.min(index, arrayElements.length - 1));

    onChange(arrayElements[index]);
  };

  const styles = StyleSheet.create({
    vwPickerWrapper: {
      width: mergedStyle.width,
      height: mergedStyle.itemHeight,
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: mergedStyle.borderRadius,
    },
    scrollViewContainer: {
      alignItems: "center",
    },
    scrollViewStyle: {
      backgroundColor: mergedStyle.backgroundColor,
      width: mergedStyle.width,
    },
    item: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: mergedStyle.itemHeight,
    },
    text: {
      fontSize: mergedStyle.fontSize,
      textAlign: "center",
      color: mergedStyle.color,
    },
    selectedText: {
      fontWeight: selectedIsBold ? "bold" : null,
      // fontSize: mergedStyle.fontSize,
    },
  });

  const stylesIos = StyleSheet.create({
    vwPicker: {
      alignItems: "center",
      justifyContent: "center",
    },
    picker: {
      width: mergedStyle.width * 2,
      backgroundColor: mergedStyle.backgroundColor,
    },
    itemStyle: {
      color: mergedStyle.color,
      fontWeight: selectedIsBold ? "bold" : null,
      fontSize: mergedStyle.fontSize,
    },
  });

  return (
    <View style={styles.vwPickerWrapper}>
      {Platform.OS === "ios" ? (
        <View style={stylesIos.vwPicker}>
          <Picker
            selectedValue={value.toString()}
            onValueChange={(itemValue) =>
              onChange(isNaN(itemValue) ? itemValue : Number(itemValue))
            }
            style={stylesIos.picker}
            itemStyle={stylesIos.itemStyle}
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
          snapToInterval={mergedStyle.itemHeight}
          decelerationRate="fast"
          onMomentumScrollEnd={handleScrollEnd}
          contentContainerStyle={styles.scrollViewContainer}
          scrollEventThrottle={16}
          style={styles.scrollViewStyle}
        >
          {arrayElements.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text
                style={[styles.text, value === item && styles.selectedText]}
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

// import { useRef, useEffect, useState } from "react";
// import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
// import { Picker } from "@react-native-picker/picker";

// export default function CustomPicker({
//   arrayElements,
//   selectedElement,
//   setSelectedElement,
//   backgroundColor = "#310732",
//   color = "white",
//   itemHeight,
//   width,
//   fontSize,
// }) {
//   const scrollViewRef = useRef(null);

//   // console.log(arrayElements);
//   // console.log(selectedElement);
//   // Scroll to initially selected item
//   useEffect(() => {
//     const initialIndex = arrayElements.indexOf(selectedElement);
//     if (Platform.OS == "android") {
//       scrollViewRef.current.scrollTo({
//         y: initialIndex * itemHeight,
//         animated: false,
//       });
//     }
//   }, []);

//   // Handles the selection when scrolling stops
//   const handleScrollEnd = (event) => {
//     const offsetY = event.nativeEvent.contentOffset.y;
//     let index = Math.round(offsetY / itemHeight);
//     // Ensure the selected index is within bounds
//     index = Math.max(0, Math.min(index, arrayElements.length - 1));

//     setSelectedElement(arrayElements[index]);
//   };

//   const styles = StyleSheet.create({
//     vwPickerWrapper: {
//       width: width, // Adjust based on the expected width of the selected text
//       height: itemHeight, // Adjust based on the Picker height
//       overflow: "hidden", // Hides anything outside this area
//       justifyContent: "center",
//       alignItems: "center",
//       backgroundColor: "white",
//       borderRadius: 10,
//     },
//     scrollViewContainer: {
//       alignItems: "center",
//     },
//     item: {
//       justifyContent: "center",
//       alignItems: "center",
//       width: "100%",
//     },
//     text: {
//       fontSize: fontSize,
//       textAlign: "center",
//     },
//     selectedText: {
//       // fontWeight: "bold",
//       fontSize: fontSize,
//     },
//   });

//   const stylesIos = StyleSheet.create({
//     vwPicker: {
//       width: 120, // Keep it wider so it allows scrolling
//       alignItems: "center",
//       justifyContent: "center",
//     },

//     picker: {
//       width: 200, // Needs to be wider than vwPickerWrapper to allow scrolling
//       color: "white",
//       backgroundColor: "black",
//     },
//   });

//   return (
//     <View style={[styles.vwPickerWrapper, { backgroundColor }]}>
//       {Platform.OS === "ios" ? (
//         <View style={stylesIos.vwPicker}>
//           <Picker
//             selectedValue={selectedElement.toString()} // 🔹 Convert to string
//             onValueChange={(itemValue) =>
//               setSelectedElement(
//                 isNaN(itemValue) ? itemValue : Number(itemValue)
//               )
//             }
//             style={stylesIos.picker}
//             itemStyle={{
//               color: "white",
//               // fontWeight: "bold",
//               fontSize: fontSize,
//             }}
//           >
//             {arrayElements.map((item, index) => (
//               <Picker.Item
//                 key={index.toString()}
//                 label={item.toString()}
//                 value={item.toString()}
//               />
//             ))}
//           </Picker>
//         </View>
//       ) : (
//         <ScrollView
//           ref={scrollViewRef}
//           showsVerticalScrollIndicator={false}
//           snapToInterval={itemHeight} // Ensures snapping to each item
//           decelerationRate="fast"
//           onMomentumScrollEnd={handleScrollEnd}
//           contentContainerStyle={styles.scrollViewContainer}
//           scrollEventThrottle={16} // Ensures frequent updates
//         >
//           {arrayElements.map((item, index) => (
//             <View key={index} style={[styles.item, { height: itemHeight }]}>
//               <Text
//                 style={[
//                   styles.text,
//                   { color },
//                   selectedElement === item && styles.selectedText,
//                 ]}
//               >
//                 {item}
//               </Text>
//             </View>
//           ))}
//         </ScrollView>
//       )}
//     </View>
//   );
// }

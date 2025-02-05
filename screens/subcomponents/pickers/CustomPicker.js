import { useRef, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function CustomPicker({
  elementsArray,
  itemHeight,
  setSelectedElement,
  selectedElement, // New prop
  elementsFontSize,
  parentViewWidth,
  elementPickerBorderRadius,
  elementTextColor = "white",
  backgroundColor = "#310732",
}) {
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (selectedElement !== undefined && scrollViewRef.current) {
      const index = elementsArray.indexOf(selectedElement);
      if (index !== -1) {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: index * itemHeight,
            animated: false, // Prevent animation on mount for better UX
          });
        }, 100); // Ensures the scrollView is rendered before scrolling
      }
    }
  }, [selectedElement, elementsArray, itemHeight]);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const selectedIndex = Math.round(offsetY / itemHeight);

    if (selectedIndex >= 0 && selectedIndex < elementsArray.length) {
      setSelectedElement(elementsArray[selectedIndex]);
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
        snapToInterval={itemHeight}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
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

// Chat GPT version 2

// import { useRef, useEffect } from "react";
// import { View, Text, ScrollView, StyleSheet } from "react-native";

// export default function CustomPicker({
//   elementsArray,
//   itemHeight,
//   setSelectedElement,
//   selectedElement, // New prop
//   elementsFontSize,
//   parentViewWidth,
//   elementPickerBorderRadius,
//   elementTextColor = "white",
//   backgroundColor = "#310732",
// }) {
//   const scrollViewRef = useRef(null);
//   console.log(`selectedElement: ${selectedElement}`);
//   useEffect(() => {
//     if (selectedElement && scrollViewRef.current) {
//       const index = elementsArray.indexOf(selectedElement);
//       if (index !== -1) {
//         scrollViewRef.current.scrollTo({
//           y: index * itemHeight,
//           animated: true,
//         });
//       }
//     }
//   }, [selectedElement, elementsArray, itemHeight]);

//   const handleScroll = (event) => {
//     const offsetY = event.nativeEvent.contentOffset.y;
//     const selectedIndex = Math.round(offsetY / itemHeight);

//     if (selectedIndex >= 0 && selectedIndex < elementsArray.length) {
//       setSelectedElement(elementsArray[selectedIndex]);
//     }
//   };

//   // --- Dynamic Styles -----
//   const styleVwScrollView = {
//     height: itemHeight,
//     width: parentViewWidth,
//     borderRadius: elementPickerBorderRadius,
//     backgroundColor: backgroundColor,
//   };
//   const styleVwScrollElement = {
//     backgroundColor: "transparent",
//     height: itemHeight,
//     justifyContent: "center",
//     alignItems: "center",
//   };
//   const styleTxtScrollElement = {
//     fontSize: elementsFontSize,
//     color: elementTextColor,
//     fontFamily: "ApfelGrotezk",
//   };

//   return (
//     <View style={styleVwScrollView}>
//       <ScrollView
//         ref={scrollViewRef}
//         showsVerticalScrollIndicator={false}
//         snapToInterval={itemHeight}
//         decelerationRate="fast"
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//       >
//         {elementsArray.map((elem, index) => (
//           <View key={index} style={styleVwScrollElement}>
//             <Text style={styleTxtScrollElement}>{elem}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f4f4f4",
//   },
// });

// ---- NIck version 1 ----

// import { useRef } from "react";
// import { View, Text, ScrollView, StyleSheet } from "react-native";

// export default function CustomPicker({
//   elementsArray,
//   itemHeight,
//   setSelectedElement,
//   elementsFontSize,
//   parentViewWidth,
//   elementPickerBorderRadius,
//   elementTextColor = "white",
//   backgroundColor = "#310732",
// }) {
//   const scrollViewRef = useRef(null);

//   const handleScroll = (event) => {
//     // Get current scroll position
//     const offsetY = event.nativeEvent.contentOffset.y;

//     // Determine the nearest item index
//     const selectedIndex = Math.round(offsetY / itemHeight);

//     // Ensure index is within bounds and update parent state
//     if (selectedIndex >= 0 && selectedIndex < elementsArray.length) {
//       setSelectedElement(elementsArray[selectedIndex]);
//     }
//   };

//   // --- Dynamic Styles -----
//   const styleVwScrollView = {
//     height: itemHeight,
//     width: parentViewWidth,
//     borderRadius: elementPickerBorderRadius,
//     backgroundColor: backgroundColor,
//   };
//   const styleVwScrollElement = {
//     backgroundColor: "transparent",
//     height: itemHeight,
//     justifyContent: "center",
//     alignItems: "center",
//   };
//   const styleTxtScrollElement = {
//     fontSize: elementsFontSize,
//     color: elementTextColor,
//     fontFamily: "ApfelGrotezk",
//   };

//   return (
//     <View style={styleVwScrollView}>
//       <ScrollView
//         ref={scrollViewRef}
//         showsVerticalScrollIndicator={false}
//         snapToInterval={itemHeight} // Ensures it snaps to item height
//         decelerationRate="fast"
//         onScroll={handleScroll}
//         scrollEventThrottle={16} // Ensures frequent updates
//       >
//         {elementsArray.map((elem, index) => (
//           <View key={index} style={styleVwScrollElement}>
//             <Text style={styleTxtScrollElement}>{elem}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f4f4f4",
//   },
// });

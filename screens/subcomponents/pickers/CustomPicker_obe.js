// --- ChatGPT version 4: scrolling settles ---
// -----> this version fixes the never settling scrolling issues
import { useRef, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function CustomPickerOBE({
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
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (
      !isScrolling &&
      selectedElement !== undefined &&
      scrollViewRef.current
    ) {
      const index = elementsArray.indexOf(selectedElement);
      if (index !== -1) {
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: index * itemHeight,
            animated: true, // Set to true for smooth transition
          });
        }, 100);
      }
    }
  }, [selectedElement, elementsArray, itemHeight, isScrolling]);

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const selectedIndex = Math.round(offsetY / itemHeight);

    // console.log(`- handleScroll ${offsetY}, index: ${selectedIndex}`);

    if (selectedIndex >= 0 && selectedIndex < elementsArray.length) {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 200); // Prevents continuous triggering
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
        onMomentumScrollEnd={() => setIsScrolling(false)} // Stop isScrolling when scroll ends
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

// ---- Chat GPT version 3: pass in element value ----

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

//   useEffect(() => {
//     if (selectedElement !== undefined && scrollViewRef.current) {
//       const index = elementsArray.indexOf(selectedElement);
//       if (index !== -1) {
//         setTimeout(() => {
//           scrollViewRef.current?.scrollTo({
//             y: index * itemHeight,
//             animated: false, // Prevent animation on mount for better UX
//           });
//         }, 100); // Ensures the scrollView is rendered before scrolling
//       }
//     }
//   }, [selectedElement, elementsArray, itemHeight]);

//   const handleScroll = (event) => {
//     const offsetY = event.nativeEvent.contentOffset.y;
//     console.log(`- handleScroll ${offsetY}`);
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

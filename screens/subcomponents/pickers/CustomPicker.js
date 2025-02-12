import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

// CustomPicker Component
export default function CustomPicker({
  width,
  arrayPickerElements,
  selectedElement,
  setSelectedElement,
  itemHeight = 40,
}) {
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
    <View style={styles.vwPickerWrapper}>
      <View style={styles.vwPicker}>
        <Picker
          selectedValue={selectedElement.toString()} // 🔹 Convert to string
          onValueChange={(itemValue) =>
            setSelectedElement(isNaN(itemValue) ? itemValue : Number(itemValue))
          }
          style={styles.picker}
          itemStyle={{ color: "white" }}
        >
          {arrayPickerElements.map((item, index) => (
            <Picker.Item
              key={index.toString()}
              label={item.toString()}
              value={item.toString()}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

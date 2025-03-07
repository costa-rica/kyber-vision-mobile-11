// ScriptingLive03 - use actionArray from scriptReducer
// This is a template for updating the actionsArray with the correct values
// 1- useState for currentAction is set to the scriptReducer.typesArray[position_of_desired_default_value].
// 2- onTap triggers addActionToActionsArray:
//    2.1- setCurrentActionType is set to the default value: scriptReducer.typesArray[position_of_desired_default_value].
//    2.2- newActionObj is created with the default value: scriptReducer.subtypesArray[position_of_desired_default_value].
//
// 3- handleChangeType:
//    3.1 - condition for if actionArray.length > 0
//    3.2 - find last action in action array
//    3.3 - replace the type i.e. lastAction = { ...lastAction, type: newType }
//    3.4 - set currentActionType to newType .i.e setCurrentActionType(newType)

import { useEffect, useState } from "react";
import {
  View,
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import ButtonKv from "./subcomponents/ButtonKv";
import CustomPicker from "./subcomponents/pickers/CustomPicker";
import { useSelector, useDispatch } from "react-redux";

import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

import { replaceScriptActionArray } from "../reducers/script";

export default function ScriptingLive03({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const scriptReducer = useSelector((state) => state.script);
  const dispatch = useDispatch();
  const stdTruncatePlayerNameLength = 4;
  const [currentActionType, setCurrentActionType] = useState(
    scriptReducer.typesArray[scriptReducer.typesArray.length - 1].substring(
      0,
      stdTruncatePlayerNameLength
    )
  );
  const [currentActionSubtype, setCurrentActionSubtype] = useState(
    scriptReducer.subtypesArray[
      scriptReducer.subtypesArray.length - 1
    ].substring(0, stdTruncatePlayerNameLength)
  );
  // const [actionsArray, setActionsArray] = useState([]);
  const stdPickerStylePortrait = {
    color: "white",
    fontSize: 20,
    backgroundColor: "#310732",
    itemHeight: 60,
    width: 100,
    borderRadius: 15,
  };
  const truncateArrayElements = (
    arr,
    maxLength = stdTruncatePlayerNameLength
  ) => {
    return arr.map((item) =>
      item.length > maxLength ? item.substring(0, maxLength) : item
    );
  };
  const gestureTapBegin = Gesture.Tap().onBegin(() => {
    console.log("Gesture Tap Begin");
    addActionToActionsArray();
  });
  const addActionToActionsArray = () => {
    setCurrentActionType(
      scriptReducer.typesArray[scriptReducer.typesArray.length - 1].substring(
        0,
        stdTruncatePlayerNameLength
      )
    );
    setCurrentActionSubtype(
      scriptReducer.subtypesArray[
        scriptReducer.subtypesArray.length - 1
      ].substring(0, stdTruncatePlayerNameLength)
    );
    const newActionObj = {
      timestamp: new Date().toISOString(),
      type: scriptReducer.typesArray[
        scriptReducer.typesArray.length - 1
      ].substring(0, stdTruncatePlayerNameLength),
      subtype: scriptReducer.subtypesArray[
        scriptReducer.subtypesArray.length - 1
      ].substring(0, stdTruncatePlayerNameLength),
      playerId: scriptReducer.scriptingForPlayerObject.id,
    };
    if (scriptReducer.actionsArray) {
      // dispatch(
      //   replaceScriptActionArray([...scriptReducer.actionsArray, newActionObj])
      // );
      dispatch(
        replaceScriptActionArray({
          actionsArray: [...scriptReducer.actionsArray, newActionObj],
        })
      );
    } else {
      dispatch(replaceScriptActionArray({ actionsArray: [newActionObj] }));
    }
  };

  const handleChangeType = (newType) => {
    if (scriptReducer.actionsArray.length > 0) {
      let lastAction =
        scriptReducer.actionsArray[scriptReducer.actionsArray.length - 1];
      lastAction = { ...lastAction, type: newType };
      dispatch(
        replaceScriptActionArray({
          actionsArray: [
            ...scriptReducer.actionsArray.slice(0, -1),
            lastAction,
          ],
        })
      );
    }
    setCurrentActionType(newType.substring(0, stdTruncatePlayerNameLength));
  };

  const handleChangeSubtype = (newSubtype) => {
    if (scriptReducer.actionsArray.length > 0) {
      let lastAction =
        scriptReducer.actionsArray[scriptReducer.actionsArray.length - 1];
      lastAction = { ...lastAction, subtype: newSubtype };
      // console.log(lastAction);
      dispatch(
        replaceScriptActionArray({
          actionsArray: [
            ...scriptReducer.actionsArray.slice(0, -1),
            lastAction,
          ],
        })
      );
    }
    setCurrentActionSubtype(
      newSubtype.substring(0, stdTruncatePlayerNameLength)
    );
  };

  const sendScript = async () => {
    // console.log("send script");
    // // console.log(JSON.stringify(scriptReducer.actionsArray));
    // console.log(JSON.stringify(tempActionsArray));

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/scripts/receive-actions-array`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userReducer.token}`,
        },
        body: JSON.stringify({
          matchId: 1,
          // actionsArray: scriptReducer.actionsArray,
          actionsArray: tempActionsArray,
        }),
      }
    );
    if (response.status !== 200) {
      // console.log(`There was a server error: ${response.status}`);
      alert(`There was a server error: ${response.status}`);
      return;
    }

    // dispatch(deleteScript());
    let resJson = null;
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      resJson = await response.json();
      alert(resJson.message);
    }
  };

  console.log(`typeof scriptReducer: ${typeof scriptReducer}`);
  console.log(
    `typeof scriptReducer.actionsArray: ${typeof scriptReducer.actionsArray}`
  );
  console.log(scriptReducer.actionsArray);

  // console.log(scriptReducer.actionsArray.length);

  const vwActionArray = scriptReducer.actionsArray ? (
    <View style={styles.vwActionsArray}>
      {scriptReducer.actionsArray.length > 0 ? (
        scriptReducer.actionsArray.map((action, index) => (
          <View key={index} style={styles.vwAction}>
            <Text>
              {action.timestamp} - {action.type} - {action.subtype}
            </Text>
          </View>
        ))
      ) : (
        <Text>No actions in array</Text>
      )}
    </View>
  ) : (
    <Text>No actions in array</Text>
  );

  return (
    <View style={styles.container}>
      <Text>Scripting Live 03</Text>
      <View style={styles.containerTop}>
        <View style={styles.vwPickers}>
          <CustomPicker
            arrayElements={truncateArrayElements(scriptReducer.typesArray)}
            onChange={handleChangeType}
            value={currentActionType.substring(0, stdTruncatePlayerNameLength)}
            style={{ ...stdPickerStylePortrait }}
            selectedIsBold={true}
            pickerName={"current Action Type"}
          />
          <CustomPicker
            arrayElements={truncateArrayElements(scriptReducer.subtypesArray)}
            onChange={handleChangeSubtype}
            value={currentActionSubtype.substring(
              0,
              stdTruncatePlayerNameLength
            )}
            style={{ ...stdPickerStylePortrait }}
            selectedIsBold={true}
            pickerName={"current Action Subtype"}
          />
        </View>
        <View style={styles.vwBtnConfirmAction}>
          <ButtonKv
            onPress={() => {
              addActionToActionsArray();
            }}
          >
            Add Action
          </ButtonKv>
        </View>

        <View style={styles.vwActionsArray}>
          {vwActionArray}
          {/* {scriptReducer.actionsArray &&
            scriptReducer.actionsArray.length > 0 &&
            scriptReducer.actionsArray.map((action, index) => (
              <View key={index} style={styles.vwAction}>
                <Text>
                  {action.timestamp} - {action.type} - {action.subtype}
                </Text>
              </View>
            ))} */}
        </View>
        <GestureHandlerRootView style={{}}>
          <GestureDetector gesture={gestureTapBegin}>
            <View
              style={{
                height: 200,
                width: Dimensions.get("window").width,
                backgroundColor: "#F2EBF2",
              }}
            />
          </GestureDetector>
        </GestureHandlerRootView>
      </View>
      <View style={styles.containerBottom}>
        <ButtonKv
          onPress={() => {
            // dispatch(deleteScript());
            sendScript();
          }}
          style={{
            backgroundColor: "#970F9A",
            color: "white",
            width: 140,
            fontSize: 20,
            height: 80,
            justifyContent: "center",
          }}
        >
          Send {scriptReducer.actionsArray && scriptReducer.actionsArray.length}{" "}
          actions
        </ButtonKv>
      </View>
    </View>
  );
}

// Styles for main container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
  },
  containerTop: {
    // backgroundColor: "green",
    flex: 1,
  },
  vwPickers: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
  },
  vwBtnConfirmAction: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "green",
    padding: 20,
  },
  vwActionsArray: {
    backgroundColor: "gray",
    // width: Dimensions.get("window").width * 0.8,
    flex: 1,
  },
  containerBottom: {
    height: 100,
    backgroundColor: "green",
  },
});

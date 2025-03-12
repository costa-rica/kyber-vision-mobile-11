import { SafeAreaView, StatusBar, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import ScriptingMatchSelection from "./screens/ScritptingMatchSelection";
import Scripting from "./screens/Scripting";
import Admin from "./screens/Admin";
import ScriptingLive from "./screens/ScriptingLive";
import ScriptingLive02 from "./screens/ScriptingLive02";
import ScriptingLive03 from "./screens/ScriptingLive03";
import SwipePadSettings from "./screens/SwipePadSettings";
import PlayerSelection from "./screens/PlayerSelection";
import ReviewMatchSelection from "./screens/ReviewMatchSelection";
import ReviewVideo from "./screens/ReviewVideo";
import ReviewVideoLandscape from "./screens/subcomponents/ReviewVideoLandscape";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import script from "./reducers/script";
import review from "./reducers/review";
import { useEffect, useState } from "react";
// import * as ScreenOrientation from "expo-screen-orientation";
import * as Font from "expo-font";

const store = configureStore({
  reducer: { user, script, review },
});

export default function App() {
  const Stack = createNativeStackNavigator();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        ApfelGrotezk: require("./assets/fonts/ApfelGrotezk-Regular.otf"),
        Caveat: require("./assets/fonts/Caveat-VariableFont_wght.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    console.log("--- font NOT loaded");
  } else {
    console.log("--- font loaded");
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
        <StatusBar backgroundColor="black" barStyle="light-content" />

        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen
              name="ScriptingMatchSelection"
              component={ScriptingMatchSelection}
            />
            <Stack.Screen name="Scripting" component={Scripting} />
            <Stack.Screen name="ScriptingLive" component={ScriptingLive} />
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen
              name="SwipePadSettings"
              component={SwipePadSettings}
            />
            <Stack.Screen name="PlayerSelection" component={PlayerSelection} />
            <Stack.Screen name="ScriptingLive02" component={ScriptingLive02} />
            <Stack.Screen name="ScriptingLive03" component={ScriptingLive03} />
            <Stack.Screen
              name="ReviewMatchSelection"
              component={ReviewMatchSelection}
            />
            <Stack.Screen name="ReviewVideo" component={ReviewVideo} />
            <Stack.Screen
              name="ReviewVideoLandscape"
              component={ReviewVideoLandscape}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

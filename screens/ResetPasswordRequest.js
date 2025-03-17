// /components/forgot-password/RequestPasswordReset.js
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import TemplateView from "./subcomponents/TemplateView";

export default function RequestPasswordReset({ navigation }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordResetRequest = async () => {
    console.log(
      "RequestPasswordReset ---> API URL:",
      `${process.env.EXPO_PUBLIC_API_URL}/users/request-password-reset`
    );
    try {
      if (!email.includes("@")) {
        setMessage("Please enter a valid email address.");
        return;
      }
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/users/request-password-reset`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      let resJson = null;
      const contentType = response.headers.get("Content-Type");

      if (contentType?.includes("application/json")) {
        resJson = await response.json();
      }

      if (response.ok) {
        setMessage("Password reset email sent successfully.");
      } else {
        setMessage(resJson?.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      // console.error("Error requesting password reset:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <TemplateView navigation={navigation} hideSettings={true} noGrayBand={true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handlePasswordResetRequest()}
            >
              <Text style={styles.buttonText}>Request Password Reset</Text>
            </TouchableOpacity>
            {message ? <Text style={styles.message}>{message}</Text> : null}
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </TemplateView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EBF2",
    justifyContent: "center",
    alignItems: "center",
    // width: "100%",
    // backgroundColor: "white",
  },
  contentContainer: {
    paddingTop: 40,
    width: Dimensions.get("window").width * 0.9,
    alignItems: "center",
    // backgroundColor: "white",
  },
  inputContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    borderColor: "#806181",
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    fontSize: 18,
    width: "100%",
  },
  button: {
    backgroundColor: "#970F9A",
    borderRadius: 12,
    padding: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: "#970F9A",
    textAlign: "center",
  },
});

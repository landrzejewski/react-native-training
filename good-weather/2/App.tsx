import React from "react";
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from "react-native";

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Text style={[styles.largeText, styles.text]}>Warsaw</Text>
      <Text style={[styles.smallText, styles.text]}>Sunny</Text>
      <Text style={[styles.largeText, styles.text]}>25</Text>
      <TextInput
      style={styles.textInput}
        autoCorrect={false}
        placeholder="Enter your city name"
        placeholderTextColor="white"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
      textAlign: "center"
  },
  largeText: {
    fontSize: 36
  },
  smallText: {
    fontSize: 18
  },
  textInput: {
    backgroundColor: "gray",
    color: "white",
    height: 40,
    width: 200,
    marginTop: 20,
    paddingHorizontal: 10,
    alignSelf: "center",
    textAlign: "center"
  }
});

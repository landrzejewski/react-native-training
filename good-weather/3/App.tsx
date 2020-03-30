import React from "react";
import { StyleSheet, Text, TextInput, KeyboardAvoidingView } from "react-native";
import SearchInput from "./components/SearchInput" 

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <Text style={[styles.largeText, styles.text]}>Warsaw</Text>
      <Text style={[styles.smallText, styles.text]}>Sunny</Text>
      <Text style={[styles.largeText, styles.text]}>25</Text>
      <SearchInput placeholder="Enter your city name"/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  }
});

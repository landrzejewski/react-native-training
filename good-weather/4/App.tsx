import React, { useState} from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  KeyboardAvoidingView
} from "react-native";
import SearchInput from "./components/SearchInput";

export default function App() {
  const [getCity, setCity] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ImageBackground
        source={require("./assets/light-cloud.png")}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.defaultContainer}>
          <Text style={[styles.largeText, styles.text]}>Warsaw</Text>
          <Text style={[styles.smallText, styles.text]}>Sunny</Text>
          <Text style={[styles.largeText, styles.text]}>25</Text>
          <SearchInput onSubmit={setCity} placeholder="Enter your city name" />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover"
  },
  defaultContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
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

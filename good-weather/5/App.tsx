import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ActivityIndicator,
  KeyboardAvoidingView
} from "react-native";
import SearchInput from "./components/SearchInput";
import { fetchLocationId, fetchWeather } from "./utils";

export default function App() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [getCity, setCity] = useState("");
  const [getTemperature, setTemperature] = useState(0);
  const [getWeather, setWeather] = useState("");

  const handleUpdateCity = async (city: string) => {
    setLoading(true);
    try {
      const locationId = await fetchLocationId(city);
      const { location, weather, temperature } = await fetchWeather(locationId);
      setLoading(false);
      setCity(location);
      setWeather(weather);
      setTemperature(temperature);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ImageBackground
        source={require("./assets/light-cloud.png")}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.defaultContainer}>
          <ActivityIndicator animating={isLoading} color="white" size="large" />
          {!isError && getCity !== "" && (
            <>
              <Text style={[styles.largeText, styles.text]}>{getCity}</Text>
              <Text style={[styles.smallText, styles.text]}>{getWeather}</Text>
              <Text style={[styles.largeText, styles.text]}>
                {getTemperature}
              </Text>
            </>
          )}
          <SearchInput
            onSubmit={handleUpdateCity}
            placeholder="Enter your city name"
          />
          {isError && (
            <Text style={[styles.smallText, styles.text]}>
              Could not load weather
            </Text>
          )}
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

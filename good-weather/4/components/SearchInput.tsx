import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type SearchInputProps = {
  placeholder: string;
  onSubmit: (text: string) => void;
};

export default function SearchInput(props: SearchInputProps) {
  const [getCity, setCity] = useState("");

  const handleSubmitEditing = () => {
    if (!getCity) return;
    props.onSubmit(getCity);
    setCity("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        autoCorrect={false}
        placeholder={props.placeholder}
        placeholderTextColor="white"
        value={getCity}
        onChangeText={setCity}
        onSubmitEditing={handleSubmitEditing}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    marginHorizontal: 25,
    borderRadius: 6,
    height: 40
  },
  textInput: {
    backgroundColor: "gray",
    color: "white",
    height: 40,
    width: "90%",
    paddingHorizontal: 10,
    alignSelf: "center",
    textAlign: "center"
  }
});

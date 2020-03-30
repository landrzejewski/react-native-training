import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput(props: SearchInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        autoCorrect={false}
        placeholder={props.placeholder}
        placeholderTextColor="white"
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

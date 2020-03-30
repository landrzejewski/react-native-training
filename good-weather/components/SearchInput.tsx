import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type SearchInputProps = {
  placeholder: string;
  onSubmit: (text: string) => void;
};

type SearchInputState = {
  text: string;
};

export default class SearchInput extends React.Component<
  SearchInputProps,
  SearchInputState
> {
  state = {
    text: ""
  };

  handleChangeText = (text: string) => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;
    if (!text) return;
    onSubmit(text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          autoCorrect={false}
          placeholder={this.props.placeholder}
          placeholderTextColor="white"
          value={this.state.text}
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
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

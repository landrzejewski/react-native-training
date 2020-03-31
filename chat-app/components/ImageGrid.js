import { Image, StyleSheet, TouchableOpacity } from "react-native";
import CameraRoll from "expo-cameraroll";
import * as Permissions from "expo-permissions";
import PropTypes from "prop-types";
import React from "react";
import Grid from "./Grid";

export default class ImageGrid extends React.Component {
  state = {
    images: [
      { uri: "https://picsum.photos/600/600?image=10" },
      { uri: "https://picsum.photos/600/600?image=20" },
      { uri: "https://picsum.photos/600/600?image=30" },
      { uri: "https://picsum.photos/600/600?image=40" },
      { uri: "https://picsum.photos/600/600?image=50" },
      { uri: "https://picsum.photos/600/600?image=60" },
      { uri: "https://picsum.photos/600/600?image=70" },
      { uri: "https://picsum.photos/600/600?image=80" },
      { uri: "https://picsum.photos/600/600?image=90" },
      { uri: "https://picsum.photos/600/600?image=100" },
      { uri: "https://picsum.photos/600/600?image=110" },
      { uri: "https://picsum.photos/600/600?image=120" },
      { uri: "https://picsum.photos/600/600?image=130" },
      { uri: "https://picsum.photos/600/600?image=140" },
      { uri: "https://picsum.photos/600/600?image=151" }
    ]
  };

  keyExtractor = ({ uri }) => uri;

  renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const style = {width: size, height: size, marginLeft, marginTop};
    return <Image source={{ uri }} style={style} />;
  };

  render() {
    const { images } = this.state;
    return (
      <Grid
        data={images}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor} 
        numColumns={6}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  }
});

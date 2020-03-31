import { Image, StyleSheet, TouchableOpacity } from "react-native";
import CameraRoll from "expo-cameraroll";
import * as Permissions from "expo-permissions";
import PropTypes from "prop-types";
import React from "react";
import Grid from "./Grid";

export default class ImageGrid extends React.Component {
  state = {
    images: []
  };

  loading = false;
  cursor = null;

  componentDidMount() {
      this.getImages();
  }

  getImages = async (after) => {
      if (this.loading) return;

      const { status } = await Permissions.askAsync(
          Permissions.CAMERA_ROLL
      )

      if (status !== 'granted') {
          console.log('Permission not granted');
          return;
      }

      this.loading = true;

      const results = await CameraRoll.getPhotos({
          first: 3,
          after
      });

      const {edges, page_info: { has_next_page, end_cursor } } = results;

      


      const loadedImages = edges.map(item => item.node.image);

      this.setState(
          {
              images: this.state.images.concat(loadedImages)
          }, 
          () => {
              this.loading = false;
              this.cursor = has_next_page ? end_cursor : null;
          }
      )

  }

  getNextImages = () => {
      if (!this.cursor) return;

      this.getImages(this.cursor);
  }

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
        numColumns={3}
        onEndReached={this.getNextImages}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1
  }
});

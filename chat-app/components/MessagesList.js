import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import MapView from "react-native-maps";

export default class MessageList extends React.Component {
  renderMessageBody = ({ type, text, uri, coordinates }) => {
    switch (type) {
      case "text":
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );
      case "image":
        return <Image style={styles.image} source={{ uri }} />;
      case "location":
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinates,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}
          >
            <MapView.Marker coordinate={coordinates} />
          </MapView>
        );
    }
  };

  renderMessageItem = ({ item }) => {
    const { onPressMessage } = this.props;
    return (
      <View key={item.id} style={styles.messageRow}>
        <TouchableOpacity onPress={() => onPressMessage(item)}>
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  keyExtractor = item => item.id.toString();

  render() {
    const { messages } = this.props;

    return (
      <FlatList
        style={styles.container}
        inverted
        data={messages}
        renderItem={this.renderMessageItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "visible" // Prevents clipping on resize!
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 4,
    marginRight: 10,
    marginLeft: 60
  },
  messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgb(16,135,255)",
    borderRadius: 20
  },
  text: {
    fontSize: 18,
    color: "white"
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10
  },
  map: {
    width: 250,
    height: 250,
    borderRadius: 10
  }
});

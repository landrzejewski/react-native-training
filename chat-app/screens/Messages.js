import React from "react";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  TouchableHighlight,
  BackHandler
} from "react-native";
import colors from "../utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import Status from "../components/Status";
import {
  createTextMessage,
  createImageMessage,
  createLocationMessage
} from "../utils/MessagesUtils";
import MessageList from "../components/MessagesList";

export default class Messages extends React.Component {
  state = {
    messages: [
      createTextMessage("Hello"),
      createTextMessage("Hi"),
      createImageMessage("https://unsplash.it/200/200"),
      createLocationMessage({ latitude: 37.78825, longitude: -121.43 })
    ],
    fullscreenImageId: null
  };

  static navigationOptions = ({ navigation: { navigate, openDrawer } }) => ({
    headerStyle: {
      backgroundColor: colors.blue
    },
    headerLeft: (
      <MaterialIcons
        name="menu"
        size={24}
        style={{ color: "white", marginLeft: 10 }}
        onPress={() => openDrawer()}
      />
    )
  });

  componentWillMount() {
    this.subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        const { fullscreenImageId } = this.state;
        if (fullscreenImageId) {
          this.dismissFullScreenImage();
          return true;
        }
        return false;
      }
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  dismissFullScreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  handlePressMessage = ({ id, type }) => {
    switch (type) {
      case "text": {
        Alert.alert(
          "Delete message",
          "Are you sure you want to delete this message?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            {
              text: "Delete",
              style: "destructive",
              onPress: () => {
                const { messages } = this.state;
                this.setState({
                  messages: messages.filter(messages => messages.id !== id)
                });
              }
            }
          ]
        );
        break;
      }
      case "image": {
        this.setState({ fullscreenImageId: id });
        break;
      }
    }
  };

  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;

    if (!fullscreenImageId) return;

    const image = messages.find(messages => messages.id === fullscreenImageId);

    if (!image) return;

    const { uri } = image;

    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullScreenImage}
      >
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  renderMessagesList() {
    const { messages } = this.state;

    return (
      <View style={styles.content}>
        <MessageList
          messages={messages}
          onPressMessage={this.handlePressMessage}
        />
      </View>
    );
  }

  renderToolBar() {
    return <View style={styles.toolbar}></View>;
  }

  renderPicker() {
    return <View style={styles.picker}></View>;
  }

  render() {
    return (
      <View style={styles.container}>
        <Status />
        {this.renderMessagesList()}
        {this.renderToolBar()}
        {this.renderPicker()}
        {this.renderFullscreenImage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    flex: 1,
    backgroundColor: "white"
  },
  picker: {
    flex: 1,
    backgroundColor: "white"
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
    backgroundColor: "white"
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
    zIndex: 2
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: "contain"
  }
});

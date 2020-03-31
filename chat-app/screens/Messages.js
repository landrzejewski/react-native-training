import React from "react";
import {
  StyleSheet,
  View
} from "react-native";
import colors from "../utils/colors";
import { MaterialIcons } from "@expo/vector-icons";
import Status from "../components/Status";
import  { createTextMessage, createImageMessage, createLocationMessage } from "../utils/MessagesUtils"
import MessageList from "../components/MessagesList";

export default class Messages extends React.Component {

    state = {
        messages: [
            createTextMessage("Hello"),
            createTextMessage("Hi"),
            createImageMessage("https://unsplash.it/200/200"),
            createLocationMessage({latitude: 37.78825, longitude: -121.43})
        ]
    }

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

    renderMessagesList() {
        const { messages } = this.state;

        return (
            <View style={styles.content}>
                <MessageList messages={messages} onPress={() => {}}/>
            </View>
        );
    }

    renderToolBar() {
        return (
            <View style={styles.toolbar}></View>
        );
    }

    renderPicker() {
        return (
            <View style={styles.picker}></View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Status/>
                {this.renderMessagesList()}
                {this.renderToolBar()}
                {this.renderPicker()}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    content: {
      flex: 1,
      backgroundColor: 'white',
    },
    picker: {
      flex: 1,
      backgroundColor: 'white',
    },
    toolbar: {
      borderTopWidth: 1,
      borderTopColor: 'rgba(0,0,0,0.04)',
      backgroundColor: 'white',
    },
    fullscreenOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'black',
      zIndex: 2,
    },
    fullscreenImage: {
      flex: 1,
      resizeMode: 'contain',
    },
  });
  
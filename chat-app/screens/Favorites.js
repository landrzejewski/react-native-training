import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { fetchContacts } from "../utils/api";
import colors from "../utils/colors";

import ContactThumbnail from "../components/ContactThumbnail";
import store from "../store";

const keyExtractor = ({ phone }) => phone;

export default class Favorites extends React.Component {
  static navigationOptions = ({ navigation: { navigate, openDrawer } }) => ({
    title: "Favorites",
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

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isLoadingContacts,
    error: store.getState().error
  };

  async componentDidMount() {
    if (store.getState().contacts.length === 0) {
      try {
        const fetchContacts = await fetchContacts();
        store.setState({
          contacts: fetchContacts,
          isLoadingContacts: false
        });
      } catch (e) {
        store.setState({
          isLoadingContacts: false,
          error: true
        });
      }
    }
  }

  renderFavoriteThumbnail = ({ item }) => {
    const {
      navigation: { navigate }
    } = this.props;
    const { avatar } = item;

    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate("Profile", { contact: item })}
      />
    );
  };

  render() {
    const { loading, contacts, error } = this.state;
    const favorites = contacts.filter(contact => contact.favorite);

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}

        {!loading && !error && (
          <FlatList
            data={favorites}
            keyExtractor={keyExtractor}
            numColumns={3}
            contentContainerStyle={styles.list}
            renderItem={this.renderFavoriteThumbnail}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  },
  list: {
    alignItems: "center"
  }
});

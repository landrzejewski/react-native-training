import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import ContactListItem from "../components/ContactListItem";
import colors from "../utils/colors";

import { fetchContacts } from "../utils/api";
import store from "../store";

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends React.Component {
  static navigationOptions = ({ navigation: { navigate, openDrawer } }) => ({
    title: "Contacts list",
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
    this.unsubscribe = store.onChange(() => {
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isLoadingContacts,
        error: store.getState().error
      })
    }); 

    try {
      const contacts = await fetchContacts();
      store.setState({
        contacts,
        isLoadingContacts: false,
      });
    } catch (e) {
      store.setState({
        isLoadingContacts: false,
        error: true
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderContact = ({ item }) => {
    const {
      navigation: { navigate }
    } = this.props;
    const { id, name, avatar, phone } = item;

    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate("Profile", { contact: item })}
      />
    );
  };

  render() {
    const { loading, contacts, error } = this.state;

    const contactsSorted = contacts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading && !error && (
          <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={this.renderContact}
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
  }
});

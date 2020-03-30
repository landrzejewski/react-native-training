import React from "react";
import { View, FlatList, StyleSheet } from "react-native";

import ContactListItem from "../components/ContactListItem";
import { fetchContacts } from "../utils/api";

export default class Contacts extends React.Component {
  state = {
    contacts: [],
    loading: true,
    error: false
  };

  async componentDidMount() {
    try {
      const contacts = await fetchContacts();
      this.setState({
        contacts,
        loading: false,
        error: false
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true
      });
    }
  }

  renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return <ContactListItem name={name} avatar={avatar} phone={phone}/>
  };

  render() {
    const { loading, error, contacts } = this.state;
    const sortedContacts = contacts.sort(
      (firstContact, secondContact) => firstContact.name > secondContact.name
    );

    const keyExtractor = ({ phone }) => phone;

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.contacts}
          data={contacts}
          renderItem={this.renderContact}
          keyExtractor={keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  }
});

import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterailIcons, MaterialIcons } from "@expo/vector-icons";
import DetailListItem from "../components/DetailListItem";
import colors from "../utils/colors";

// export default function Options() {
//   return (
//     <View style={styles.container}>
//       <DetailListItem title="Edit profile" />
//       <DetailListItem title="Sign in" />
//     </View>
//   );
// }

// Options.navigationOptions = ({ navigation: { goBack } }) => ({
//   title: "Options",
//   headerLeft: (
//     <MaterialIcons
//       name="close"
//       size={24}
//       style={{ color: colors.grey, marginLeft: 10 }}
//       onPress={() => goBack()}
//     />
//   )
// });

export default class Options extends React.Component {

    static navigationOptions = ({ navigation: { goBack } }) => ({
    title: "Options",
    headerLeft: (
      <MaterialIcons
        name="close"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => goBack()}
      />
    )
  });

  render() {
    return (
      <View style={styles.container}>
        <DetailListItem title="Edit profile" />
        <DetailListItem title="Sign in" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue
  }
});

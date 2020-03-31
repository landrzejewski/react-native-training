import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Contacts from "./screens/Contacts";
import Profile from "./screens/Profile";
import Favorites from "./screens/Favorites";
import User from "./screens/User";
import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation-tabs";
import colors from "./utils/colors";

const getIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={24} style={{ color: tintColor }} />
);

const ContactsScreen = createStackNavigator(
  {
    Contacts,
    Profile
  },
  {
    initialRouteName: "Contacts",
    navigationOptions: {
      tabBarIcon: getIcon("list")
    }
  }
);

const FavoritesScreen = createStackNavigator(
  {
    Favorites,
    Profile
  },
  {
    initialRouteName: "Favorites",
    navigationOptions: {
      tabBarIcon: getIcon("star")
    }
  }
);

const UserScreens = createStackNavigator(
  {
    User
  },
  {
    initialRouteName: "User",
    navigationOptions: {
      tabBarIcon: getIcon("person")
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Contacts: ContactsScreen,
    Favorites:FavoritesScreen,
    User: UserScreens
  },
  {
    initialRouteName: "Contacts",
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight
      },
      showLabel: false,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark
    }
  }
);

export default createAppContainer(TabNavigator);

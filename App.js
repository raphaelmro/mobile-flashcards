import React, { Component } from "react";
import { View, Text, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import reducers from "./reducers";
import { purple, white } from "./util/colors";
import { Constants } from "expo";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { setLocalNotification } from "./util/notification";
import DeckList from "./components/DeckList";
import NewDeck from "./components/NewDeck";
// import DeckDetails from './components/DeckDetails'
import * as Colors from "./util/colors";

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList
  },
  NewDeck: {
    screen: NewDeck
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: purple,
              height: Constants.statusBarHeight
            }}
          >
            <StatusBar
              translucent
              backgroundColor={purple}
              barStyle="light-content"
            />
          </View>
          <Tabs />
        </View>
      </Provider>
    );
  }
}

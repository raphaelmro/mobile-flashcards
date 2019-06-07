import React, { Component } from "react";
import { View, Text, Platform, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { purple, white } from "./util/colors";
import { Constants } from "expo";
import { setLocalNotification } from "./util/notification";

import DeckList from "./components/DeckList";

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
          <DeckList />
        </View>
      </Provider>
    );
  }
}

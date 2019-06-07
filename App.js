import React, { Component } from 'react'
import { View, Text, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { Constants } from 'expo'
import { FontAwesome, Feather, SimpleLineIcons } from '@expo/vector-icons'
import { setLocalNotification } from './util/notification'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import * as Colors from './util/colors'

const Tabs = createBottomTabNavigator (
    {
      Decks: {
        screen: DeckList,
        navigationOptions: {
          tabBarLabel: 'Decks',
          tabBarIcon: ({ tintColor }) => (
              <SimpleLineIcons name='layers' size={30} color={tintColor} />
          ),
        },
      },
      NewDeck: {
        screen: NewDeck,
        navigationOptions: {
          tabBarLabel: 'New Deck',
          tabBarIcon: ({ tintColor }) => (
              <Feather name='plus-square' size={30} color={tintColor} />
          ),
        },
      },
    },
    {
      initialRouteName: 'Decks',
      navigationOptions: {
        header: null,
      },
      tabBarOptions: {
        inactiveTintColor: Colors.gray,
        activeTintColor: Colors.purple,
        style: {
          height: 56,
          backgroundColor: Colors.darkBlue
        }
      }
    }
)

const MainNavigator = createStackNavigator(
    {
      Home: {
        screen: Tabs
      },
      Deck: {
        screen: Deck
      },
    }, {
      navigationOptions: {
        headerTintColor: Colors.red,
        headerStyle: {
          backgroundColor: Colors.lightPurp,
          height: 40,
          paddingTop: 0
        },
        headerTitleStyle: {
          alignSelf: 'center',
          textAlign: 'center'
        },
        headerRight: (<View></View>)
      }
    }
);


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
        <Provider store={createStore(reducers)}>
          <View style={{ flex: 1 }} >
            <View style={{ backgroundColor: Colors.purple, height: Constants.statusBarHeight }}>
              <StatusBar translucent backgroundColor={Colors.purple} barStyle='light-content' />
            </View>
            <MainNavigator />
          </View>
        </Provider>
    )
  }
}
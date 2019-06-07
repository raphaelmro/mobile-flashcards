import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import * as Colors from "../util/colors";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title
  });

  render() {
    const { navigation, deck } = this.props;

    return (
      <View>
        <View>
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length} cards</Text>
        </View>

        <TouchableOpacity
          type="new"
          onPress={() => navigation.navigate("NewCard", { deck: deck.title })}
        >
          <Text>Add card</Text>
        </TouchableOpacity>

        {deck.questions.length !== 0 && (
          <TouchableOpacity
            type="quiz"
            onPress={() => {
              if (deck.questions.length !== 0) {
                navigation.navigate("Quiz", { deck: deck.title });
              }
            }}
          >
            <Text>Quiz</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params;

  return {
    deck: decks[title]
  };
}

export default connect(mapStateToProps)(Deck);

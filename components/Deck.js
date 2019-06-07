import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import { connect } from "react-redux";
import * as Colors from "../util/colors";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title
  });

  render() {
    const { navigation, deck } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {deck.title === "" ? (
            <Text style={styles.titleCard}>No title</Text>
          ) : (
            <Text style={styles.titleCard}>{deck.title}</Text>
          )}
          <Text style={{ fontSize: 20 }}>{deck.questions.length} cards</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            type="new"
            onPress={() => navigation.navigate("NewCard", { deck: deck.title })}
          >
            <Text style={{ fontSize: 20 }}>Add card</Text>
          </TouchableOpacity>

          {deck.questions.length !== 0 && (
            <TouchableOpacity
              style={styles.button}
              type="quiz"
              onPress={() => {
                if (deck.questions.length !== 0) {
                  navigation.navigate("Quiz", { deck: deck.title });
                }
              }}
            >
              <Text style={{ fontSize: 20 }}>Start Quiz</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  titleCard: {
    color: Colors.blue,
    fontSize: 32,
    marginTop: 100
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.orange,
    width: 200,
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params;

  return {
    deck: decks[title]
  };
}

export default connect(mapStateToProps)(Deck);

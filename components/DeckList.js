import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { receiveDecks } from "../actions";
import { fetchFlashCards } from "../util/api";
import * as Colors from "../util/colors";

class DeckList extends Component {
  state = {
    ready: false
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Decks"
  });

  componentDidMount() {
    const { receiveDecks } = this.props;
    fetchFlashCards().then(decks => {
      receiveDecks(decks);
    });
  }

  render() {
    const { decks } = this.props;

    if (decks === "undefined") {
      return <Text>Add a new deck.</Text>;
    }

    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        {Object.keys(decks).map(deck => (
          <TouchableOpacity style={styles.container} key={deck}>
            <Text style={{ fontSize: 20, color: Colors.white }}>
              {decks[deck].title}
            </Text>
            {decks[deck].questions.length > 1 ? (
              <Text style={{ fontSize: 20, color: Colors.black }}>
                {decks[deck].questions.length} cards
              </Text>
            ) : (
              <Text style={{ fontSize: 20, color: Colors.black }}>
                {decks[deck].questions.length} card
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightPurp,
    width: 200,
    alignItems: "center",
    borderRadius: 16,
    padding: 20,
    marginTop: 17,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: Colors.gray,
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});
const mapStateToProps = state => {
  return {
    decks: state
  };
};

export default connect(
  mapStateToProps,
  { receiveDecks }
)(DeckList);

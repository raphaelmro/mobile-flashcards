import React, { Component } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { connect } from "react-redux";
import { AppLoading } from "expo";
import { receiveDecks } from "../actions";
import { fetchFlashCards } from "../util/api";

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
      return <AppLoading />;
    }

    return (
      <View>
        {Object.keys(decks).map(deck => (
          <View key={deck}>
            <Text>{decks[deck].title}</Text>
            <Text>{decks[deck].questions.length} cards</Text>
          </View>
        ))}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    decks: state
  };
};

export default connect(
  mapStateToProps,
  { receiveDecks }
)(DeckList);

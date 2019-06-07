import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import * as Colors from "../util/colors";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.title
  });

  render() {
    const { navigation, deck } = this.props;

    return (
      <Container>
        <InnerCard>
          <TitleCard>{deck.title}</TitleCard>
          <DetailsCard>{deck.questions.length} cards</DetailsCard>
        </InnerCard>

        <Button
          type="new"
          onPress={() => navigation.navigate("NewCard", { deck: deck.title })}
        >
          <ButtonText>Add card</ButtonText>
        </Button>

        {deck.questions.length !== 0 && (
          <Button
            type="quiz"
            onPress={() => {
              if (deck.questions.length !== 0) {
                navigation.navigate("Quiz", { deck: deck.title });
              }
            }}
          >
            <ButtonText>Quiz</ButtonText>
          </Button>
        )}
      </Container>
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

import React, { Component } from "react";
import { connect } from "react-redux";
import Result from "./result";
import Card from "./card";

class Quiz extends Component {
  state = {
    step: 0,
    correct: 0,
    showAnswer: false
  };

  onCorrect = () => {
    const { step, correct } = this.state;
    this.setState({ step: step + 1, correct: correct + 1, showAnswer: false });
  };

  onIncorrect = () => {
    const { step } = this.state;
    this.setState({ step: step + 1, showAnswer: false });
  };

  toggleQA = () => {
    const { showAnswer } = this.state;

    this.setState({ showAnswer: !showAnswer });
  };

  resetQuiz = () => {
    this.setState({ step: 0, correct: 0 });
  };

  backToDeck = () => {
    this.props.navigation.navigate("Deck", {
      title: this.props.deck.title
    })
  }

  render() {
    const { step, correct, showAnswer } = this.state;
    const { deck } = this.props;

    if (step < deck.questions.length) {
      return (
        <Card
          onToggle={this.toggleQA}
          onCorrect={this.onCorrect}
          onIncorrect={this.onIncorrect}
          step={step}
          questions={deck.questions}
          showAnswer={showAnswer}
        />
      );
    }

    return (
      <Result
        correct={correct}
        questions={deck.questions.length}
        onRetry={this.resetQuiz}
        backToDeck={this.backToDeck}
        deckTitle={deck.title}
      />
    );
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const { deck } = navigation.state.params;

  return {
    deck: decks[deck]
  };
};

export default connect(mapStateToProps)(Quiz);

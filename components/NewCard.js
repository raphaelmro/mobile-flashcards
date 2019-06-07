import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { addCard } from "../actions";
import * as Colors from "../util/colors";

class NewCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "New Card"
  });

  addCard = () => {
    const { question, answer } = this.state;
    const { navigation, addCard, questions } = this.props;
    const { deck } = navigation.state.params;

    const questionInput = question.trim();
    const answerInput = answer.trim();

    if (
      questions.indexOf(questionInput) !== -1 &&
      questionInput !== oldQuestion
    ) {
      Alert.alert("This question has been added", null, [{ text: "OK" }], {
        cancelable: false
      });
      return void 0;
    }

    addCard({ title: deck, question: questionInput, answer: answerInput });
    navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View>
          <View style={styles.container}>
            <Text style={styles.text}>Question for the card</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Question"
              value={question}
              onChangeText={input => {
                this.setState({ question: input });
              }}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.text}>Answer to the question</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Answer"
              value={answer}
              onChangeText={input => {
                this.setState({ answer: input });
              }}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={this.addCard}>
              <Text style={styles.text}>Save card</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 25,
    backgroundColor: Colors.white
  },
  textInput: {
    fontSize: 20,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderRadius: 0,
    width: 300,
    alignItems: "center",
    borderColor: Colors.blue
  },
  text: {
    fontSize: 20,
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.gray,
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

const mapStateToProps = (decks, { navigation }) => {
  const { deck } = navigation.state.params;

  return {
    questions: decks[deck].questions.reduce((result, current) => {
      result.push(current.question);
      return result;
    }, [])
  };
};

export default connect(
  mapStateToProps,
  { addCard }
)(NewCard);

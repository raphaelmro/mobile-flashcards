import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import * as Colors from "../util/colors";

class NewDeck extends Component {
  state = {
    text: ""
  };

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "New Deck"
  });

  submit = () => {
    const entry = this.state.text;
    const { decks, addDeck, navigation } = this.props;
    const input = entry.trim();
    addDeck({ title: input });
    this.setState({ text: "" });
    navigation.navigate("Deck", { title: input, key: navigation.state.key });
  };

  render() {
    const { text } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding">
        <Text>New Deck Name</Text>

        <View>
          <TextInput
            style={{ backgroundColor: "pink", width: 300, height: 50 }}
            underlineColor="green"
            value={text}
            onChangeText={text => this.setState({ text })}
          />
        </View>
        <TouchableOpacity onPress={this.submit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
  { addDeck }
)(NewDeck);

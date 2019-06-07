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
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={{ fontSize: 20, color: Colors.purple }}>
          New Deck Name
        </Text>

        <View>
          <TextInput
            placeholder="Deck Name"
            style={styles.textInput}
            underlineColor="green"
            value={text}
            onChangeText={text => this.setState({ text })}
          />
        </View>
        <TouchableOpacity onPress={this.submit}>
          <Text style={{ fontSize: 20, color: Colors.purple }}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25
  },
  textInput: {
    fontSize: 20,
    marginTop: 50,
    marginBottom: 50,
    borderBottomWidth: 1,
    borderRadius: 0,
    width: 300,
    alignItems: "center",
    borderColor: Colors.blue
  }
});
const mapStateToProps = state => {
  return {
    decks: state
  };
};

export default connect(
  mapStateToProps,
  { addDeck }
)(NewDeck);

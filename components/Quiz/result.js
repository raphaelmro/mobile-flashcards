import React, { Component } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View, Text, TouchableOpacity } from "react-native";
import { clearLocalNotification } from "../../util/notification";
import { StackActions } from "react-navigation";
import * as Colors from "../../util/colors";


class Result extends Component {
  componentDidMount() {
      clearLocalNotification().then(clearLocalNotification)
  }

    static navigationOptions = {
        title: "Score"
    };

  backToDeck = () => {
      this.props.backToDeck()
  }

  render() {
    const { correct, questions, onRetry } = this.props;
    return (
      <View>
        {correct === questions ? (
          <Text>Awesome!</Text>
        ) : (
          <Text>Almost there!</Text>
        )}

        <View>
          <AnimatedCircularProgress
            size={200}
            width={20}
            fill={(correct / questions) * 100}
            tintColor={Colors.green}
            backgroundColor={Colors.yellow}
            friction={10}
          >
            {fill => <Text>{Math.round(fill)}</Text>}
          </AnimatedCircularProgress>
        </View>
        <TouchableOpacity onPress={() => this.backToDeck()}>
          <Text>Back to Deck</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onRetry}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Result

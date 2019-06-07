import React, { Component } from "react";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { View, Text, TouchableOpacity } from "react-native";
import { clearLocalNotification } from "../../utils/helpers";
import * as Colors from "../../utils/colors";

export default class Result extends Component {
  componentDidMount() {
    clearLocalNotification();
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

        <TouchableOpacity onPress={onRetry}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

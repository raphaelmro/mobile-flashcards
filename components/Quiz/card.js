import React, { Component } from "react";
import styled from "styled-components/native";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Animated
} from "react-native";
import FlipCard from "react-native-flip-card";
import * as Colors from "../../util/colors";

class Progress extends Component {
  componentWillMount() {
    this.animation = new Animated.Value(this.props.progress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration
      }).start();
    }
  }

  render() {
    const { height, barColor, fillColor } = this.props;

    const widthInterpolated = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp"
    });

    return (
      <View style={{ height }}>
        <View
          style={[StyleSheet.absoluteFill, { backgroundColor: fillColor }]}
        />
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: widthInterpolated,
            backgroundColor: barColor
          }}
        />
      </View>
    );
  }
}

Progress.defaultProps = {
  height: 5,
  barColor: Colors.gray,
  fillColor: "transparent",
  duration: 100
};

export default ({
  onToggle,
  onCorrect,
  onIncorrect,
  step,
  questions,
  showAnswer
}) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>
        {step + 1} of {questions.length}
      </Text>
      <Progress
        height={3}
        progress={(step + 1) / questions.length}
        duration={500}
      />

      <ScrollView style={{ flex: 1, marginBottom: 40 }}>
        <FlipCard
          style={styles.flip}
          flipHorizontal={true}
          flipVertical={false}
          flip={showAnswer}
          clickable={false}
          friction={10}
          perspective={6000}
        >
          <View style={styles.inner}>
            <Text style={{ fontSize: 30 }}>{questions[step].question}</Text>
            <TouchableOpacity onPress={onToggle}>
              <Text style={{ fontSize: 20, color: Colors.purple }}>
                View answer
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inner}>
            <Text style={{ fontSize: 30 }}>{questions[step].answer}</Text>
            <TouchableOpacity onPress={onToggle}>
              <Text style={{ fontSize: 20, color: Colors.purple }}>
                View question
              </Text>
            </TouchableOpacity>
          </View>
        </FlipCard>
      </ScrollView>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.green }]}
        onPress={onCorrect}
      >
        <Text style={{ fontSize: 20, alignSelf: "center" }}>True</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors.red }]}
        onPress={onIncorrect}
      >
        <Text style={{ fontSize: 20, alignSelf: "center" }}>False</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flip: {
    flex: 1,
    justifyContent: "center",
    borderWidth: 0,
    alignSelf: "stretch"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 50
  },
  inner: {
    alignItems: "flex-start",
    alignSelf: "stretch"
  },
  button: {
    alignSelf: "center",
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

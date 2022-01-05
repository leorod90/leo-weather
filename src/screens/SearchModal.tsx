import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import Search from '../components/Search';
import Colors from '../constants/Colors';

const {width, height} = Dimensions.get('screen');

interface Props {
  translateX: SharedValue<number>;
  opacity: SharedValue<number>;
}

export default function SearchModal({translateX, opacity}: Props) {
  const closeInput = () => {
    translateX.value = withTiming(width, {duration: 500}, isFinished => {
      if (isFinished) opacity.value = withTiming(0, {duration: 0});
    });
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.blackout, rStyle]}>
      <Search closeInput={closeInput} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  blackout: {
    position: 'absolute',
    zIndex: 100,
    top: 0,
    left: 0,
    height,
    width,
    backgroundColor: Colors.blackout,
  },
});

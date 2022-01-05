import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../constants/Colors';
import getDate from '../functions/getDate';
import {setIndex} from '../redux/actions';
import {rootState} from '../redux/store';

interface Props {
  i: number;
}

export default function Dates({i}: Props) {
  const {index} = useSelector((state: rootState) => state.indexReducer);
  const dispatch = useDispatch();
  const duration = 750;

  const active = useDerivedValue(
    () => (index == i ? withTiming(1, {duration}) : withTiming(0, {duration})),
    [index],
  );

  const tStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      active.value,
      [0, 1],
      [Colors.txt2, Colors.txt],
    );
    return {
      color,
    };
  }, [active]);

  return (
    <TouchableWithoutFeedback onPress={() => dispatch(setIndex(i))}>
      <Animated.Text style={[styles.container, tStyle]}>
        {getDate(i)}
      </Animated.Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Lato-Bold',
  },
});

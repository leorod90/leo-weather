import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import {setIndex} from '../redux/actions';
import {rootState} from '../redux/store';
import ThreeDayItem from './ThreeDayItem';

const {width} = Dimensions.get('screen');

export default function ThreeDay() {
  const {threeDay} = useSelector((state: rootState) => state.reducers);
  const {index} = useSelector((state: rootState) => state.indexReducer);
  const dispatch = useDispatch();

  const prev = threeDay[index - 1];
  const next = threeDay[index + 1];

  const rStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: withTiming(index * -width, {
            duration: 650,
          }),
        },
      ],
    }),
    [index],
  );

  const setIndexHandler = (symbol: string) => {
    if (symbol == 'add') {
      dispatch(setIndex(index + 1));
    } else {
      dispatch(setIndex(index - 1));
    }
  };

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, ctx) => {},
      onActive: (event, ctx) => {},
      onEnd: event => {
        if (event.velocityX < 0) {
          next && runOnJS(setIndexHandler)('add');
        } else if (event.velocityX > 0) {
          prev && runOnJS(setIndexHandler)('subtract');
        }
      },
    });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View
        style={[styles.contain, {width: width * threeDay.length}, rStyle]}>
        {threeDay.map((item: any, i: string) => (
          <ThreeDayItem key={i} item={item} />
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  contain: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

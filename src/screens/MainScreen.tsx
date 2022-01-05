import React from 'react';
import {Dimensions, StyleSheet, SafeAreaView, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';

import {useSelector} from 'react-redux';
import Dates from '../components/Dates';
import HeaderTitle from '../components/HeaderTitle';
import Hourly from '../components/Hourly';
import ThreeDay from '../components/ThreeDay';
import Styles from '../constants/Styles';
import {rootState} from '../redux/store';
import SearchModal from './SearchModal';

const {width} = Dimensions.get('screen');

export default function MainScreen() {
  const {threeDay} = useSelector((state: rootState) => state.reducers);
  const {index} = useSelector((state: rootState) => state.indexReducer);

  const translateX = useSharedValue(width);
  const opacity = useSharedValue(0);

  const aIndex = useDerivedValue(() => withTiming(index), [index]);

  const bStyle = useAnimatedStyle(() => {
    const copyOfThreeDays = threeDay.map(day => day.color);
    const copyOfIndex = threeDay.map((_, i) => i);
    // const backgroundColor = interpolateColor(
    //   aIndex.value,
    //   [0, 1, 2],
    //   copyOfThreeDays,
    // );
    const backgroundColor = interpolateColor(
      aIndex.value,
      copyOfIndex,
      copyOfThreeDays,
    );
    return {
      backgroundColor,
    };
  });

  const openInputHandler = () => {
    translateX.value = withTiming(0, {duration: 0}, isFinished => {
      if (isFinished) opacity.value = withTiming(1, {duration: 500});
    });
  };

  return (
    <Animated.View style={[styles.container, bStyle]}>
      <SafeAreaView style={styles.safe}>
        <HeaderTitle openInput={openInputHandler} />
        <ThreeDay />
        <View style={styles.date}>
          {[...Array(threeDay.length)].map((_, i) => (
            <Dates key={i} i={i} />
          ))}
        </View>
        <View style={styles.hourly}>
          {threeDay.map((item: any, i) => (
            <Hourly hour={item.hourObj.hourArray} key={i} index={index} i={i} />
          ))}
        </View>
      </SafeAreaView>
      <SearchModal translateX={translateX} opacity={opacity} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  safe: {
    flex: 1,
  },
  date: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: Styles.screenPadding,
    marginBottom: Styles.screenPadding,
  },
  hourly: {
    flex: 1,
  },
});

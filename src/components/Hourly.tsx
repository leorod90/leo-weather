import React, {useRef} from 'react';
import {FlatList, Platform, StyleSheet, View} from 'react-native';
import Styles from '../constants/Styles';
import CustomText from './CustomText';
import Colors from '../constants/Colors';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import DelayAnimations from './DelayAnimations';
import image_style from '../data/image_style';

const SIZE = Styles.iconSize;

interface Props {
  hour: any;
  index: number;
  i: number;
}

export default function Hourly({index, i, hour}: Props) {
  const flatListRef = useRef<any>();
  const active = index == i;
  const duration = 750;

  if (active && flatListRef.current) {
    flatListRef.current.scrollToOffset({animated: false, offset: 0});
  }

  const value = useDerivedValue(
    () => (active ? withTiming(1, {duration}) : withTiming(0, {duration})),
    [index],
  );

  const oStyle = useAnimatedStyle(() => {
    return {
      opacity: value.value,
    };
  }, [active]);

  return (
    <Animated.View
      style={[
        styles.container,
        oStyle,
        {
          zIndex: active ? 100 : 0,
        },
      ]}>
      <FlatList
        data={hour}
        decelerationRate={Platform.OS === 'android' ? 0.75 : 'normal'}
        contentContainerStyle={styles.flat}
        horizontal
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          const icon = item.icon;
          const Logo = image_style[icon].icon;

          return (
            <DelayAnimations index={index} active={active ? 1 : 0}>
              <View style={styles.item}>
                <CustomText style={{color: Colors.gray}}>
                  {item.hours}
                </CustomText>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    marginTop: Styles.screenPadding / 2,
                    justifyContent: 'center',
                  }}>
                  <Logo width={SIZE} height={SIZE} fill={'white'} />
                </View>
                <View style={styles.temp}>
                  <CustomText bold style={{fontSize: 32}}>
                    {item.temp}
                  </CustomText>
                  <CustomText bold style={{fontSize: 24, paddingTop: 2}}>
                    &deg;
                  </CustomText>
                </View>
              </View>
            </DelayAnimations>
          );
        }}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  flat: {
    paddingLeft: Styles.screenPadding,
    paddingBottom: Styles.screenPadding,
    flexGrow: 1,
  },
  item: {
    height: '100%',
    width: 150,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,.25)',
    marginRight: Styles.screenPadding,
    marginLeft: 0,
    padding: Styles.screenPadding,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  temp: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingLeft: 12,
  },
});

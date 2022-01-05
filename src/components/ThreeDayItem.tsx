import React from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import CustomText from './CustomText';
import image_style from '../data/image_style';
import Styles from '../constants/Styles';

const {width, height} = Dimensions.get('screen');

interface Props {
  item: any;
}

const FONT_SIZE = Styles.fontSize;
const DEGREE_SIZE = FONT_SIZE * 0.75;
const PADDING = FONT_SIZE * 0.0625;

export default function ThreeDayItem({item}: Props) {
  const {temp, weather} = item;
  const {main, description, icon} = weather[0];

  return (
    <View style={styles.item}>
      <Image
        style={styles.image}
        resizeMode="stretch"
        source={image_style[icon].image}
      />
      <View style={{alignItems: 'center'}}>
        <CustomText style={{fontSize: 22}}>{main}</CustomText>
        <View style={styles.temp}>
          <CustomText bold style={{fontSize: FONT_SIZE}}>
            {temp}
          </CustomText>
          <CustomText bold style={{fontSize: DEGREE_SIZE, paddingTop: PADDING}}>
            &deg;
          </CustomText>
        </View>
        <CustomText style={{fontSize: 18}}>{description}</CustomText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  image: {
    height: height / 4,
    width: width * 0.6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  temp: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingLeft: 24,
  },
});

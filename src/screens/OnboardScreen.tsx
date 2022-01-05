import React, {useEffect} from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import CustomText from '../components/CustomText';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import image_style from '../data/image_style';
import getLocation from '../functions/getLocation';
import SearchModal from './SearchModal';

const {width} = Dimensions.get('screen');

export default function OnboardScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    getLocation(dispatch);
  }, []);

  const translateX = useSharedValue(width);
  const opacity = useSharedValue(0);

  const openInputHandler = () => {
    translateX.value = withTiming(0, {duration: 0}, isFinished => {
      if (isFinished) opacity.value = withTiming(1, {duration: 500});
    });
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <View style={styles.shadow}>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={image_style['50n'].image}
          />
        </View>
        <View style={styles.btmContain}>
          <CustomText style={styles.font} bold>
            Daily
            <CustomText style={[styles.font, {color: '#FFA726'}]}>
              {' '}
              Weather{' '}
            </CustomText>
            App
          </CustomText>
          <TouchableOpacity style={styles.btn} onPress={openInputHandler}>
            <CustomText style={{fontSize: 22}} bold>
              Get Started
            </CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SearchModal translateX={translateX} opacity={opacity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.onboard,
  },
  shadow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    height: 220,
    width: 240,
  },
  btmContain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  font: {
    fontSize: 32,
    color: 'white',
  },
  btn: {
    backgroundColor: '#FFA726',
    borderRadius: 10,
    paddingHorizontal: Styles.screenPadding * 2,
    paddingVertical: Styles.screenPadding / 2,
  },
});

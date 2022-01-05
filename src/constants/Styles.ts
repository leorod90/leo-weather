import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

const screenPadding = width * 0.05;
const small = height < 820;

export default {
  screenPadding,
  fontSize: small ? 48 : 64,
  iconSize: small ? 60 : 80,
};

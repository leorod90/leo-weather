import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');

const screenPadding = width * 0.05;

let Style: any;

if (height < 820) {
  Style = {
    screenPadding,
    fontSize: 48,
    iconSize: 60,
  };
} else {
  Style = {
    screenPadding,
    fontSize: 64,
    iconSize: 80,
  };
}

export default Style;

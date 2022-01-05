import React from 'react';
import {Text} from 'react-native';
import Colors from '../constants/Colors';

interface Props {
  bold?: boolean;
  gray?: boolean;
  style?: any;
  numberOfLines?: number;
  children: React.ReactNode;
}

export default function CustomText({
  bold,
  gray,
  style,
  children,
  numberOfLines,
}: Props) {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: bold ? 'Lato-Bold' : 'Lato-Regular',
          color: gray ? Colors.gray : Colors.txt,
        },
        style,
      ]}>
      {children}
    </Text>
  );
}

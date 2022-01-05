import React from 'react';
import {View, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Styles from '../constants/Styles';

export default function CustomStatusBar() {
  return (
    <>
      {/* <StatusBar barStyle="light-content" /> */}
      <View
        style={{
          height: getStatusBarHeight(true),
          paddingTop: Styles.screenPadding,
          width: '100%',
        }}
      />
    </>
  );
}

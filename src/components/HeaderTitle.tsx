import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import Styles from '../constants/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../redux/store';

import getLocation from '../functions/getLocation';

interface Props {
  openInput: () => void;
}

const SIZE = 22;

export default function HeaderTitle({openInput}: Props) {
  const {city} = useSelector((state: rootState) => state.reducers);
  const dispatch = useDispatch();

  const getGeo = () => {
    getLocation(dispatch);
  };

  return (
    <View style={styles.contain}>
      <Icon name="location" size={SIZE} onPress={getGeo} />
      <TouchableOpacity onPress={openInput} style={styles.right}>
        <CustomText
          bold
          style={{fontSize: 24, marginLeft: Styles.screenPadding / 2}}>
          {city}
        </CustomText>
        <Icon name="chevron-down" size={SIZE} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Styles.screenPadding,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

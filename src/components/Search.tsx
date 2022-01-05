import React from 'react';
import {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';
import Styles from '../constants/Styles';
import city_names from '../data/city_names';
import CustomText from './CustomText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStatusBar from './CustomStatusBar';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {setCityName, setIndex} from '../redux/actions';

const SIZE = 22;
const BOTTOM_PADDING = Platform.OS === 'android' ? 20 : 6;

interface Props {
  closeInput: () => void;
}

export default function Search({closeInput}: Props) {
  const [value, setValue] = useState('');
  const [filterData, setFilterData] = useState<any>([]);
  const [show, setShow] = useState(false);
  const opacity = useSharedValue(0);

  const dispatch = useDispatch();

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  React.useEffect(() => {
    opacity.value = withTiming(1);
  }, []);

  const handleFilter = (input: string) => {
    setValue(input);
    const search = input.trim();
    if (search == '') {
      setShow(false);
      return;
    }

    const newFilter = city_names.filter(v =>
      v.toLowerCase().includes(search.toLowerCase()),
    );

    setFilterData(newFilter);
    setShow(true);
  };

  const setCityHandler = (c: string) => {
    dispatch(setIndex(0));
    dispatch(setCityName(c));
    closeSearch(true);
  };

  const closeSearch = (close: boolean) => {
    Keyboard.dismiss();
    setValue('');
    setShow(false);
    if (close) {
      closeInput();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => closeSearch(true)}>
      <View style={styles.container}>
        <CustomStatusBar />
        <View style={styles.search}>
          <View style={styles.inputContain}>
            <TextInput
              placeholder={'U.S. City Name'}
              placeholderTextColor={Colors.txt2}
              value={value}
              onChangeText={handleFilter}
              selectionColor="white"
              autoCapitalize="none"
              style={styles.input}
            />
            {show && (
              <TouchableWithoutFeedback
                style={{width: SIZE}}
                onPress={() => closeSearch(false)}>
                <Icon
                  style={styles.close}
                  name="close-circle"
                  size={SIZE}
                  color={Colors.txt2}
                />
              </TouchableWithoutFeedback>
            )}
          </View>
          <CustomText style={styles.cancel}>Cancel</CustomText>
        </View>
        {!show ? null : !Array.isArray(filterData) || !filterData.length ? (
          <KeyboardAwareScrollView contentContainerStyle={styles.noResult}>
            <Icon
              name="search"
              size={SIZE * 3}
              color="white"
              style={{marginBottom: Styles.screenPadding}}
            />
            <CustomText bold style={{color: 'white', fontSize: 20}}>
              No Results
            </CustomText>
          </KeyboardAwareScrollView>
        ) : (
          <View style={styles.result}>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.scroll}
              onStartShouldSetResponder={() => true}>
              {filterData.map((c: string) => (
                <Pressable
                  key={c}
                  onPress={() => setCityHandler(c)}
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? Colors.gray : 'rgba(0,0,0,0)',
                    },
                    styles.item,
                  ]}>
                  <CustomText style={{color: Colors.txt2, fontSize: 16}}>
                    {c}
                  </CustomText>
                </Pressable>
              ))}
            </KeyboardAwareScrollView>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 200,
    elevation: 6,
    paddingTop: Styles.screenPadding,
  },
  search: {
    paddingHorizontal: Styles.screenPadding,
    width: '100%',
    height: 22 + Styles.screenPadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    paddingVertical: Styles.screenPadding / 2,
    paddingHorizontal: Styles.screenPadding,
    paddingRight: SIZE + Styles.screenPadding,
    borderRadius: 25,
    backgroundColor: Colors.inputBackground,
    fontFamily: 'Lato-Bold',
    fontSize: 22,
    color: 'white',
    width: '100%',
  },
  close: {
    position: 'absolute',
    right: SIZE / 2,
  },
  cancel: {
    color: Colors.txt2,
    fontSize: 16,
    paddingHorizontal: Styles.screenPadding,
  },
  noResult: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  result: {
    width: '100%',
    // paddingVertical: Styles.screenPadding,
  },
  item: {
    paddingVertical: 7.5,
    paddingLeft: Styles.screenPadding * 2,
    justifyContent: 'center',
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: Styles.screenPadding * BOTTOM_PADDING,
  },
});

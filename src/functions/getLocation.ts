import {Alert} from 'react-native';
import RNLocation from 'react-native-location';
import {Dispatch} from 'redux';
import {searchCoordinate} from '../redux/actions';

RNLocation.configure({
  distanceFilter: 5,
});

export default async (dispatch: Dispatch<any>) => {
  try {
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse', // or 'fine'
      },
    });

    let location;
    let getPermission;
    console.log(permission);
    if (!permission) {
      getPermission = await RNLocation.requestPermission({
        ios: 'whenInUse', // or 'always'
        android: {
          detail: 'coarse', // or 'fine'
          rationale: {
            title: 'We need to access your location',
            message:
              'Your location is used to automatically get the weather near your area.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });

      console.log(getPermission);

      location = await RNLocation.getLatestLocation({timeout: 100});
      const coordinates = {
        lat: location.latitude,
        lng: location.longitude,
      };

      dispatch(searchCoordinate(coordinates));
    } else {
      location = await RNLocation.getLatestLocation({timeout: 100});
      const coordinates = {
        lat: location.latitude,
        lng: location.longitude,
      };
      console.log(coordinates);
      dispatch(searchCoordinate(coordinates));
    }
  } catch (error) {
    console.log('error');
    Alert.alert('Could Not Find Location', 'please enable location', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }
};

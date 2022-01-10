import {Alert, PermissionsAndroid, Platform} from 'react-native';
import RNLocation from 'react-native-location';
import {Dispatch} from 'redux';
import {searchCoordinate} from '../redux/actions';
import Geolocation from 'react-native-geolocation-service';

RNLocation.configure({
  distanceFilter: 100, // Meters
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },
  // Android only
  androidProvider: 'auto',
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: 'other',
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
});

const iOS = async (dispatch: Dispatch<any>) => {
  try {
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse', // or 'fine'
      },
    });

    let location: any;
    let getPermission;

    if (permission) {
      location = await RNLocation.getLatestLocation({timeout: 10000});

      const coordinates = {
        lat: location.latitude,
        lng: location.longitude,
      };

      dispatch(searchCoordinate(coordinates));
    } else {
      getPermission = await RNLocation.requestPermission({
        ios: 'whenInUse', // or 'always'
        android: {
          detail: 'fine', // or 'fine'
          rationale: {
            title: 'We need to access your location',
            message:
              'Your location is used to automatically get the weather near your area.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });

      location = await RNLocation.getLatestLocation({timeout: 10000});
      const coordinates = {
        lat: location.latitude,
        lng: location.longitude,
      };

      dispatch(searchCoordinate(coordinates));
    }
  } catch (error) {
    console.log('error:' + error);
    Alert.alert('Could Not Find Location', 'please enable location', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }
};

const Android = async (dispatch: Dispatch<any>) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'We would like to access your location' +
          'in order to get the weather near you.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        position => {
          const coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log(coordinates);
          dispatch(searchCoordinate(coordinates));
        },
        error => {
          Alert.alert(`Code ${error.code}`, error.message);
          console.log(error);
        },
        {
          accuracy: {
            android: 'high',
            ios: 'best',
          },
          // enableHighAccuracy: highAccuracy,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 0,
          // forceRequestLocation: forceLocation,
          // forceLocationManager: useLocationManager,
          // showLocationDialog: locationDialog,
        },
      );
    } else {
      Alert.alert('Could Not Find Location', 'please enable location', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  } catch (err) {
    console.warn(err);
  }
};

export default Platform.OS === 'ios' ? iOS : Android;

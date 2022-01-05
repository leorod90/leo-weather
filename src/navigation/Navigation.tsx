import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {rootState} from '../redux/store';
import OnboardScreen from '../screens/OnboardScreen';
import MainScreen from '../screens/MainScreen';
import {setCityName} from '../redux/actions';

export default function Navigation() {
  const threeDay = useSelector((state: rootState) => state.reducers.threeDay);
  const city = useSelector((state: rootState) => state.reducers.city);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (threeDay === undefined || threeDay.length == 0) {
      dispatch(setCityName(city));
    }
  }, []);

  if (
    threeDay === undefined ||
    threeDay.length == 0 ||
    city == null ||
    city == ''
  )
    return <OnboardScreen />;

  return <MainScreen />;
}

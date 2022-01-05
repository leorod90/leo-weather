import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Navigation from './src/navigation/Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import stores from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
const {store, persistor} = stores();

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <Navigation />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import Navigation from './src/navigation/Navigation';
import {PersistGate} from 'redux-persist/integration/react';
import stores from './src/redux/store';
const {store, persistor} = stores();

export default function App() {
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

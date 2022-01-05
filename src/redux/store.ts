import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import indexReducer from './indexReducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';

// AsyncStorage.clear();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['indexReducer'],
};

const rootReducer = combineReducers({reducers, indexReducer});

export type rootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const Store = createStore(rootReducer, applyMiddleware(thunk));

export default () => {
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  let persistor = persistStore(store);
  return {store, persistor};
};

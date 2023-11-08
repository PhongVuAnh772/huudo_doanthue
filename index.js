/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './src/screens/store/app';
// import messaging from '@react-native-firebase/messaging';

// messaging().setBackgroundMessageHandler(async message => {
//   console.log(message);
// })

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);

require('./config');
const { Provider } = require('react-redux');
const configureStore = require('./src/store/configureStore');

const App = require('./src/containers/App');

const {
  AppRegistry,
  View,
} = ReactNative;

const store = configureStore();

function HMIM() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent('HMIM', () => HMIM);

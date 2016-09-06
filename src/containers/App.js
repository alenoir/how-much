const Metrics = require('../views/Metrics');

const {
  StatusBar,
  View,
  StyleSheet,
} = ReactNative;

const {
  Component,
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2DB0CD',
  },
});

class App extends Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <Metrics />
      </View>
    );
  }
}

module.exports = App;

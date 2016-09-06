const { bindActionCreators } = require('redux');
const { connect }            = require('react-redux');
const MetricActions            = require('../actions/MetricActions');
const Colors                 = require('../constants/Colors');

const {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  StatusBarIOS,
} = ReactNative;

const {
  Component,
  PropTypes,
} = React;

const {width, height} = Dimensions.get('window');

function isNumeric(n) {
  console.log(!isNaN(parseFloat(n)) && isFinite(n))
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2DB0CD',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    fontFamily: 'Varela Round',
    fontSize: 30,
    color: 'white',
  },
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontFamily: 'Varela Round',
    color: 'white',
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 0,
    fontSize: 40,
    marginTop: 20,
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceTypeContainer: {
    width: width,
    flexDirection: 'row',
  },
  choiceMetricContainer: {
    width: width,
    flexDirection: 'row',
  },
  buttonChoice: {
    alignSelf: 'center',
    width: width / 5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonChoiceText: {
    fontFamily: 'Varela Round',
    color: 'white',
    fontSize: 18,
  },
  buttonType: {
  },
  buttonTypeSelected: {
    backgroundColor: '#32BF69',
  },
  buttonMetric: {
  },
  buttonMetricSelected: {
    backgroundColor: '#32BF69',
  },

  listContainer: {
    flex: 5,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    width: width / 2,
    height: width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontFamily: 'Varela Round',
    color: 'white',
    fontSize: 25,
  },
  itemNumber: {
    fontFamily: 'Varela Round',
    color: 'white',
    fontSize: 50,
  },
});

class App extends Component {

  constructor() {
    super();
    this.state = {
      type: 'Surface',
      metric: 'm2',
      value: 0,
    };
  }

  componentDidMount() {
    this.props.actions.getMetrics();
    //StatusBarIOS.setStyle('light-content');
  }

  handleChangeValue(value) {
    if (isNumeric(value) || value === '') {
      this.setState({
        value: value,
      });
    }
  }

  handleChangeType(type) {
    const metrics = this.props.metric.map.get(type).keySeq().toArray();

    this.setState({
      type: type,
      metric: metrics[0],
    });
  }
  handleChangeMetric(metric) {
    this.setState({
      metric: metric,
    });
  }

  renderChoiceType(type) {
    const btnStyle = [];
    btnStyle.push(styles.buttonChoice);
    btnStyle.push(styles.buttonType);
    if (this.state.type === type) {
      btnStyle.push(styles.buttonTypeSelected);
    }
    return (
      <TouchableWithoutFeedback onPress={this.handleChangeType.bind(this, type)}>
        <View style={btnStyle}>
          <Text style={styles.buttonChoiceText}>{type}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderChoiceMetric(metric) {
    const btnStyle = [];
    btnStyle.push(styles.buttonChoice);
    btnStyle.push(styles.buttonMetric);
    if (this.state.metric === metric) {
      btnStyle.push(styles.buttonMetricSelected);
    }
    return (
      <TouchableWithoutFeedback onPress={this.handleChangeMetric.bind(this, metric)}>
        <View style={btnStyle}>
          <Text style={styles.buttonChoiceText}>{metric}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderItem(item) {
    const multiple = parseFloat(this.state.value) / parseFloat(item.get('value'));
    let multipleClean = Math.round(multiple * 10) / 10;
    if (isNaN(multipleClean)) {
      multipleClean = 0;
    }

    return (
      <View style={styles.item} key={'item_' + item.id}>
        <Text style={styles.itemTitle}>{item.get('name')}</Text>
        <Text style={styles.itemNumber}>{multipleClean}</Text>
      </View>
    );
  }

  render() {
    const {map} = this.props.metric;

    if (map.get(this.state.type) && map.get(this.state.type).get(this.state.metric)) {
      const list = map.get(this.state.type).get(this.state.metric);

      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus='true'
              style={styles.input}
              onChangeText={this.handleChangeValue.bind(this)}
              value={this.state.value}
              keyboardType='number-pad'
              placeholder=''
            />
          </View>
          <View style={styles.choiceContainer}>
            <ScrollView
              automaticallyAdjustContentInsets={true}
              horizontal={true}
              style={[styles.choiceTypeContainer]}>
              {map.map((items, key) => {
                return this.renderChoiceType(key);
              })}
            </ScrollView>
            <ScrollView
              automaticallyAdjustContentInsets={true}
              horizontal={true}
              style={[styles.choiceMetricContainer]}>
              {map.get(this.state.type).map((items, key) => {
                return this.renderChoiceMetric(key);
              })}
            </ScrollView>
          </View>
          <ScrollView style={styles.listContainer}>
            <View style={styles.list}>
            {list.map((item) => {
              return this.renderItem(item);
            })}
            </View>
          </ScrollView>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <Text style={styles.loader}>Loading...</Text>
        </View>
      </View>
    );
  }

}

App.propTypes = {
  metric: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  metric: state.metric,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(MetricActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);

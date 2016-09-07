import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MetricActions from '../actions/MetricActions';
import ChoiceButton from '../components/ChoiceButton';
import Loader from '../components/Loader';

const {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ScrollView,
  Text,
} = ReactNative;

const {
  Component,
  PropTypes,
} = React;

const { width } = Dimensions.get('window');

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2DB0CD',
  },
  inputContainer: {
    flex: 1,
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

export class Metrics extends Component {

  constructor() {
    super();
    this.state = {
      type: 'Surface',
      metric: 'm2',
      value: '',
    };
  }

  componentDidMount() {
    this.props.actions.getMetrics();
  }

  handleChangeValue(value) {
    if (isNumeric(value) || value === '') {
      this.setState({
        value,
      });
    }
  }

  handleChangeType(type) {
    const metrics = this.props.metric.map.get(type).keySeq().toArray();

    this.setState({
      type,
      metric: metrics[0],
    });
  }

  handleChangeMetric(metric) {
    this.setState({
      metric,
    });
  }

  renderItem(item) {
    const multiple = parseFloat(this.state.value) / parseFloat(item.get('value'));
    let multipleClean = Math.round(multiple * 10) / 10;
    if (isNaN(multipleClean)) {
      multipleClean = 0;
    }

    return (
      <View style={styles.item} key={`item_${item.id}`}>
        <Text style={styles.itemTitle}>{item.get('name')}</Text>
        <Text style={styles.itemNumber}>{multipleClean}</Text>
      </View>
    );
  }

  render() {
    const { map } = this.props.metric;

    if (map.get(this.state.type) && map.get(this.state.type).get(this.state.metric)) {
      const list = map.get(this.state.type).get(this.state.metric);

      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              autoFocus
              style={styles.input}
              onChangeText={((value) => this.handleChangeValue(value))}
              value={this.state.value}
              keyboardType="number-pad"
              placeholder=""
              underlineColorAndroid="transparent"
              tintColor="white"
              autoCorrect={false}
            />
          </View>
          <View style={styles.choiceContainer}>
            <ScrollView
              automaticallyAdjustContentInsets
              horizontal
              style={[styles.choiceTypeContainer]}
            >
              {map.keySeq().map((type) => {
                return (
                  <ChoiceButton
                    key={type}
                    name={type}
                    selected={type === this.state.type}
                    onPress={((value) => this.handleChangeType(value))}
                  />
                );
              })}
            </ScrollView>
            <ScrollView
              automaticallyAdjustContentInsets
              horizontal
              style={[styles.choiceMetricContainer]}
            >
              {map.get(this.state.type).keySeq().map((metric) => {
                return (
                  <ChoiceButton
                    key={metric}
                    name={metric}
                    selected={metric === this.state.metric}
                    onPress={((value) => this.handleChangeMetric(value))}
                  />
                );
              })}
            </ScrollView>
          </View>
          <ScrollView style={styles.listContainer}>
            <View style={styles.list}>
            {list.valueSeq().map((item) => {
              return this.renderItem(item);
            })}
            </View>
          </ScrollView>
        </View>
      );
    }

    return (
      <Loader />
    );
  }

}

Metrics.propTypes = {
  metric: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  metric: state.metric,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(MetricActions, dispatch),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(Metrics);

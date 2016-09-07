const {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} = ReactNative;

const {
  Component,
  PropTypes,
} = React;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    alignSelf: 'center',
    width: width / 5,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Varela Round',
    color: 'white',
    fontSize: 18,
  },
  selected: {
    backgroundColor: '#32BF69',
  },
});

class ChoiceButton extends Component {

  render() {
    const { name, selected, onPress } = this.props;

    const btnStyle = [];
    btnStyle.push(styles.content);
    if (selected) {
      btnStyle.push(styles.selected);
    }

    return (
      <TouchableWithoutFeedback
        key={name}
        onPress={(() => onPress(name))}
      >
        <View style={btnStyle}>
          <Text style={styles.text}>{name}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ChoiceButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

module.exports = ChoiceButton;

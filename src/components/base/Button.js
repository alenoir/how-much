const Colors = require('../../constants/Colors');

const {
  TouchableOpacity,
  StyleSheet,
  Text,
  Component,
} = React;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: Colors.WHITE1,
    alignItems: 'center',
  },
  btnText: {
    color: Colors.BLACK1,
    fontSize: 15,
    fontWeight: '900',
    fontFamily: 'Avenir Next',
  },
  darkContainer: {
    backgroundColor: Colors.BLACK1,
  },
  darkBtn: {
    color: Colors.WHITE1,
  },
});

class Button extends Component {
  render() {
    const darkStyle = this.props.btnStyle === 'dark';
    return (
      <TouchableOpacity style={[styles.container, darkStyle && styles.darkContainer, this.props.style]}
        onPress={this.props.onPress}>
        <Text style={[styles.btnText, darkStyle && styles.darkBtn]}>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

module.exports = Button;

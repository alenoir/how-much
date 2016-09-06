const Colors = require('../../constants/Colors');

const {
  Text,
  TextInput,
  StyleSheet,
  Component,
} = React;

// TODO add PropTypes

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontFamily: 'QuickSand-Regular',
    textAlign: 'center',
    fontWeight: '400',
    color: Colors.BLACK1, // IDEA put this in props
  },
  placeholder: {
    opacity: 0.3,
  },
  textInput: {
    height: 30,
  },
});

class EditableText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: true,
      value: props.value,
    };
  }

  render() {
    if (this.state.editing) {
      return this.renderTextInput();
    }
    return this.renderText();
  }

  renderText() {
    const content = this.state.value || this.props.placeholder || '';
    return (
      <Text onPress={() => this.setState({editing: true})}
        style={[styles.text, !this.state.value && styles.placeholder]}>
        {content}
      </Text>
    );
  }

  renderTextInput() {
    return (
      <TextInput
        returnKeyType={"done"}
        autoFocus={true}
        value={this.state.value}
        defaultValue={this.props.placeholder}
        onChangeText={(value) => this.setState({value})}
        onSubmitEditing={() => this.setState({editing: false})}
        style={[styles.text, styles.textInput]}/>
    );
  }

}

module.exports = EditableText;

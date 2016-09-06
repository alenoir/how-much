import renderer from 'react-test-renderer'; // eslint-disable-line

import '../../../config.js';
import ChoiceButton from '../ChoiceButton';

describe('Choice Button', () => {
  it('Render unselected', () => {
    const props = {
      name: 'TestString',
      onPress: () => {},
      selected: false,
    };
    const tree = renderer.create(
      <ChoiceButton {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Render selected', () => {
    const props = {
      name: 'TestString',
      onPress: () => {},
      selected: true,
    };

    const tree = renderer.create(
      <ChoiceButton {...props} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

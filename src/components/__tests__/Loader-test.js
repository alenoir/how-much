import renderer from 'react-test-renderer'; // eslint-disable-line

import '../../../config.js';
import Loader from '../Loader';

describe('Loader', () => {
  it('Render', () => {
    const tree = renderer.create(
      <Loader />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

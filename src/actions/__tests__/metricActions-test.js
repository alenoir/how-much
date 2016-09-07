import configureMockStore from 'redux-mock-store'; // eslint-disable-line
import thunk from 'redux-thunk';
import * as actions from '../MetricActions';
import * as types from '../../constants/ActionTypes';
import Metrics from '../../constants/Metrics.json';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Metric Actions', () => {
  it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
    const expectedActions = [
      { type: types.FETCH_METRICS_REQUEST },
      { type: types.FETCH_METRICS_SUCCESS, metrics: Metrics },
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(actions.getMetrics())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

import '../../../config.js';
import Metrics from '../../constants/Metrics.json';
import metricReducer from '../metric';
import * as types from '../../constants/ActionTypes';

const { Map } = Immutable;

describe('Metric reducer', () => {
  it('should return the initial state', () => {
    const state = metricReducer(undefined, {});

    expect(state.get('map')).toEqual(new Map());
    expect(state.get('loading')).toEqual(false);
  });

  it('should handle FETCH_METRICS_REQUEST', () => {
    const state = metricReducer(undefined, {
      type: types.FETCH_METRICS_REQUEST,
    });

    expect(state.get('map')).toEqual(new Map());
    expect(state.get('loading')).toEqual(true);
  });

  it('should handle FETCH_METRICS_SUCCESS', () => {
    const state = metricReducer(undefined, {
      type: types.FETCH_METRICS_SUCCESS,
      metrics: Metrics,
    });

    expect(state.get('map')).not.toEqual(new Map());
    expect(state.get('loading')).not.toEqual(true);
  });
});

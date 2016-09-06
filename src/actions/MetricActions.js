import Metrics from '../constants/Metrics.json';
import {
  FETCH_METRICS_REQUEST,
  FETCH_METRICS_SUCCESS,
} from '../constants/ActionTypes';

module.exports = {
  getMetrics: () => {
    return dispatch => {
      dispatch({ type: FETCH_METRICS_REQUEST });
      const metrics = Metrics;
      dispatch({ type: FETCH_METRICS_SUCCESS, metrics });
    };
  },
};

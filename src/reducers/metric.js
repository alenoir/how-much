import {
  FETCH_METRICS_REQUEST,
  FETCH_METRICS_SUCCESS,
} from '../constants/ActionTypes';

const { Map, Record } = Immutable;
const InitialState = new Record({
  map: new Map(),
  loading: false,
});

const initialState = new InitialState();

const getMap = function (data) {
  return new Map().withMutations((m) => {
    data.forEach((item) => {
      let map = new Map();
      map = map.set(item.id, Immutable.fromJS(item));
      m.mergeIn([item.type, item.metric], map);
    });
  });
};

module.exports = (state = initialState, action) => {
  let map = new Map();
  switch (action.type) {
    case FETCH_METRICS_REQUEST:
      return state.merge({
        loading: true,
      });

    case FETCH_METRICS_SUCCESS:
      map = getMap(action.metrics);

      return state.merge({
        map,
        loading: false,
      });


    default:
      return state;
  }
};

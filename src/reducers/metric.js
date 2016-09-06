import {
  FETCH_METRICS_SUCCESS,
} from '../constants/ActionTypes';

const { List, Map, Record } = Immutable;
const InitialState = new Record({
  list: new List(),
  map: new Map(),
  listLoaded: false,
  isSubseriePageLoaded: false,
  isImageLoading: false,
});

const initialState = new InitialState();

const getMap = function (data) {
  return new Map().withMutations((m) => {
    data.forEach((item) => {
      let map = new Map();
      map = map.set(item.id, item);
      m.mergeIn([item.get('type'), item.get('metric')], map);
    });
  });
};

module.exports = (state = initialState, action) => {
  let list = new List();
  let map = new Map();
  switch (action.type) {
    case FETCH_METRICS_SUCCESS:
      list = Immutable.fromJS(action.metrics);
      map = getMap(list);

      return state.merge({
        map,
      });


    default:
      return state;
  }
};

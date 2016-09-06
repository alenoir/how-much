const {
  FETCH_METRICS_SUCCESS,
}  = require('../constants/ActionTypes');

const InitialState = Immutable.Record({
  list: Immutable.List(),
  map: Immutable.Map(),
  listLoaded: false,
  isSubseriePageLoaded: false,
  isImageLoading: false,
});

const initialState = new InitialState();

const getMap = function(data) {
  console.log(data);
  return Immutable.Map().withMutations( (m) => {
    data.forEach( (item) => {
      console.log(item);
      let map = Immutable.Map();
      map = map.set(item.id, item);
      m.mergeIn([item.get('type'), item.get('metric')], map);
    });
  });
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_METRICS_SUCCESS:
  console.log(action.metrics);
    const list = Immutable.fromJS(action.metrics);
    const map = getMap(list);

    return state.merge({
      map: map,
    });


  default:
    return state;
  }
};

const { combineReducers } = require('redux');
const metric = require('./metric');

const rootReducer = combineReducers({
  metric,
});

module.exports = rootReducer;

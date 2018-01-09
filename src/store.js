import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const reducers = {
};

const middleware = [
  thunkMiddleware,
];

export default createStore(
  combineReducers(reducers),
  composeWithDevTools(applyMiddleware(...middleware)),
);

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Raven from 'raven-js';
import createRavenMiddleware from 'raven-for-redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as form } from 'redux-form';
import player from './player/player.reducer';
import workspace from './workspace/workspace.reducer';
import template from './template/template.reducer';
import chronicle from './chronicle/chronicle.reducer';
import render from './render/render.reducer';
import membership from './membership/membership.reducer';
import campaign from './shared/campaign.reducer';
import config from './config';

Raven.config(config.ravenDSN).install();

const reducers = {
  form,
  player,
  workspace,
  template,
  chronicle,
  render,
  membership,
  campaign,
};

const middleware = [
  createRavenMiddleware(Raven), // must be first
  thunkMiddleware,
];

export default createStore(
  combineReducers(reducers),
  composeWithDevTools(applyMiddleware(...middleware)),
);

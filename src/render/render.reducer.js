import { createAction, handleActions, combineActions } from 'redux-actions';
import { thunkify } from '../shared/util.helper';
import {
  apiGetRenders,
  apiGetRender,
  apiCreateRender,
  apiUpdateRender,
  apiRemoveRender,
} from './render.service';
import { PLAYER_LOGOUT } from '../player/player.reducer';
import { attemptAlert } from '../shared/campaign.reducer';

/**
 * Initial state
 */
const initialState = {
  renders: [],
  current: null,
  problem: null,
  loading: false,
  success: null,
};

/**
 * Constants
 */
export const RENDER_RESET = 'rumblum/render/RESET';
export const RENDER_LOADING = 'rumblum/render/LOADING';
export const RENDER_SUCCESS = 'rumblum/render/SUCCESS';
export const RENDER_ERRORED = 'rumblum/render/ERRORED';
export const RENDER_SET = 'rumblum/render/SET';
export const RENDER_REPLACE = 'rumblum/render/REPLACE';
export const RENDER_REMOVE = 'rumblum/render/REMOVE';
export const RENDER_ADD = 'rumblum/render/ADD';
export const RENDER_CURRENT = 'rumblum/render/CURRENT';
export const RENDER_PATCH = 'rumblum/render/PATCH';

/**
 * Actions
 *
 * These describe what happened.
 */
export const resetRender = createAction(RENDER_RESET);
export const loadingRender = createAction(RENDER_LOADING);
export const successRender = createAction(RENDER_SUCCESS);
export const erroredRender = createAction(RENDER_ERRORED);
export const setRender = createAction(RENDER_SET);
export const replaceRender = createAction(RENDER_REPLACE);
export const removeRender = createAction(RENDER_REMOVE);
export const addRender = createAction(RENDER_ADD);
export const currentRender = createAction(RENDER_CURRENT);
export const patchRender = createAction(RENDER_PATCH);

/**
 * Config
 */
const thunk = thunkify({
  start: dispatch => dispatch(loadingRender()),
  end: dispatch => dispatch(loadingRender(false)),
  error: (e, dispatch) => dispatch(erroredRender(e)),
});

/**
 * Thunks
 *
 * The return value of the inner function should be a promise. The dispatch function
 * returns the value of the function from within it. This allows us to chain dispatch functions.
 */
export const attemptGetRenders = templateId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const renders = await apiGetRenders(token, templateId);
  dispatch(setRender(renders));
  return renders;
});
export const attemptGetRender = renderId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const render = await apiGetRender(token, renderId);
  dispatch(currentRender(render));
  return render;
});
export const attemptCreateRender = templateId => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth || { token: null };
  const formName = 'render';
  const { data, ...values } = { ...state.form[formName].values };
  const empty = Object.keys(state.form[formName].registeredFields)
    .filter(field => field.startsWith('data.'))
    .map(field => field.replace('data.', ''))
    .reduce((accum, next) => ({ ...accum, [next]: '' }), {});
  const body = { ...values, data: { ...empty, ...data } };
  const render = await apiCreateRender(token, templateId, body);
  if (!body.send) {
    const a = document.createElement('a');
    a.href = render.location;
    a.download = true;
    a.click();
  }
  dispatch(currentRender(render));
  dispatch(attemptAlert({ message: 'Template render created.' }));
  return render;
});
export const attemptUpdateRender = (renderId, data) => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'render';
  const body = { ...(data || state.form[formName].values), id: undefined };
  const render = await apiUpdateRender(token, renderId, body);
  dispatch(currentRender(render));
  dispatch(replaceRender(render));
  dispatch(attemptAlert({ message: 'Render updated.' }));
  return render;
});
export const attemptRemoveRender = renderId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  await apiRemoveRender(token, renderId);
  dispatch(removeRender(renderId));
  dispatch(attemptAlert({ message: 'Render removed.' }));
  return renderId;
});

/**
 * Reducer
 *
 * All reducer functions should be pure. They describe how the state is mutated.
 */
export default handleActions({

  [combineActions(RENDER_RESET, PLAYER_LOGOUT)]: () => ({
    ...initialState,
  }),

  [RENDER_LOADING]: (state, { payload = true }) => ({
    ...state,
    loading: payload,
    problem: payload ? null : state.problem,
    success: payload ? null : state.success,
  }),

  [RENDER_SUCCESS]: (state, { payload = { status: true } }) => ({
    ...state,
    success: payload,
  }),

  [RENDER_ERRORED]: (state, { payload = null }) => ({
    ...state,
    problem: payload,
  }),

  [RENDER_SET]: (state, { payload = [] }) => ({
    ...state,
    renders: payload,
  }),

  [RENDER_REPLACE]: (state, { payload = {} }) => ({
    ...state,
    renders: state.renders.map(render => render.id === payload.id ? payload : render),
  }),

  [RENDER_REMOVE]: (state, { payload }) => ({
    ...state,
    renders: state.renders.filter(render => render.id !== payload),
  }),

  [RENDER_ADD]: (state, { payload }) => ({
    ...state,
    renders: [...state.renders, payload],
  }),

  [RENDER_CURRENT]: (state, { payload = null }) => ({
    ...state,
    current: payload,
  }),

  [RENDER_PATCH]: (state, { payload = {} }) => ({
    ...state,
    current: { ...state.current, ...payload },
  }),

}, initialState);

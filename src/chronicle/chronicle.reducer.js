import { createAction, handleActions, combineActions } from 'redux-actions';
import { thunkify } from '../shared/util.helper';
import {
  apiGetChronicles,
  apiGetChronicle,
  apiCreateChronicle,
  apiUpdateChronicle,
  apiRemoveChronicle,
} from './chronicle.service';
import { PLAYER_LOGOUT } from '../player/player.reducer';

/**
 * Initial state
 */
const initialState = {
  chronicles: [],
  current: null,
  problem: null,
  loading: false,
  success: false,
};

/**
 * Constants
 */
export const CHRONICLE_RESET = 'rumblum/chronicle/RESET';
export const CHRONICLE_LOADING = 'rumblum/chronicle/LOADING';
export const CHRONICLE_SUCCESS = 'rumblum/chronicle/SUCCESS';
export const CHRONICLE_ERRORED = 'rumblum/chronicle/ERRORED';
export const CHRONICLE_SET = 'rumblum/chronicle/SET';
export const CHRONICLE_REPLACE = 'rumblum/chronicle/REPLACE';
export const CHRONICLE_REMOVE = 'rumblum/chronicle/REMOVE';
export const CHRONICLE_ADD = 'rumblum/chronicle/ADD';
export const CHRONICLE_CURRENT = 'rumblum/chronicle/CURRENT';
export const CHRONICLE_PATCH = 'rumblum/chronicle/PATCH';

/**
 * Actions
 *
 * These describe what happened.
 */
export const resetChronicle = createAction(CHRONICLE_RESET);
export const loadingChronicle = createAction(CHRONICLE_LOADING);
export const successChronicle = createAction(CHRONICLE_SUCCESS);
export const erroredChronicle = createAction(CHRONICLE_ERRORED);
export const setChronicle = createAction(CHRONICLE_SET);
export const replaceChronicle = createAction(CHRONICLE_REPLACE);
export const removeChronicle = createAction(CHRONICLE_REMOVE);
export const addChronicle = createAction(CHRONICLE_ADD);
export const currentChronicle = createAction(CHRONICLE_CURRENT);
export const patchChronicle = createAction(CHRONICLE_PATCH);

/**
 * Config
 */
const thunk = thunkify({
  start: dispatch => dispatch(loadingChronicle()),
  end: dispatch => dispatch(loadingChronicle(false)),
  error: (e, dispatch) => dispatch(erroredChronicle(e)),
});

/**
 * Thunks
 *
 * The return value of the inner function should be a promise. The dispatch function
 * returns the value of the function from within it. This allows us to chain dispatch functions.
 */
export const attemptGetChronicles = templateId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const chronicles = await apiGetChronicles(token, templateId);
  dispatch(setChronicle(chronicles));
  return chronicles;
});
export const attemptGetChronicle = chronicleId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const chronicle = await apiGetChronicle(token, chronicleId);
  dispatch(currentChronicle(chronicle));
  return chronicle;
});
export const attemptCreateChronicle = templateId => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'chronicle';
  const formData = new FormData();
  formData.append('file', state.form[formName].values.file[0]);
  const chronicle = await apiCreateChronicle(token, templateId, formData);
  dispatch(currentChronicle(chronicle));
  dispatch(addChronicle(chronicle));
  dispatch(successChronicle());
  return chronicle;
});
export const attemptUpdateChronicle = (chronicleId, data) => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'chronicle';
  const body = { ...(data || state.form[formName].values), id: undefined };
  const chronicle = await apiUpdateChronicle(token, chronicleId, body);
  dispatch(currentChronicle(chronicle));
  dispatch(replaceChronicle(chronicle));
  dispatch(successChronicle());
  return chronicle;
});
export const attemptRemoveChronicle = chronicleId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  await apiRemoveChronicle(token, chronicleId);
  dispatch(removeChronicle(chronicleId));
  dispatch(successChronicle());
});

/**
 * Reducer
 *
 * All reducer functions should be pure. They describe how the state is mutated.
 */
export default handleActions({

  [combineActions(CHRONICLE_RESET, PLAYER_LOGOUT)]: () => ({
    ...initialState,
  }),

  [CHRONICLE_LOADING]: (state, { payload = true }) => ({
    ...state,
    loading: payload,
    problem: payload ? null : state.problem,
    success: payload ? false : state.success,
  }),

  [CHRONICLE_SUCCESS]: (state, { payload = true }) => ({
    ...state,
    success: false && payload,
  }),

  [CHRONICLE_ERRORED]: (state, { payload = null }) => ({
    ...state,
    problem: payload,
  }),

  [CHRONICLE_SET]: (state, { payload = [] }) => ({
    ...state,
    chronicles: payload,
  }),

  [CHRONICLE_REPLACE]: (state, { payload = {} }) => ({
    ...state,
    chronicles: state.chronicles.map(chronicle => chronicle.id === payload.id ? payload : chronicle),
  }),

  [CHRONICLE_REMOVE]: (state, { payload }) => ({
    ...state,
    chronicles: state.chronicles.filter(chronicle => chronicle.id !== payload),
  }),

  [CHRONICLE_ADD]: (state, { payload }) => ({
    ...state,
    chronicles: [...state.chronicles, payload],
  }),

  [CHRONICLE_CURRENT]: (state, { payload = null }) => ({
    ...state,
    current: payload,
  }),

  [CHRONICLE_PATCH]: (state, { payload = {} }) => ({
    ...state,
    current: { ...state.current, ...payload },
  }),

}, initialState);

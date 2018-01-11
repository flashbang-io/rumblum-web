import { createAction, handleActions } from 'redux-actions';
import { reset as resetForm } from 'redux-form';
import { thunkify } from '../shared/util.helper';
import {
  apiLoginPlayer,
  apiLogoutPlayer,
  apiCheckPlayer,
  apiCreatePlayer,
  apiGetPlayer,
  apiUpdatePlayer,
  apiChangePassword,
  apiForgotPassword,
  apiResetPassword,
  apiUpdateBilling,
} from './player.service';

/**
 * Initial state
 */
const initialState = {
  players: [],
  current: null,
  problem: null,
  auth: null,
  authenticated: false,
  checked: false,
  loading: false,
  success: false,
};

/**
 * Constants
 */
export const PLAYER_RESET = 'rumblum/player/RESET';
export const PLAYER_LOADING = 'rumblum/player/LOADING';
export const PLAYER_SUCCESS = 'rumblum/player/SUCCESS';
export const PLAYER_ERRORED = 'rumblum/player/ERRORED';
export const PLAYER_SET = 'rumblum/player/SET';
export const PLAYER_REPLACE = 'rumblum/player/REPLACE';
export const PLAYER_REMOVE = 'rumblum/player/REMOVE';
export const PLAYER_ADD = 'rumblum/player/ADD';
export const PLAYER_CURRENT = 'rumblum/player/CURRENT';
export const PLAYER_PATCH = 'rumblum/player/PATCH';
export const PLAYER_AUTH = 'PLAYER_AUTH';
export const PLAYER_CHECK = 'PLAYER_CHECK';

/**
 * Actions
 *
 * These describe what happened.
 */
export const resetPlayer = createAction(PLAYER_RESET);
export const loadingPlayer = createAction(PLAYER_LOADING);
export const successPlayer = createAction(PLAYER_SUCCESS);
export const erroredPlayer = createAction(PLAYER_ERRORED);
export const setPlayer = createAction(PLAYER_SET);
export const replacePlayer = createAction(PLAYER_REPLACE);
export const removePlayer = createAction(PLAYER_REMOVE);
export const addPlayer = createAction(PLAYER_ADD);
export const currentPlayer = createAction(PLAYER_CURRENT);
export const patchPlayer = createAction(PLAYER_PATCH);
export const authPlayer = createAction(PLAYER_AUTH);
export const checkPlayer = createAction(PLAYER_CHECK);

/**
 * Config
 */
const thunk = thunkify({
  start: dispatch => dispatch(loadingPlayer()),
  end: dispatch => dispatch(loadingPlayer(false)),
  error: (e, dispatch) => dispatch(erroredPlayer(e)),
});

/**
 * Thunks
 *
 * The return value of the inner function should be a promise. The dispatch function
 * returns the value of the function from within it. This allows us to chain dispatch functions.
 */
export const attemptGetPlayer = playerId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const player = await apiGetPlayer(token, playerId);
  dispatch(currentPlayer(player));
  return player;
});
export const attemptCreatePlayer = () => thunk(async (dispatch, getState) => {
  const formName = 'register';
  const body = { ...getState().form[formName].values, id: undefined };
  const player = await apiCreatePlayer(body);
  const auth = await apiLoginPlayer(body);
  dispatch(currentPlayer(player));
  dispatch(authPlayer(auth));
  dispatch(successPlayer());
  return { player, auth };
});
export const attemptUpdatePlayer = (playerId, data) => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'player';
  const body = { ...(data || state.form[formName].values), id: undefined };
  const player = await apiUpdatePlayer(token, playerId, body);
  dispatch(currentPlayer(player));
  dispatch(replacePlayer(player));
  dispatch(successPlayer());
  return player;
});
export const attemptLoginPlayer = () => thunk(async (dispatch, getState) => {
  const formName = 'credentials';
  const body = { ...getState().form[formName].values };
  const auth = await apiLoginPlayer(body);
  const player = await apiGetPlayer(auth.token, auth.userId);
  dispatch(authPlayer(auth));
  dispatch(currentPlayer(player));
  dispatch(resetForm(formName));
  return { player, auth };
});
export const attemptLogoutPlayer = () => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  await apiLogoutPlayer(token);
  dispatch(resetPlayer());
});
export const attemptCheckPlayer = () => thunk(async (dispatch) => {
  try {
    const auth = await apiCheckPlayer();
    if (auth) {
      const player = await apiGetPlayer(auth.token, auth.userId); // check token still good
      dispatch(authPlayer(auth));
      dispatch(currentPlayer(player));
    }
  } catch (e) {
    localStorage.removeItem('auth');
  }
  dispatch(checkPlayer(true));
});
export const attemptChangePassword = () => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'password';
  const body = { ...state.form[formName].values };
  await apiChangePassword(token, body);
  dispatch(successPlayer());
});
export const attemptForgotPassword = () => thunk(async (dispatch, getState) => {
  const state = getState();
  const formName = 'forgot';
  const { email } = state.form[formName].values;
  await apiForgotPassword({ email });
  dispatch(successPlayer());
});
export const attemptResetPassword = token => thunk(async (dispatch, getState) => {
  const state = getState();
  const formName = 'reset';
  const { newPassword } = state.form[formName].values;
  await apiResetPassword(token, { newPassword });
  dispatch(successPlayer());
});
export const attemptUpdateBilling = (playerId, source) => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const player = await apiUpdateBilling(token, playerId, { source });
  dispatch(currentPlayer(player));
  dispatch(successPlayer());
  return player;
});
export const attemptSharePlayer = () => thunk(async (dispatch, getState) => {
  const state = getState();
  const formName = 'reset';
  console.log(state.form[formName].values);
  dispatch(successPlayer());
});

/**
 * Reducer
 *
 * All reducer functions should be pure. They describe how the state is mutated.
 */
export default handleActions({

  [PLAYER_RESET]: () => ({
    ...initialState,
    checked: true,
  }),

  [PLAYER_LOADING]: (state, { payload = true }) => ({
    ...state,
    loading: payload,
    problem: payload ? null : state.problem,
    success: payload ? false : state.success,
  }),

  [PLAYER_SUCCESS]: (state, { payload = true }) => ({
    ...state,
    success: false && payload,
  }),

  [PLAYER_ERRORED]: (state, { payload = null }) => ({
    ...state,
    problem: payload,
  }),

  [PLAYER_SET]: (state, { payload = [] }) => ({
    ...state,
    players: payload,
  }),

  [PLAYER_REPLACE]: (state, { payload = {} }) => ({
    ...state,
    players: state.players.map(player => player.id === payload.id ? payload : player),
  }),

  [PLAYER_REMOVE]: (state, { payload }) => ({
    ...state,
    players: state.players.filter(player => player.id !== payload),
  }),

  [PLAYER_ADD]: (state, { payload }) => ({
    ...state,
    players: [...state.players, payload],
  }),

  [PLAYER_CURRENT]: (state, { payload = null }) => ({
    ...state,
    current: payload,
  }),

  [PLAYER_PATCH]: (state, { payload = {} }) => ({
    ...state,
    current: { ...state.current, ...payload },
  }),

  [PLAYER_AUTH]: (state, { payload = null }) => ({
    ...state,
    auth: payload,
    authenticated: !!payload,
  }),

  [PLAYER_CHECK]: (state, { payload = true }) => ({
    ...state,
    checked: payload,
  }),

}, initialState);

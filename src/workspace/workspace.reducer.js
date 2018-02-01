import { createAction, handleActions, combineActions } from 'redux-actions';
import { thunkify } from '../shared/util.helper';
import {
  apiGetWorkspaces,
  apiGetWorkspace,
  apiCreateWorkspace,
  apiUpdateWorkspace,
  apiRemoveWorkspace,
  apiUpdateSubscription,
  apiCancelSubscription,
} from './workspace.service';
import { PLAYER_LOGOUT } from '../player/player.reducer';
import { attemptAlert } from '../shared/campaign.reducer';

/**
 * Initial state
 */
const initialState = {
  workspaces: [],
  current: null,
  problem: null,
  loading: false,
  success: null,
};

/**
 * Constants
 */
export const WORKSPACE_RESET = 'rumblum/workspace/RESET';
export const WORKSPACE_CLEAN = 'rumblum/workspace/CLEAN';
export const WORKSPACE_LOADING = 'rumblum/workspace/LOADING';
export const WORKSPACE_SUCCESS = 'rumblum/workspace/SUCCESS';
export const WORKSPACE_ERRORED = 'rumblum/workspace/ERRORED';
export const WORKSPACE_SET = 'rumblum/workspace/SET';
export const WORKSPACE_REPLACE = 'rumblum/workspace/REPLACE';
export const WORKSPACE_REMOVE = 'rumblum/workspace/REMOVE';
export const WORKSPACE_ADD = 'rumblum/workspace/ADD';
export const WORKSPACE_CURRENT = 'rumblum/workspace/CURRENT';
export const WORKSPACE_PATCH = 'rumblum/workspace/PATCH';

/**
 * Actions
 *
 * These describe what happened.
 */
export const resetWorkspace = createAction(WORKSPACE_RESET);
export const cleanWorkspace = createAction(WORKSPACE_CLEAN);
export const loadingWorkspace = createAction(WORKSPACE_LOADING);
export const successWorkspace = createAction(WORKSPACE_SUCCESS);
export const erroredWorkspace = createAction(WORKSPACE_ERRORED);
export const setWorkspace = createAction(WORKSPACE_SET);
export const replaceWorkspace = createAction(WORKSPACE_REPLACE);
export const removeWorkspace = createAction(WORKSPACE_REMOVE);
export const addWorkspace = createAction(WORKSPACE_ADD);
export const currentWorkspace = createAction(WORKSPACE_CURRENT);
export const patchWorkspace = createAction(WORKSPACE_PATCH);

/**
 * Config
 */
const thunk = thunkify({
  start: dispatch => dispatch(loadingWorkspace()),
  end: dispatch => dispatch(loadingWorkspace(false)),
  error: (e, dispatch) => dispatch(erroredWorkspace(e)),
});

/**
 * Thunks
 *
 * The return value of the inner function should be a promise. The dispatch function
 * returns the value of the function from within it. This allows us to chain dispatch functions.
 */
export const attemptGetWorkspaces = () => thunk(async (dispatch, getState) => {
  dispatch(setWorkspace());
  const { token, userId } = getState().player.auth;
  const workspaces = await apiGetWorkspaces(token, userId);
  dispatch(setWorkspace(workspaces));
  return { workspaces };
});
export const attemptGetWorkspace = workspaceId => thunk(async (dispatch, getState) => {
  dispatch(currentWorkspace());
  const { token } = getState().player.auth;
  const workspace = await apiGetWorkspace(token, workspaceId);
  dispatch(currentWorkspace(workspace));
  return { workspace };
});
export const attemptCreateWorkspace = () => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token, userId } = state.player.auth;
  const formName = 'workspace';
  const body = { ...state.form[formName].values, id: undefined };
  const workspace = await apiCreateWorkspace(token, userId, body);
  dispatch(currentWorkspace(workspace));
  dispatch(addWorkspace(workspace));
  dispatch(attemptAlert({ message: 'Workspace created.' }));
  return { workspace };
});
export const attemptUpdateWorkspace = (workspaceId, data) => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'workspace';
  const body = { ...(data || state.form[formName].values), id: undefined };
  const workspace = await apiUpdateWorkspace(token, workspaceId, body);
  dispatch(currentWorkspace(workspace));
  dispatch(replaceWorkspace(workspace));
  dispatch(attemptAlert({ message: 'Workspace updated.' }));
  return { workspace };
});
export const attemptRemoveWorkspace = workspaceId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  await apiRemoveWorkspace(token, workspaceId);
  dispatch(removeWorkspace(workspaceId));
  dispatch(currentWorkspace());
  dispatch(attemptAlert({ message: 'Workspace removed.' }));
  return { workspaceId };
});
export const attemptUpdateSubscription = (workspaceId, data) => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const workspace = await apiUpdateSubscription(token, workspaceId, data);
  dispatch(currentWorkspace(workspace));
  dispatch(replaceWorkspace(workspace));
  dispatch(attemptAlert({ message: 'Subscription updated.' }));
  return { workspace };
});
export const attemptCancelSubscription = workspaceId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const workspace = await apiCancelSubscription(token, workspaceId);
  dispatch(currentWorkspace(workspace));
  dispatch(replaceWorkspace(workspace));
  dispatch(attemptAlert({ message: 'Subscription cancelled.' }));
  return { workspace };
});

/**
 * Reducer
 *
 * All reducer functions should be pure. They describe how the state is mutated.
 */
export default handleActions({

  [combineActions(WORKSPACE_RESET, PLAYER_LOGOUT)]: () => ({
    ...initialState,
  }),

  [WORKSPACE_CLEAN]: (state) => ({
    ...state,
    problem: null,
    success: null,
  }),

  [WORKSPACE_LOADING]: (state, { payload = true }) => ({
    ...state,
    loading: payload,
    problem: payload ? null : state.problem,
    success: payload ? null : state.success,
  }),

  [WORKSPACE_SUCCESS]: (state, { payload = { status: true } }) => ({
    ...state,
    success: payload,
  }),

  [WORKSPACE_ERRORED]: (state, { payload = null }) => ({
    ...state,
    problem: payload,
  }),

  [WORKSPACE_SET]: (state, { payload = [] }) => ({
    ...state,
    workspaces: payload,
  }),

  [WORKSPACE_REPLACE]: (state, { payload = {} }) => ({
    ...state,
    workspaces: state.workspaces.map(workspace => workspace.id === payload.id ? payload : workspace),
  }),

  [WORKSPACE_REMOVE]: (state, { payload }) => ({
    ...state,
    workspaces: state.workspaces.filter(workspace => workspace.id !== payload),
  }),

  [WORKSPACE_ADD]: (state, { payload }) => ({
    ...state,
    workspaces: [...state.workspaces, payload],
  }),

  [WORKSPACE_CURRENT]: (state, { payload = null }) => ({
    ...state,
    current: payload,
  }),

  [WORKSPACE_PATCH]: (state, { payload = {} }) => ({
    ...state,
    current: state.current.id && payload.id && state.current.id === payload.id ? { ...state.current, ...payload } : state.current,
    workspaces: state.workspaces.map(workspace => workspace.id === payload.id ? { ...workspace, ...payload } : workspace),
  }),

}, initialState);

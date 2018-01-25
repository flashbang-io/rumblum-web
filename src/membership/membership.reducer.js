import { createAction, handleActions, combineActions } from 'redux-actions';
import { reset as resetForm } from 'redux-form';
import { thunkify } from '../shared/util.helper';
import {
  apiGetMemberships,
  apiGetMembership,
  apiCreateMembership,
  apiUpdateMembership,
  apiRemoveMembership,
} from './membership.service';
import { PLAYER_LOGOUT } from '../player/player.reducer';
import { attemptAlert } from '../shared/campaign.reducer';

/**
 * Initial state
 */
const initialState = {
  memberships: [],
  current: null,
  problem: null,
  loading: false,
  success: null,
};

/**
 * Constants
 */
export const MEMBERSHIP_RESET = 'rumblum/membership/RESET';
export const MEMBERSHIP_LOADING = 'rumblum/membership/LOADING';
export const MEMBERSHIP_SUCCESS = 'rumblum/membership/SUCCESS';
export const MEMBERSHIP_ERRORED = 'rumblum/membership/ERRORED';
export const MEMBERSHIP_SET = 'rumblum/membership/SET';
export const MEMBERSHIP_REPLACE = 'rumblum/membership/REPLACE';
export const MEMBERSHIP_REMOVE = 'rumblum/membership/REMOVE';
export const MEMBERSHIP_ADD = 'rumblum/membership/ADD';
export const MEMBERSHIP_CURRENT = 'rumblum/membership/CURRENT';
export const MEMBERSHIP_PATCH = 'rumblum/membership/PATCH';

/**
 * Actions
 *
 * These describe what happened.
 */
export const resetMembership = createAction(MEMBERSHIP_RESET);
export const loadingMembership = createAction(MEMBERSHIP_LOADING);
export const successMembership = createAction(MEMBERSHIP_SUCCESS);
export const erroredMembership = createAction(MEMBERSHIP_ERRORED);
export const setMembership = createAction(MEMBERSHIP_SET);
export const replaceMembership = createAction(MEMBERSHIP_REPLACE);
export const removeMembership = createAction(MEMBERSHIP_REMOVE);
export const addMembership = createAction(MEMBERSHIP_ADD);
export const currentMembership = createAction(MEMBERSHIP_CURRENT);
export const patchMembership = createAction(MEMBERSHIP_PATCH);

/**
 * Config
 */
const thunk = thunkify({
  start: dispatch => dispatch(loadingMembership()),
  end: dispatch => dispatch(loadingMembership(false)),
  error: (e, dispatch) => dispatch(erroredMembership(e)),
});

/**
 * Thunks
 *
 * The return value of the inner function should be a promise. The dispatch function
 * returns the value of the function from within it. This allows us to chain dispatch functions.
 */
export const attemptGetMemberships = templateId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const memberships = await apiGetMemberships(token, templateId);
  dispatch(setMembership(memberships));
  return memberships;
});
export const attemptGetMembership = membershipId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const membership = await apiGetMembership(token, membershipId);
  dispatch(currentMembership(membership));
  return membership;
});
export const attemptCreateMembership = workspaceId => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'membership';
  const body = { ...state.form[formName].values, workspaceId, id: undefined };
  const membership = await apiCreateMembership(token, body);
  dispatch(currentMembership(membership));
  dispatch(addMembership(membership));
  dispatch(resetForm(formName));
  dispatch(attemptAlert({ message: 'Membership created.' }));
  return membership;
});
export const attemptUpdateMembership = (membershipId, data) => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'membership';
  const body = { ...(data || state.form[formName].values), id: undefined };
  const membership = await apiUpdateMembership(token, membershipId, body);
  dispatch(currentMembership(membership));
  dispatch(replaceMembership(membership));
  dispatch(attemptAlert({ message: 'Membership updated.' }));
  return membership;
});
export const attemptRemoveMembership = membershipId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  await apiRemoveMembership(token, membershipId);
  dispatch(removeMembership(membershipId));
  dispatch(attemptAlert({ message: 'Membership removed.' }));
  return membershipId;
});

/**
 * Reducer
 *
 * All reducer functions should be pure. They describe how the state is mutated.
 */
export default handleActions({

  [combineActions(MEMBERSHIP_RESET, PLAYER_LOGOUT)]: () => ({
    ...initialState,
  }),

  [MEMBERSHIP_LOADING]: (state, { payload = true }) => ({
    ...state,
    loading: payload,
    problem: payload ? null : state.problem,
    success: payload ? null : state.success,
  }),

  [MEMBERSHIP_SUCCESS]: (state, { payload = { status: true } }) => ({
    ...state,
    success: payload,
  }),

  [MEMBERSHIP_ERRORED]: (state, { payload = null }) => ({
    ...state,
    problem: payload,
  }),

  [MEMBERSHIP_SET]: (state, { payload = [] }) => ({
    ...state,
    memberships: payload,
  }),

  [MEMBERSHIP_REPLACE]: (state, { payload = {} }) => ({
    ...state,
    memberships: state.memberships.map(membership => membership.id === payload.id ? payload : membership),
  }),

  [MEMBERSHIP_REMOVE]: (state, { payload }) => ({
    ...state,
    memberships: state.memberships.filter(membership => membership.id !== payload),
  }),

  [MEMBERSHIP_ADD]: (state, { payload }) => ({
    ...state,
    memberships: [...state.memberships, payload],
  }),

  [MEMBERSHIP_CURRENT]: (state, { payload = null }) => ({
    ...state,
    current: payload,
  }),

  [MEMBERSHIP_PATCH]: (state, { payload = {} }) => ({
    ...state,
    memberships: state.memberships.map(membership => membership.id === payload.id ? { ...membership, ...payload } : membership),
  }),

}, initialState);

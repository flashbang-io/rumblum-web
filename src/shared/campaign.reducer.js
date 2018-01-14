import { createAction, handleActions, combineActions } from 'redux-actions';
import { thunkify } from '../shared/util.helper';
import { PLAYER_LOGOUT } from '../player/player.reducer';

/**
 * Initial state
 */
const initialState = {
  problem: null,
  loading: false,
  success: false,
  modal: null,
  tab: null,
};

/**
 * Constants
 */
export const CAMPAIGN_RESET = 'rumblum/campaign/RESET';
export const CAMPAIGN_LOADING = 'rumblum/campaign/LOADING';
export const CAMPAIGN_SUCCESS = 'rumblum/campaign/SUCCESS';
export const CAMPAIGN_ERRORED = 'rumblum/campaign/ERRORED';
export const CAMPAIGN_MODAL = 'rumblum/campaign/MODAL';
export const CAMPAIGN_TAB = 'rumblum/campaign/TAB';

/**
 * Actions
 *
 * These describe what happened.
 */
export const resetCampaign = createAction(CAMPAIGN_RESET);
export const loadingCampaign = createAction(CAMPAIGN_LOADING);
export const successCampaign = createAction(CAMPAIGN_SUCCESS);
export const erroredCampaign = createAction(CAMPAIGN_ERRORED);
export const modalCampaign = createAction(CAMPAIGN_MODAL);
export const tabCampaign = createAction(CAMPAIGN_TAB);

/**
 * Config
 */
const thunk = thunkify({
  start: dispatch => dispatch(loadingCampaign()),
  end: dispatch => dispatch(loadingCampaign(false)),
  error: (e, dispatch) => dispatch(erroredCampaign(e)),
});

/**
 * Thunks
 *
 * The return value of the inner function should be a promise. The dispatch function
 * returns the value of the function from within it. This allows us to chain dispatch functions.
 */
export const attemptSomething = () => thunk(async (dispatch) => {
  dispatch(resetCampaign());
});

/**
 * Reducer
 *
 * All reducer functions should be pure. They describe how the state is mutated.
 */
export default handleActions({

  [combineActions(CAMPAIGN_RESET, PLAYER_LOGOUT)]: () => ({
    ...initialState,
  }),

  [CAMPAIGN_LOADING]: (state, { payload = true }) => ({
    ...state,
    loading: payload,
    problem: payload ? null : state.problem,
    success: payload ? false : state.success,
  }),

  [CAMPAIGN_SUCCESS]: (state, { payload = true }) => ({
    ...state,
    success: false && payload,
  }),

  [CAMPAIGN_ERRORED]: (state, { payload = null }) => ({
    ...state,
    problem: payload,
  }),

  [CAMPAIGN_MODAL]: (state, { payload = null }) => ({
    ...state,
    modal: payload,
  }),

  [CAMPAIGN_TAB]: (state, { payload = null }) => ({
    ...state,
    tab: payload,
  }),

}, initialState);

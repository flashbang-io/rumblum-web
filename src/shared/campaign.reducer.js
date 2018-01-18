import { createAction, handleActions } from 'redux-actions';
import { thunkify } from '../shared/util.helper';

/**
 * Initial state
 */
const initialState = {
  problem: null,
  loading: false,
  success: null,
  campaigns: [],
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
export const CAMPAIGN_REMOVE = 'rumblum/campaign/REMOVE';
export const CAMPAIGN_ADD = 'rumblum/campaign/ADD';

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
export const removeCampaign = createAction(CAMPAIGN_REMOVE);
export const addCampaign = createAction(CAMPAIGN_ADD);

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
export const attemptAlert = alert => thunk(async (dispatch) => {
  const campaign = { id: `${Date.now() * Math.random()}`, ...alert };
  dispatch(addCampaign(campaign));
  setTimeout(() => {
    dispatch(removeCampaign(campaign.id));
  }, 5000);
});

/**
 * Reducer
 *
 * All reducer functions should be pure. They describe how the state is mutated.
 */
export default handleActions({

  [CAMPAIGN_RESET]: () => ({
    ...initialState,
  }),

  [CAMPAIGN_LOADING]: (state, { payload = true }) => ({
    ...state,
    loading: payload,
    problem: payload ? null : state.problem,
    success: payload ? null : state.success,
  }),

  [CAMPAIGN_SUCCESS]: (state, { payload = { status: true } }) => ({
    ...state,
    success: payload,
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

  [CAMPAIGN_REMOVE]: (state, { payload }) => ({
    ...state,
    campaigns: state.campaigns.filter(campaign => campaign.id !== payload),
  }),

  [CAMPAIGN_ADD]: (state, { payload }) => ({
    ...state,
    campaigns: [...state.campaigns, payload],
  }),

}, initialState);

import { createAction, handleActions } from 'redux-actions';
import { thunkify } from '../shared/util.helper';
import {
  apiGetTemplates,
  apiGetTemplate,
  apiCreateTemplate,
  apiUpdateTemplate,
  apiRemoveTemplate,
} from './template.service';

/**
 * Initial state
 */
const initialState = {
  templates: [],
  current: null,
  problem: null,
  loading: false,
  success: false,
};

/**
 * Constants
 */
export const TEMPLATE_RESET = 'rumblum/template/RESET';
export const TEMPLATE_LOADING = 'rumblum/template/LOADING';
export const TEMPLATE_SUCCESS = 'rumblum/template/SUCCESS';
export const TEMPLATE_ERRORED = 'rumblum/template/ERRORED';
export const TEMPLATE_SET = 'rumblum/template/SET';
export const TEMPLATE_REPLACE = 'rumblum/template/REPLACE';
export const TEMPLATE_REMOVE = 'rumblum/template/REMOVE';
export const TEMPLATE_ADD = 'rumblum/template/ADD';
export const TEMPLATE_CURRENT = 'rumblum/template/CURRENT';
export const TEMPLATE_PATCH = 'rumblum/template/PATCH';

/**
 * Actions
 *
 * These describe what happened.
 */
export const resetTemplate = createAction(TEMPLATE_RESET);
export const loadingTemplate = createAction(TEMPLATE_LOADING);
export const successTemplate = createAction(TEMPLATE_SUCCESS);
export const erroredTemplate = createAction(TEMPLATE_ERRORED);
export const setTemplate = createAction(TEMPLATE_SET);
export const replaceTemplate = createAction(TEMPLATE_REPLACE);
export const removeTemplate = createAction(TEMPLATE_REMOVE);
export const addTemplate = createAction(TEMPLATE_ADD);
export const currentTemplate = createAction(TEMPLATE_CURRENT);
export const patchTemplate = createAction(TEMPLATE_PATCH);

/**
 * Config
 */
const thunk = thunkify({
  start: dispatch => dispatch(loadingTemplate()),
  end: dispatch => dispatch(loadingTemplate(false)),
  error: (e, dispatch) => dispatch(erroredTemplate(e)),
});

/**
 * Thunks
 *
 * The return value of the inner function should be a promise. The dispatch function
 * returns the value of the function from within it. This allows us to chain dispatch functions.
 */
export const attemptGetTemplates = workspaceId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const templates = await apiGetTemplates(token, workspaceId);
  dispatch(setTemplate(templates));
  return templates;
});
export const attemptGetTemplate = templateId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  const template = await apiGetTemplate(token, templateId);
  dispatch(currentTemplate(template));
  return template;
});
export const attemptCreateTemplate = workspaceId => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'template';
  const body = { ...state.form[formName].values, id: undefined };
  const template = await apiCreateTemplate(token, workspaceId, body);
  dispatch(currentTemplate(template));
  dispatch(addTemplate(template));
  dispatch(successTemplate());
  return template;
});
export const attemptUpdateTemplate = (templateId, data) => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'template';
  const body = { ...(data || state.form[formName].values), id: undefined };
  const template = await apiUpdateTemplate(token, templateId, body);
  dispatch(currentTemplate(template));
  dispatch(replaceTemplate(template));
  dispatch(successTemplate());
  return template;
});
export const attemptRemoveTemplate = templateId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  await apiRemoveTemplate(token, templateId);
  dispatch(removeTemplate(templateId));
  dispatch(successTemplate());
});

/**
 * Reducer
 *
 * All reducer functions should be pure. They describe how the state is mutated.
 */
export default handleActions({

  [TEMPLATE_RESET]: () => ({
    ...initialState,
  }),

  [TEMPLATE_LOADING]: (state, { payload = true }) => ({
    ...state,
    loading: payload,
    problem: payload ? null : state.problem,
    success: payload ? false : state.success,
  }),

  [TEMPLATE_SUCCESS]: (state, { payload = true }) => ({
    ...state,
    success: false && payload,
  }),

  [TEMPLATE_ERRORED]: (state, { payload = null }) => ({
    ...state,
    problem: payload,
  }),

  [TEMPLATE_SET]: (state, { payload = [] }) => ({
    ...state,
    templates: payload,
  }),

  [TEMPLATE_REPLACE]: (state, { payload = {} }) => ({
    ...state,
    templates: state.templates.map(template => template.id === payload.id ? payload : template),
  }),

  [TEMPLATE_REMOVE]: (state, { payload }) => ({
    ...state,
    templates: state.templates.filter(template => template.id !== payload),
  }),

  [TEMPLATE_ADD]: (state, { payload }) => ({
    ...state,
    templates: [...state.templates, payload],
  }),

  [TEMPLATE_CURRENT]: (state, { payload = null }) => ({
    ...state,
    current: payload,
  }),

  [TEMPLATE_PATCH]: (state, { payload = {} }) => ({
    ...state,
    current: { ...state.current, ...payload },
  }),

}, initialState);

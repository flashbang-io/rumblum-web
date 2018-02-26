import { createAction, handleActions, combineActions } from 'redux-actions';
import { thunkify } from '../shared/util.helper';
import {
  apiGetTemplates,
  apiGetTemplate,
  apiCreateTemplate,
  apiUpdateTemplate,
  apiRemoveTemplate,
  apiUpdateTemplateDefaults,
} from './template.service';
import { apiCreateChronicle, apiCreateChroniclePremade } from '../chronicle/chronicle.service';
import { PLAYER_LOGOUT } from '../player/player.reducer';
import { attemptAlert } from '../shared/campaign.reducer';

/**
 * Initial state
 */
const initialState = {
  templates: [],
  current: null,
  problem: null,
  loading: false,
  success: null,
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
  return { templates };
});
export const attemptGetTemplate = templateId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth || { token: null };
  const template = await apiGetTemplate(token, templateId);
  dispatch(currentTemplate(template));
  return { template };
});
export const attemptCreateTemplate = workspaceId => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'template';
  const formData = new FormData();
  const { values } = state.form[formName];
  if (!values || (!values.file && !values.premade)) {
    throw new Error('Please complete the form before submitting.');
  }
  const body = { ...state.form[formName].values, id: undefined, file: undefined };
  const tempTemplate = await apiCreateTemplate(token, workspaceId, body);
  const { id } = tempTemplate;
  dispatch(addTemplate(tempTemplate));
  let models;
  if (values.file) {
    formData.append('file', values.file[0]);
    models = await apiCreateChronicle(token, id, formData);
  } else {
    models = await apiCreateChroniclePremade(token, id, { data: values.premade });
  }
  const { chronicle, template } = models;
  const updatedTemplate = { currentChronicle: chronicle, ...template };
  dispatch(currentTemplate(updatedTemplate));
  dispatch(replaceTemplate(updatedTemplate));
  dispatch(attemptAlert({ message: 'Template created.' }));
  return { template, chronicle };
});
export const attemptUpdateTemplate = (templateId, data) => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'template';
  const body = { ...(data || state.form[formName].values), id: undefined };
  const template = await apiUpdateTemplate(token, templateId, body);
  dispatch(patchTemplate(template));
  dispatch(attemptAlert({ message: 'Template updated.' }));
  return { template };
});
export const attemptUpdateTemplateDefaults = (templateId, data) => thunk(async (dispatch, getState) => {
  const state = getState();
  const { token } = state.player.auth;
  const formName = 'defaults';
  const body = { ...(data || state.form[formName].values), id: undefined };
  const template = await apiUpdateTemplateDefaults(token, templateId, body);
  dispatch(currentTemplate(template));
  dispatch(replaceTemplate(template));
  dispatch(attemptAlert({ message: 'Template default values updated.' }));
  return { template };
});
export const attemptRemoveTemplate = templateId => thunk(async (dispatch, getState) => {
  const { token } = getState().player.auth;
  await apiRemoveTemplate(token, templateId);
  dispatch(removeTemplate(templateId));
  dispatch(attemptAlert({ message: 'Template removed.' }));
  return { templateId };
});

/**
 * Reducer
 *
 * All reducer functions should be pure. They describe how the state is mutated.
 */
export default handleActions({

  [combineActions(TEMPLATE_RESET, PLAYER_LOGOUT)]: () => ({
    ...initialState,
  }),

  [TEMPLATE_LOADING]: (state, { payload = true }) => ({
    ...state,
    loading: payload,
    problem: payload ? null : state.problem,
    success: payload ? null : state.success,
  }),

  [TEMPLATE_SUCCESS]: (state, { payload = { status: true } }) => ({
    ...state,
    success: payload,
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
    current: state.current.id && payload.id && state.current.id === payload.id ? { ...state.current, ...payload } : state.current,
    templates: state.templates.map(template => template.id === payload.id ? { ...template, ...payload } : template),
  }),

}, initialState);

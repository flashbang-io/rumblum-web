import config from '../config';
import { handleResponse, standardHeaders } from '../shared/util.helper';

export const apiCreateTemplate = (token, workspaceId, body) => fetch(`${config.endpoint}/workspaces/${workspaceId}/templates`, {
  method: 'POST',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiGetTemplates = (token, workspaceId) => fetch(`${config.endpoint}/workspaces/${workspaceId}/templates?filter[include]=currentChronicle`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiGetTemplate = (token, templateId) => fetch(`${config.endpoint}/templates/${templateId}`, {
  headers: standardHeaders(token ? { 'Authorization': token } : {}),
}).then(handleResponse);

export const apiUpdateTemplate = (token, templateId, body) => fetch(`${config.endpoint}/templates/${templateId}`, {
  method: 'PATCH',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiUpdateTemplateDefaults = (token, templateId, body) => fetch(`${config.endpoint}/templates/${templateId}/defaults`, {
  method: 'PATCH',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiRemoveTemplate = (token, templateId) => fetch(`${config.endpoint}/templates/${templateId}`, {
  method: 'DELETE',
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

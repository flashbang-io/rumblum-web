import config from '../config';
import { handleResponse, standardHeaders } from '../shared/util.helper';

export const apiCreateRender = (token, templateId, body) => fetch(`${config.endpoint}/templates/${templateId}/renders`, {
  method: 'POST',
  headers: standardHeaders(token ? { 'Authorization': token } : {}),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiGetRenders = (token, templateId) => fetch(`${config.endpoint}/templates/${templateId}/renders`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiGetRender = (token, renderId) => fetch(`${config.endpoint}/renders/${renderId}`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiUpdateRender = (token, renderId, body) => fetch(`${config.endpoint}/renders/${renderId}`, {
  method: 'PATCH',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiRemoveRender = (token, renderId) => fetch(`${config.endpoint}/renders/${renderId}`, {
  method: 'DELETE',
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

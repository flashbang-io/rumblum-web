import config from '../config';
import { handleResponse, standardHeaders } from '../shared/util.helper';

export const apiCreateChronicle = (token, templateId, body) => fetch(`${config.endpoint}/templates/${templateId}/chronicles`, {
  method: 'POST',
  headers: {
    'Authorization': token,
  },
  body,
}).then(handleResponse);

export const apiCreateChroniclePremade = (token, templateId, body) => fetch(`${config.endpoint}/templates/${templateId}/chronicles/premade`, {
  method: 'POST',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiGetChronicles = (token, templateId) => fetch(`${config.endpoint}/templates/${templateId}/chronicles`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiGetChronicle = (token, chronicleId) => fetch(`${config.endpoint}/chronicles/${chronicleId}`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiUpdateChronicle = (token, chronicleId, body) => fetch(`${config.endpoint}/chronicles/${chronicleId}`, {
  method: 'PATCH',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiRemoveChronicle = (token, chronicleId) => fetch(`${config.endpoint}/chronicles/${chronicleId}`, {
  method: 'DELETE',
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

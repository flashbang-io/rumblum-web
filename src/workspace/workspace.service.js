import config from '../config';
import { handleResponse, standardHeaders } from '../shared/util.helper';

export const apiCreateWorkspace = (token, userId, body) => fetch(`${config.endpoint}/players/${userId}/workspaces`, {
  method: 'POST',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiGetWorkspaces = (token, userId) => fetch(`${config.endpoint}/players/${userId}/workspaces`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiGetWorkspace = (token, workspaceId) => fetch(`${config.endpoint}/workspaces/${workspaceId}`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiUpdateWorkspace = (token, workspaceId, body) => fetch(`${config.endpoint}/workspaces/${workspaceId}`, {
  method: 'PATCH',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiRemoveWorkspace = (token, workspaceId) => fetch(`${config.endpoint}/workspaces/${workspaceId}`, {
  method: 'DELETE',
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiUpdateSubscription = (token, workspaceId, body) => fetch(`${config.endpoint}/workspaces/${workspaceId}/subscription`, {
  method: 'POST',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiCancelSubscription = (token, workspaceId) => fetch(`${config.endpoint}/workspaces/${workspaceId}/subscription`, {
  method: 'DELETE',
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiGetWorkspaceUsage = (token, workspaceId) => fetch(`${config.endpoint}/workspaces/${workspaceId}/usage`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

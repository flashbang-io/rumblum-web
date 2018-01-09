import config from '../config';
import { handleResponse, standardHeaders } from '../shared/util.helper';

export const apiCreateMembership = (token, body) => fetch(`${config.endpoint}/memberships`, {
  method: 'POST',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiGetMemberships = (token, workspaceId) => fetch(`${config.endpoint}/memberships?filter[where][workspaceId]=${workspaceId}&filter[include]=player`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiGetMembership = (token, membershipId) => fetch(`${config.endpoint}/memberships/${membershipId}`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiUpdateMembership = (token, membershipId, body) => fetch(`${config.endpoint}/memberships/${membershipId}`, {
  method: 'PATCH',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiRemoveMembership = (token, membershipId) => fetch(`${config.endpoint}/memberships/${membershipId}`, {
  method: 'DELETE',
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

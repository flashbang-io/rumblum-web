import config from '../config';
import { handleResponse, standardHeaders } from '../shared/util.helper';

export const apiLoginPlayer = body => fetch(`${config.endpoint}/players/login`, {
  method: 'POST',
  headers: standardHeaders(),
  body: JSON.stringify(body),
}).then(handleResponse)
  .then(({ id, userId, ttl, hash }) => {
    const auth = { token: id, userId, ttl, hash };
    localStorage.setItem('auth', JSON.stringify(auth));
    return auth;
  });

export const apiLogoutPlayer = token => {
  localStorage.removeItem('auth');
  return fetch(`${config.endpoint}/players/logout`, {
    method: 'POST',
    headers: standardHeaders({ 'Authorization': token }),
  }).then(handleResponse);
};

export const apiCheckPlayer = async () => {
  const auth = localStorage.getItem('auth');
  if (!auth || typeof auth !== 'string') return null;
  return JSON.parse(auth);
};

export const apiCreatePlayer = body => fetch(`${config.endpoint}/players`, {
  method: 'POST',
  headers: standardHeaders(),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiGetPlayer = (token, playerId) => fetch(`${config.endpoint}/players/${playerId}`, {
  headers: standardHeaders({ 'Authorization': token }),
}).then(handleResponse);

export const apiUpdatePlayer = (token, playerId, body) => fetch(`${config.endpoint}/players/${playerId}`, {
  method: 'PATCH',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiChangePassword = (token, body) => fetch(`${config.endpoint}/players/change-password`, {
  method: 'POST',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiForgotPassword = body => fetch(`${config.endpoint}/players/reset`, {
  method: 'POST',
  headers: standardHeaders(),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiResetPassword = (token, body) => fetch(`${config.endpoint}/players/reset-password`, {
  method: 'POST',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiUpdateBilling = (token, playerId, body) => fetch(`${config.endpoint}/players/${playerId}/billing`, {
  method: 'POST',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

export const apiShare = (token, playerId, body) => fetch(`${config.endpoint}/players/${playerId}/share`, {
  method: 'POST',
  headers: standardHeaders({ 'Authorization': token }),
  body: JSON.stringify(body),
}).then(handleResponse);

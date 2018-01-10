import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

export const redirectUnauthenticatedGuard = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => state.player.authenticated,
  wrapperDisplayName: 'RedirectUnauthenticatedPlayer',
});

export const redirectAuthenticatedGuard = connectedRouterRedirect({
  redirectPath: '/templates',
  authenticatedSelector: state => !state.player.authenticated,
  wrapperDisplayName: 'RedirectAuthenticatedPlayer',
});

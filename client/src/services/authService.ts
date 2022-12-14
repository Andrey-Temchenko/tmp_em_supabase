import Cookies from 'js-cookie';

import httpHelper from 'helpers/httpHelper';

export default {
  signUp,
  login,
  googleLogin,
  signOut,
  passwordForgot,
  resetPassword,
  getToken,
  saveToken
};

async function signUp(user): Promise<AuthResponse> {
  return await httpHelper.post('/api/sign-up', user);
}

async function login(user): Promise<LoginResponse> {
  return await httpHelper.post('/api/login', user);
}

async function googleLogin() {
  return await httpHelper.post('/api/google-login', {});
}

async function signOut() {
  return await httpHelper.post('/api/sign-out', {});
}

async function passwordForgot(email: string): Promise<AuthResponse> {
  return await httpHelper.post('/api/password-forgot', {email});
}

async function resetPassword(user): Promise<AuthResponse> {
  return await httpHelper.post('/api/password-reset', user);
}

function getToken(): string | undefined {
  const token = Cookies.get('jwt_token');
  return token;
}

function saveToken(jwt?: string) {
  if (!jwt) {
    Cookies.remove('jwt_token');
    return;
  }

  Cookies.set('jwt_token', jwt);
}

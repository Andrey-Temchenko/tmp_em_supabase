import {createClient} from '@supabase/supabase-js';

import config from '../config';
import AppError from 'appError';

const supabase = createClient(config.database.supabaseUrl, config.database.supabaseKey);

export default {
  getCurrentUser,
  signUp,
  signInWithPassword,
  signOut,
  resetPasswordForEmail,
  resetPassword,
  setSession,
  signInWithOAuth
};

async function getCurrentUser(jwt?: string) {
  const {
    data: {user}
  } = await supabase.auth.getUser(jwt);

  return user;
}

async function signUp(userData) {
  const {data, error} = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
    options: {
      data: {
        first_name: userData.firstName,
        last_name: userData.lastName
      }
    }
  });

  if (error) throw new AppError(error.message);

  return data;
}

async function signInWithPassword(userData) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password
  });

  if (error) throw new AppError(error.message);

  return data;
}

async function signOut() {
  const {error} = await supabase.auth.signOut();

  if (error) throw new AppError(error.message);
}

async function resetPasswordForEmail(email: string) {
  const {data, error} = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:4000/password-reset'
  });

  if (error) throw new AppError(error.message);

  return data;
}

async function resetPassword(password: string) {
  const {data, error} = await supabase.auth.updateUser({password});

  if (error) throw new AppError(error.message);

  return data;
}

async function setSession(token: string, refreshToken: string) {
  const {data, error} = await supabase.auth.setSession({refresh_token: refreshToken, access_token: token});

  if (error) throw new AppError(error.message);

  return data;
}

async function signInWithOAuth() {
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'http://localhost:4000/login'
    }
  });

  if (error) throw new AppError(error.message);

  return data;
}

import * as Joi from 'joi';

import helper from './_controllerHelper';
import AppError from '../appError';
import authRepository from 'repositories/authRepository';

export default {
  signUpPost,
  loginPost,
  googleLogin,
  signOut,
  forgotPassword,
  resetPasswordPost
};

async function signUpPost(req, res) {
  try {
    let userData = await helper.loadSchema(req.body, {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required()
    });

    if (userData.password !== userData.confirmPassword) throw new AppError('Passwords do not match.');

    //Use lower-case e-mails to avoid case-sensitive e-mail matching
    userData.email = userData.email.toLowerCase();

    const currentUser = await authRepository.getCurrentUser();

    if (currentUser) throw new AppError('Log out before signing up.');

    await authRepository.signUp(userData);

    const message = 'Activation email was send. Please, check you inbox.';

    return helper.sendData({message}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}

async function loginPost(req, res) {
  try {
    const userData = await helper.loadSchema(req.body, {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });

    const {user, session} = await authRepository.signInWithPassword(userData);

    const {access_token} = session;

    const result = {
      token: access_token,
      user
    };

    return helper.sendData(result, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}

async function googleLogin(req, res) {
  try {
    const data = await authRepository.signInWithOAuth();

    return helper.sendData({url: data?.url}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}

async function signOut(req, res) {
  try {
    await authRepository.signOut();

    return helper.sendData({}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}

async function forgotPassword(req, res) {
  try {
    const data = await helper.loadSchema(req.body, {
      email: Joi.string().email().required()
    });

    const email = data.email.toLowerCase();

    await authRepository.resetPasswordForEmail(email);

    const message = `We've just dropped you an email. Please check your mail to reset your password. Thanks!`;

    return helper.sendData({message}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}

async function resetPasswordPost(req, res) {
  try {
    const data = await helper.loadSchema(req.body, {
      password: Joi.string().required(),
      confirmPassword: Joi.string().required(),
      token: Joi.string().required(),
      refreshToken: Joi.string().required()
    });

    if (data.password !== data.confirmPassword) throw new AppError('Passwords do not match.');

    await authRepository.setSession(data.token, data.refreshToken);

    await authRepository.resetPassword(data.password);

    const message = 'Your password was reset successfully.';

    helper.sendData({message}, res);
  } catch (err) {
    helper.sendFailureMessage(err, res);
  }
}

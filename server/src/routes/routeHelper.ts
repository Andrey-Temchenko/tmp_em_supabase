import * as _ from 'lodash';

let app = null;
import config from '../config';
import authRepository from 'repositories/authRepository';

export default {
  init,
  get: getRout,
  put: putRout,
  post: postRout,
  delete: deleteRout
};

function init(expressApp) {
  app = expressApp;
}

function getRout(route, handler, options = {}) {
  let handlers = getHandlers(handler, options);

  app.get(route, handlers);
}

function putRout(route, handler, options = {}) {
  let handlers = getHandlers(handler, options);

  app.put(route, handlers);
}

function postRout(route, handler, options = {}) {
  let handlers = getHandlers(handler, options);

  app.post(route, handlers);
}

function deleteRout(route, handler, options = {}) {
  let handlers = getHandlers(handler, options);

  app.delete(route, handlers);
}

function getHandlers(handler, options) {
  setOptionsDefaults(options);

  let handlers = [];

  if (options.auth) {
    handlers.push(getAuthenticatedCheckHandler());
  }

  handlers.push(handler);

  return handlers;
}

function setOptionsDefaults(options) {
  //require auth by default
  if (options.auth === undefined) {
    options.auth = true;
  }
}

function getAuthenticatedCheckHandler() {
  return async (req, res, next) => {
    let header = req.headers['authorization'];

    let token = parseTokenFromHeader(header);

    if (!token) {
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });
    }

    const user = await authRepository.getCurrentUser(token);

    if (!user) {
      return res.status(401).send('Unauthorized');
    }

    req.currentUser = user;

    return next();
  };

  function parseTokenFromHeader(header) {
    if (!header) return null;

    let prefix = 'Bearer ';

    if (!_.startsWith(header, prefix)) return null;

    return header.substring(prefix.length);
  }
}

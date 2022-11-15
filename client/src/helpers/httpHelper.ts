import axios from 'axios';
import {endsWith} from 'lodash';

import uiHelper from './uiHelper';

import authService from 'services/authService';

export default {
  get: httpGet,
  post: httpPost,
  patch: httpPatch,
  put: httpPut,
  delete: httpDelete
};

function httpGet(url: string, queryParams) {
  const axiosData = axios.get(`${url}${getQueryString(queryParams)}`, getDefaultRequestOptions());

  return processRequest(axiosData);
}

function httpPost(url: string, data) {
  const request = axios.post(url, JSON.stringify(data), getDefaultRequestOptions());

  return processRequest(request);
}

function httpPut(url: string, data) {
  const request = axios.put(url, JSON.stringify(data), getDefaultRequestOptions());

  return processRequest(request);
}

function httpPatch(url: string, data) {
  const request = axios.patch(url, JSON.stringify(data), getDefaultRequestOptions());

  return processRequest(request);
}

async function httpDelete(url: string) {
  const request = axios.delete(url, getDefaultRequestOptions());

  return processRequest(request);
}

async function processRequest(axiosRequest) {
  try {
    const response = await axiosRequest;

    // if OK return
    if (response.status === 200) return response.data.data;

    const status = response.status;

    if (status === 401 || status === 403) {
      if (!endsWith(window.location.href, '/login')) {
        window.location.href = '/login';
      }
      return;
    }

    if (status === 400 || status === 500) {
      const responseData = response.data;

      if (responseData && responseData.message) {
        throw new Error(responseData.message);
      }
    }

    throw new Error(`Invalid HTTP response status ${status}`);
  } catch (err: any) {
    uiHelper.showError(err?.message);
    throw err;
  }
}

function getQueryString(params) {
  if (!params || !Object.keys(params).length) return '';

  const esc = encodeURIComponent;

  let query = '?';

  query += Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');

  return query;
}

function getDefaultRequestOptions() {
  return {
    headers: {
      pragma: 'no-cache',
      'Content-Type': 'application/json',
      Authorization: getAuthHeader()
    },
    validateStatus: status => true,
    credentials: 'same-origin'
  };
}

function getAuthHeader() {
  const jwt = authService.getToken();

  return `Bearer ${jwt}`;
}

import {isEmpty} from 'lodash';

export default {
  isValidEmail,
  isEmptyErrorObject
};

const EMAIL_VALIDATION_REG_EXP = /^([\w-+]+(?:\.[\w-+]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

function isValidEmail(email: string) {
  return EMAIL_VALIDATION_REG_EXP.test(email);
}

function isEmptyErrorObject(obj) {
  let isEmptyObject = true;

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (!isEmpty(value)) {
      isEmptyObject = false;
      break;
    }
  }

  return isEmptyObject;
}

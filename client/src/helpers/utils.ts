import {v4 as uuidv4} from 'uuid';

export default {
  getRandomUid
};

function getRandomUid() {
  return uuidv4();
}

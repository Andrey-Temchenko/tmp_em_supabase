import {loadRecords as getRecords, deleteRecord as removeRecord} from 'reducers/recordSlice';

import dataService from 'services/dataService';
import helper from './actionHelper';

export default {
  loadRecords,
  saveRecord,
  deleteRecord
};

function loadRecords(sortBy: string) {
  return helper.dispatchAsyncAction(async dispatch => {
    const records = await dataService.getRecords(sortBy);
    dispatch(getRecords({records, sortBy}));
  }, false);
}

function saveRecord(record) {
  return helper.dispatchAsyncAction(async () => {
    const response: RecordItem = await dataService.saveRecord(record);
    return response?.id ? true : false;
  });
}

function deleteRecord(id: number) {
  return helper.dispatchAsyncAction(async dispatch => {
    await dataService.deleteRecord(id);
    dispatch(removeRecord(id));
    return true;
  });
}

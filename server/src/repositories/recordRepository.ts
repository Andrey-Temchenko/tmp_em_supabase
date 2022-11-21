import * as _ from 'lodash';
import {createClient} from '@supabase/supabase-js';

import config from '../config';
import AppError from 'appError';

const supabase = createClient(config.database.supabaseUrl, config.database.supabaseKey);

const TABLE_NAME = 'record';

export default {
  getRecords,
  getRecordById,
  addRecord,
  updateRecord,
  removeRecord,
  getRecordsByCategoryId
} as RecordRepository;

async function getRecords(userId: string, searchQuery: any): Promise<RecordDto[]> {
  const {data, error} = await supabase.from(TABLE_NAME).select().order(searchQuery.sortBy).match({userId});

  if (error) throw new AppError(error.message);

  return data.map(record => mapRecord(record));
}

async function getRecordById(id: string): Promise<RecordDto> {
  const {data, error} = await supabase.from(TABLE_NAME).select().match({id});

  if (error) throw new AppError(error.message);

  return mapRecord(data[0]);
}

async function addRecord(userId: string, recordData: Partial<RecordDto>) {
  const {data, error} = await supabase
    .from(TABLE_NAME)
    .insert({
      date: recordData.date,
      cost: recordData.cost,
      categoryId: recordData.categoryId,
      note: recordData.note,
      userId
    })
    .select();

  if (error) throw new AppError(error.message);

  return mapRecord(data[0]);
}

async function updateRecord(recordData: RecordDto): Promise<RecordDto> {
  const id = recordData.id;

  const {data: record, error: recordError} = await supabase.from(TABLE_NAME).select().match({id});

  if (recordError) throw new AppError(recordError.message);

  if (!record) return;

  const {data, error} = await supabase
    .from(TABLE_NAME)
    .update({date: recordData.date, cost: recordData.cost, categoryId: recordData.categoryId, note: recordData.note})
    .match({id})
    .select();

  if (error) throw new AppError(error.message);

  return mapRecord(data[0]);
}

async function removeRecord(id: string): Promise<void> {
  const {error} = await supabase.from(TABLE_NAME).delete().match({id});

  if (error) throw new AppError(error.message);
}

async function getRecordsByCategoryId(categoryId: string): Promise<RecordDto[]> {
  const {data, error} = await supabase.from(TABLE_NAME).select().match({categoryId});

  if (error) throw new AppError(error.message);

  return data.map(record => mapRecord(record));
}

//helper methods

function mapRecord(recordModel: any): RecordDto {
  if (!recordModel) return null;

  const record: RecordDto = {
    id: recordModel.id.toString(),
    date: new Date(recordModel.date),
    cost: recordModel.cost,
    note: recordModel.note,
    categoryId: recordModel.categoryId.toString(),
    userId: recordModel.userId.toString()
  };

  return record;
}

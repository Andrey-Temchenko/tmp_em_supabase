import * as Joi from 'joi';

import AppError from '../appError';
import helper from './_controllerHelper';
import dataAccess from '../data_access';

export default {
  currentUser,
  categoryList,
  saveCategory,
  deleteCategory,
  recordList,
  saveRecord,
  deleteRecord
};

async function currentUser(req, res) {
  try {
    const user = await dataAccess.authRepository.getCurrentUser();

    return helper.sendData(user, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function categoryList(req, res) {
  try {
    const userId: string = helper.getCurrentUser(req).id;

    const categories = await dataAccess.categoryRepository.getCategories(userId);

    return helper.sendData(categories, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function saveCategory(req, res) {
  try {
    const data = await helper.loadSchema(req.body, {
      category: Joi.object()
        .unknown(true)
        .keys({
          id: Joi.string().allow(null),
          title: Joi.string().required(),
          description: Joi.string().required()
        })
    });

    const userId: string = helper.getCurrentUser(req).id;

    let category = null;

    if (data.category.id) {
      await assertUserOwnsCategory(userId, data.category.id);

      category = await dataAccess.categoryRepository.updateCategory(data.category);
    } else {
      category = await dataAccess.categoryRepository.addCategory(userId, data.category);
    }

    return helper.sendData(category, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function deleteCategory(req, res) {
  try {
    const data = await helper.loadSchema(req.params, {
      id: Joi.string().required()
    });

    await assertUserOwnsCategory(helper.getCurrentUser(req).id, data.id);

    await assertCategoryHasNoRecords(data.id);

    await dataAccess.categoryRepository.removeCategory(data.id);

    return helper.sendData({}, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function recordList(req, res) {
  try {
    const searchQuery = await helper.loadSchema(req.query, {
      sortBy: Joi.string().required()
    });

    const userId = helper.getCurrentUser(req).id;

    const records = await dataAccess.recordRepository.getRecords(userId, searchQuery);

    return helper.sendData(records, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function saveRecord(req, res) {
  try {
    let data = await helper.loadSchema(req.body, {
      record: Joi.object()
        .unknown(true)
        .keys({
          id: Joi.alternatives().try(Joi.number(), Joi.string()).allow(null),
          date: Joi.date().required(),
          categoryId: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
          cost: Joi.number().required(),
          note: Joi.string().required()
        })
    });

    let userId = helper.getCurrentUser(req).id;

    let record = null;

    if (data.record.id) {
      await assertUserOwnsRecord(userId, data.record.id);

      record = await dataAccess.recordRepository.updateRecord(data.record);
    } else {
      record = await dataAccess.recordRepository.addRecord(userId, data.record);
    }

    return helper.sendData(record, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function deleteRecord(req, res) {
  try {
    let data = await helper.loadSchema(req.params, {
      id: Joi.alternatives().try(Joi.number(), Joi.string()).required()
    });

    await assertUserOwnsRecord(helper.getCurrentUser(req).id, data.id);

    await dataAccess.recordRepository.removeRecord(data.id);

    return helper.sendData({}, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function assertUserOwnsCategory(userId: string, categoryId: string) {
  const category = await dataAccess.categoryRepository.getCategoryById(categoryId);

  const hasRights = category && category.userId === userId;

  if (!hasRights) throw new AppError('User does not own category');
}

async function assertUserOwnsRecord(userId, recordId) {
  let record = await dataAccess.recordRepository.getRecordById(recordId);

  let hasRights = record && record.userId.toString() === userId.toString();

  if (!hasRights) throw new AppError('User does not own record');
}

async function assertCategoryHasNoRecords(categoryId) {
  let records = await dataAccess.recordRepository.getRecordsByCategoryId(categoryId);

  let hasRecords = records && records.length;

  if (hasRecords) throw new AppError('Cannot delete category with records.');
}

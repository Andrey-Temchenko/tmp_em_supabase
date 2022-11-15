import httpHelper from 'helpers/httpHelper';

export default {
  getCurrentUser,
  getCategories,
  deleteCategory,
  saveCategory,
  getRecords,
  deleteRecord,
  saveRecord
};

async function getCurrentUser(): Promise<User> {
  return await httpHelper.get('/api/current-user', {});
}

async function getCategories(): Promise<Category[]> {
  return await httpHelper.get('/api/categories', {});
}

async function deleteCategory(id: number): Promise<{}> {
  return await httpHelper.delete(`/api/category/${id}`);
}

async function saveCategory(category: Category): Promise<Category> {
  const data = {
    category
  };

  return await httpHelper.post('/api/category', data);
}

async function getRecords(sortBy: string): Promise<RecordItem[]> {
  const data = {
    sortBy
  };

  return await httpHelper.get('/api/records', data);
}

async function deleteRecord(id: number): Promise<{}> {
  return await httpHelper.delete(`/api/record/${id}`);
}

async function saveRecord(record): Promise<RecordItem> {
  const data = {
    record
  };

  return await httpHelper.post('/api/record', data);
}

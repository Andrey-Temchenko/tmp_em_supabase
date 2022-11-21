import * as dateFns from 'date-fns';
import * as fs from 'fs-extra';
import {createClient} from '@supabase/supabase-js';

import path from 'helpers/pathHelper';
import config from './config';

const {Client} = require('pg');

const supabase = createClient(config.supabase.url, config.supabase.serviceRole);

export default {
  seedData
};

async function seedData() {
  const seedPath = path.getDataRelative('seed/seedData.json');
  const seedData = await fs.readJson(seedPath);

  try {
    await clearDatabase();

    const userLookup = await seedUsers(seedData.users);
    const categoryLookup = await seedCategories(seedData.categories, userLookup);
    await seedRecords(seedData.records, userLookup, categoryLookup);

    console.log('DB was seeded!');
  } catch (err) {
    console.error(`Data Seed error`);
    console.log(err);
  }
}

async function seedUsers(usersData) {
  let userLookup = {};

  for (const userData of usersData) {
    const local = userData.profile.local;

    const {
      data: {user},
      error
    } = await supabase.auth.admin.createUser({
      email: userData.email,
      email_confirm: local.isActivated,
      password: local.password,
      user_metadata: {
        first_name: local.firstName,
        last_name: local.lastName
      }
    });

    if (error) throw new Error(error.message);

    userLookup[userData.id] = user.id;
  }

  return userLookup;
}

async function seedCategories(categoryData, userLookup) {
  let categoryLookup = {};

  for (const category of categoryData) {
    const {data, error} = await supabase
      .from('category')
      .insert({title: category.title, description: category.description, userId: userLookup[category.userId]})
      .select('id');

    if (error) throw new Error(error.message);

    categoryLookup[category.id] = data[0].id;
  }

  return categoryLookup;
}

async function seedRecords(recordsData, userLookup, categoryLookup) {
  for (const record of recordsData) {
    const {data, error} = await supabase.from('record').insert({
      date: dateFns.toDate(record.date),
      cost: record.cost,
      categoryId: categoryLookup[record.categoryId],
      note: record.note,
      userId: userLookup[record.userId]
    });

    if (error) throw new Error(error.message);
  }
}

async function clearDatabase() {
  const client = new Client({
    user: config.database.user,
    host: config.database.host,
    database: config.database.database,
    password: config.database.password,
    port: config.database.port
  });

  await client.connect();

  console.log('Connected to DB.');

  await client.query('DELETE FROM record');
  await client.query('DELETE FROM category');

  const {
    data: {users},
    error
  } = await supabase.auth.admin.listUsers();

  if (error) throw new Error(error.message);

  for (const user of users) {
    const {data, error} = await supabase.auth.admin.deleteUser(user.id);

    if (error) throw new Error(error.message);
  }

  await client.end();

  console.log('DB was successfully cleared!');
}

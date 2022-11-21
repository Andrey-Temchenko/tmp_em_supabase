import * as _ from 'lodash';
import {createClient} from '@supabase/supabase-js';

import config from '../config';
import AppError from 'appError';

const supabase = createClient(config.supabase.url, config.supabase.key);

const TABLE_NAME = 'category';

export default {
  getCategoryById,
  getCategories,
  addCategory,
  updateCategory,
  removeCategory
} as CategoryRepository;

async function getCategoryById(id: string): Promise<CategoryDto> {
  const {data, error} = await supabase.from(TABLE_NAME).select().match({id});

  if (error) throw new AppError(error.message);

  return mapCategory(data[0]);
}

async function getCategories(userId: string): Promise<CategoryDto[]> {
  const {data, error} = await supabase.from(TABLE_NAME).select().order('title').match({userId});

  if (error) throw new AppError(error.message);

  return data.map(category => mapCategory(category));
}

async function addCategory(userId: string, categoryData): Promise<CategoryDto> {
  const {data, error} = await supabase
    .from(TABLE_NAME)
    .insert({title: categoryData.title, description: categoryData.description, userId})
    .select();

  if (error) throw new AppError(error.message);

  return mapCategory(data[0]);
}

async function updateCategory(categoryData): Promise<CategoryDto> {
  const id = categoryData.id;

  const {data: category, error: categoryError} = await supabase.from(TABLE_NAME).select().match({id});

  if (categoryError) throw new AppError(categoryError.message);

  if (!category) return;

  const {data, error} = await supabase
    .from(TABLE_NAME)
    .update({title: categoryData.title, description: categoryData.description})
    .match({id})
    .select();

  if (error) throw new AppError(error.message);

  return mapCategory(data[0]);
}

async function removeCategory(id: string): Promise<any> {
  const {error} = await supabase.from(TABLE_NAME).delete().match({id});

  if (error) throw new AppError(error.message);
}

//helper methods

function mapCategory(categoryModel: any): CategoryDto {
  if (!categoryModel) return null;

  const category: CategoryDto = {
    id: categoryModel.id.toString(),
    title: categoryModel.title,
    description: categoryModel.description,
    userId: categoryModel.userId.toString()
  };

  return category;
}

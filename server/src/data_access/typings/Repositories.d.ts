interface CategoryRepository {
  getCategoryById(id: string): Promise<CategoryDto>;
  getCategories(userId: string): Promise<CategoryDto[]>;
  addCategory(userId: string, categoryData: Partial<CategoryDto>): Promise<CategoryDto>;
  updateCategory(categoryData: CategoryDto): Promise<CategoryDto>;
  removeCategory(id: string): Promise<void>;
}

interface RecordRepository {
  getRecords(userId: string, searchQuery: any): Promise<RecordDto[]>;
  getRecordById(id: string): Promise<RecordDto>;
  addRecord(userId: string, recordData: Partial<RecordDto>);
  updateRecord(recordData: RecordDto): Promise<RecordDto>;
  removeRecord(id: string): Promise<void>;
  getRecordsByCategoryId(categoryId: string): Promise<RecordDto[]>;
}

interface AuthRepository {
  getCurrentUser(jwt?: string): Promise<any>;
  signUp(userData: any): Promise<any>;
  signInWithPassword(userData: any): Promise<any>;
  signOut(): Promise<any>;
  resetPasswordForEmail(email: string): Promise<any>;
  resetPassword(password: string): Promise<any>;
  setSession(token: string, refreshToken: string): Promise<any>;
  signInWithOAuth(): Promise<any>;
}

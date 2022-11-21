import categoryRepository from 'repositories/categoryRepository';
import recordRepository from 'repositories/recordRepository';
import authRepository from 'repositories/authRepository';

interface DataSource {
  categoryRepository: CategoryRepository;
  recordRepository: RecordRepository;
  authRepository: AuthRepository;
}

const dataSource: DataSource = {
  categoryRepository,
  recordRepository,
  authRepository
};

export default dataSource;

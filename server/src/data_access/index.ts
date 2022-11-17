import categoryRepository from 'repositories/categoryRepository';
import recordRepository from 'repositories/recordRepository';
import userRepository from 'repositories/userRepository';

interface DataSource {
  categoryRepository: CategoryRepository;
  recordRepository: RecordRepository;
  userRepository: UserRepository;
}

const dataSource: DataSource = {
  categoryRepository,
  recordRepository,
  userRepository
};

export default dataSource;

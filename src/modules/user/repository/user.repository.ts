import { BaseRepository } from '../../../core/repository/base.repository';
import { User, CreateUserDto, UpdateUserDto } from '../types/user.types';

/**
 * User Repository
 */
export class UserRepository extends BaseRepository<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  protected resourcePath = '/user';

  // Thêm API calls riêng cho User ở đây
}

// Export singleton instance
export const userRepository = new UserRepository();

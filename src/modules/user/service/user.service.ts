import { BaseService } from '../../../core/service/base.service';
import { User, CreateUserDto, UpdateUserDto } from '../types/user.types';
import { userRepository } from '../repository/user.repository';

/**
 * User Service
 */
export class UserService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor() {
    super(userRepository);
  }

  // Thêm business logic riêng cho User ở đây
}

// Export singleton instance
export const userService = new UserService();

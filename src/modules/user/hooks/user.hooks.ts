import { createBaseHooks } from '../../../core/hooks/base.hooks';
import { User, CreateUserDto, UpdateUserDto } from '../types/user.types';
import { userService } from '../service/user.service';

/**
 * User Hooks
 */
export const {
  // Query hooks
  useGetPage: useGetUserPage,
  useGetMany: useGetManyUser,
  useCount: useCountUser,
  useGetOne: useGetOneUser,
  useExists: useExistsUser,
  useFindById: useFindUserById,
  useFindByMa: useFindUserByMa,
  
  // Mutation hooks
  useCreate: useCreateUser,
  useUpdate: useUpdateUser,
  useUpdateMany: useUpdateManyUser,
  useRemove: useRemoveUser,
  useRemoveMany: useRemoveManyUser,
  useSoftDelete: useSoftDeleteUser,
  useRestore: useRestoreUser,
} = createBaseHooks<User, CreateUserDto, UpdateUserDto>('user', userService);

import { createBaseHooks } from "../../../core/hooks/base.hooks";
import { File, CreateFileDto, UpdateFileDto } from "../types/file.types";
import { fileService } from "../service/file.service";

/**
 * File Hooks
 */
export const {
  // Query hooks
  useGetPage: useGetFilePage,
  useGetMany: useGetManyFile,
  useCount: useCountFile,
  useGetOne: useGetOneFile,
  useExists: useExistsFile,
  useFindById: useFindFileById,
  useFindByMa: useFindFileByMa,

  // Mutation hooks
  useCreate: useCreateFile,
  useUpdate: useUpdateFile,
  useUpdateMany: useUpdateManyFile,
  useRemove: useRemoveFile,
  useRemoveMany: useRemoveManyFile,
  useSoftDelete: useSoftDeleteFile,
  useRestore: useRestoreFile,
} = createBaseHooks<File, CreateFileDto, UpdateFileDto>("file", fileService);

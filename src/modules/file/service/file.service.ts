import { BaseService } from "../../../core/service/base.service";
import { File, CreateFileDto, UpdateFileDto } from "../types/file.types";
import { fileRepository } from "../repository/file.repository";

/**
 * File Service
 */
export class FileService extends BaseService<
  File,
  CreateFileDto,
  UpdateFileDto
> {
  constructor() {
    super(fileRepository);
  }
}

// Export singleton instance
export const fileService = new FileService();

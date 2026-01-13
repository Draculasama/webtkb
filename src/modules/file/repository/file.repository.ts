import { BaseRepository } from "../../../core/repository/base.repository";
import {
  File as FileEntity,
  CreateFileDto,
  UpdateFileDto,
} from "../types/file.types";

/**
 * File Repository
 */
export class FileRepository extends BaseRepository<
  FileEntity,
  CreateFileDto,
  UpdateFileDto
> {
  protected resourcePath = "/file";

  async uploadFile(module: string, file: File): Promise<FileEntity> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("module", module);

    const response = await this.axiosInstance.post<FileEntity>(
      `${this.resourcePath}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    response.data = {
      ...response.data,
      url: `${response.data.url}`,
    };
    return response.data;
  }
}

// Export singleton instance
export const fileRepository = new FileRepository();

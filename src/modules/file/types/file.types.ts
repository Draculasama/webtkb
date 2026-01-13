import { BaseEntity } from "../../../core/types/base.types";

/**
 * File Entity
 */
export interface File extends BaseEntity {
  originalName: string;
  fileName: string;
  path?: string;
  url?: string;
  mimetype: string;
  type?: FileType;
  module: string;
  entityId: string | number;
  extension?: string;
  uploadedBy?: string;
  metadata?: MetaData;
}

export type MetaData = {
  width?: number;
  height?: number;
  duration?: number;
  thumbnail?: string;
  [key: string]: any;
};
export enum FileType {
  IMAGE = "image",
  DOCUMENT = "document",
  VIDEO = "video",
  AUDIO = "audio",
  OTHER = "other",
}
/**
 * Create File DTO
 */
export interface CreateFileDto extends Omit<
  File,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

/**
 * Update File DTO
 */
export interface UpdateFileDto extends Partial<CreateFileDto> {}

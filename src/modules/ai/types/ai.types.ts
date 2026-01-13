import { BaseEntity } from "../../../core/types/base.types";

/**
 * Ai Entity
 */
export interface Ai extends BaseEntity {
  columns: any[];
  rows: any[];
}

export interface aiDto {
  text: string;
}

/**
 * Create Ai DTO
 */
export interface CreateAiDto extends Omit<
  Ai,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
> {}

/**
 * Update Ai DTO
 */
export interface UpdateAiDto extends Partial<CreateAiDto> {}

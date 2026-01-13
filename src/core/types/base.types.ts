/**
 * Base Entity interface
 */
export interface BaseEntity {
  id?: number;
  ma?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

/**
 * Query options for filtering, sorting, pagination
 */
export interface QueryOptions {
  filter?: string; // JSON string
  sort?: string; // JSON string: {"field": "ASC|DESC"}
  select?: string; // Comma-separated fields
  populate?: string; // Comma-separated relations
  page?: number;
  size?: number;
  limit?: number;
  offset?: number;
}

/**
 * Pageable response
 */
export interface PageableResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

/**
 * Count response
 */
export interface CountResponse {
  count: number;
}

/**
 * Exists response
 */
export interface ExistsResponse {
  exists: boolean;
}

/**
 * Affected response
 */
export interface AffectedResponse {
  affected: number;
}

/**
 * Update many request
 */
export interface UpdateManyRequest<T> {
  filter: string;
  data: Partial<T>;
}

/**
 * Delete many request
 */
export interface DeleteManyRequest {
  filter: string;
}

/**
 * Soft delete request
 */
export interface SoftDeleteRequest {
  filter: string;
}

/**
 * Restore request
 */
export interface RestoreRequest {
  filter: string;
}

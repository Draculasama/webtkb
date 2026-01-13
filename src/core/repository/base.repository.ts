import { BaseApiClient } from "../api/base-api.client";
import {
  BaseEntity,
  QueryOptions,
  PageableResponse,
  CountResponse,
  ExistsResponse,
  AffectedResponse,
  UpdateManyRequest,
  DeleteManyRequest,
  SoftDeleteRequest,
  RestoreRequest,
} from "../types/base.types";

/**
 * Base Repository
 * Tương tự BaseController trong NestJS
 */
export abstract class BaseRepository<
  TEntity extends BaseEntity,
  TCreateDto = Partial<TEntity>,
  TUpdateDto = Partial<TEntity>,
> extends BaseApiClient {
  protected abstract resourcePath: string;

  async create(createDto: TCreateDto): Promise<TEntity> {
    return this.post<TEntity, TCreateDto>(this.resourcePath, createDto);
  }

  async getPage(options?: QueryOptions): Promise<PageableResponse<TEntity>> {
    const params = new URLSearchParams();

    if (options?.filter) params.append("filter", options.filter);
    if (options?.sort) params.append("sort", options.sort);
    if (options?.select) params.append("select", options.select);
    if (options?.populate) params.append("populate", options.populate);
    if (options?.page !== undefined)
      params.append("page", String(options.page));
    if (options?.size !== undefined)
      params.append("size", String(options.size));

    const queryString = params.toString();
    const url = queryString
      ? `${this.resourcePath}/page?${queryString}`
      : `${this.resourcePath}/page`;

    return this.get<PageableResponse<TEntity>>(url);
  }
  async getMany(options?: QueryOptions): Promise<TEntity[]> {
    const params = new URLSearchParams();

    if (options?.filter) params.append("filter", options.filter);
    if (options?.sort) params.append("sort", options.sort);
    if (options?.select) params.append("select", options.select);
    if (options?.populate) params.append("populate", options.populate);
    if (options?.limit !== undefined)
      params.append("limit", String(options.limit));
    if (options?.offset !== undefined)
      params.append("offset", String(options.offset));

    const queryString = params.toString();
    const url = queryString
      ? `${this.resourcePath}/all?${queryString}`
      : `${this.resourcePath}/all`;

    return this.get<TEntity[]>(url);
  }

  async count(options?: QueryOptions): Promise<number> {
    const params = new URLSearchParams();
    if (options?.filter) params.append("filter", options.filter);

    const queryString = params.toString();
    const url = queryString
      ? `${this.resourcePath}/count?${queryString}`
      : `${this.resourcePath}/count`;

    const response = await this.get<CountResponse>(url);
    return response.count;
  }

  async getOne(options?: QueryOptions): Promise<TEntity> {
    const params = new URLSearchParams();

    if (options?.filter) params.append("filter", options.filter);
    if (options?.select) params.append("select", options.select);
    if (options?.populate) params.append("populate", options.populate);

    const queryString = params.toString();
    const url = queryString
      ? `${this.resourcePath}/one?${queryString}`
      : `${this.resourcePath}/one`;

    return this.get<TEntity>(url);
  }

  async exists(options?: QueryOptions): Promise<boolean> {
    const params = new URLSearchParams();
    if (options?.filter) params.append("filter", options.filter);

    const queryString = params.toString();
    const url = queryString
      ? `${this.resourcePath}/exists?${queryString}`
      : `${this.resourcePath}/exists`;

    const response = await this.get<ExistsResponse>(url);
    return response.exists;
  }

  async findById(id: number): Promise<TEntity> {
    return this.get<TEntity>(`${this.resourcePath}/id/${id}`);
  }

  async findByMa(ma: string): Promise<TEntity> {
    return this.get<TEntity>(`${this.resourcePath}/ma/${ma}`);
  }

  async update(id: number, updateDto: TUpdateDto): Promise<TEntity> {
    return this.put<TEntity, TUpdateDto>(
      `${this.resourcePath}/${id}`,
      updateDto,
    );
  }

  async updateMany(
    filter: Record<string, any>,
    data: Partial<TEntity>,
  ): Promise<AffectedResponse> {
    const request: UpdateManyRequest<TEntity> = {
      filter: JSON.stringify(filter),
      data,
    };
    return this.put<AffectedResponse>(
      `${this.resourcePath}/update-many`,
      request,
    );
  }

  async remove(id: number): Promise<AffectedResponse> {
    return super.delete<AffectedResponse>(`${this.resourcePath}/${id}`);
  }

  async deleteMany(filter: Record<string, any>): Promise<AffectedResponse> {
    const request: DeleteManyRequest = {
      filter: JSON.stringify(filter),
    };
    return super.delete<AffectedResponse>(`${this.resourcePath}/delete-many`, {
      data: request,
    });
  }

  async softDelete(filter: Record<string, any>): Promise<AffectedResponse> {
    const request: SoftDeleteRequest = {
      filter: JSON.stringify(filter),
    };
    return this.post<AffectedResponse>(
      `${this.resourcePath}/soft-delete`,
      request,
    );
  }

  async restore(filter: Record<string, any>): Promise<AffectedResponse> {
    const request: RestoreRequest = {
      filter: JSON.stringify(filter),
    };
    return this.post<AffectedResponse>(`${this.resourcePath}/restore`, request);
  }
  
}

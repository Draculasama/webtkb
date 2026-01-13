import { BaseRepository } from "../repository/base.repository";
import {
  BaseEntity,
  QueryOptions,
  PageableResponse,
  AffectedResponse,
} from "../types/base.types";

export abstract class BaseService<
  TEntity extends BaseEntity,
  TCreateDto = Partial<TEntity>,
  TUpdateDto = Partial<TEntity>,
> {
  constructor(
    protected readonly repository: BaseRepository<
      TEntity,
      TCreateDto,
      TUpdateDto
    >,
  ) {}

  async create(createDto: TCreateDto): Promise<TEntity> {
    // Có thể thêm business logic ở đây (validation, transform data, etc.)
    return this.repository.create(createDto);
  }

  async getPage(options?: QueryOptions): Promise<PageableResponse<TEntity>> {
    return this.repository.getPage(options);
  }

  async getMany(options?: QueryOptions): Promise<TEntity[]> {
    return this.repository.getMany(options);
  }

  async count(options?: QueryOptions): Promise<number> {
    return this.repository.count(options);
  }

  /**
   * Lấy 1 bản ghi
   */
  async getOne(options?: QueryOptions): Promise<TEntity> {
    return this.repository.getOne(options);
  }

  /**
   * Kiểm tra tồn tại
   */
  async exists(options?: QueryOptions): Promise<boolean> {
    return this.repository.exists(options);
  }

  /**
   * Lấy theo ID
   */
  async findById(id: number): Promise<TEntity> {
    return this.repository.findById(id);
  }

  /**
   * Lấy theo mã
   */
  async findByMa(ma: string): Promise<TEntity> {
    return this.repository.findByMa(ma);
  }

  /**
   * Cập nhật theo ID
   */
  async update(id: number, updateDto: TUpdateDto): Promise<TEntity> {
    // Có thể thêm business logic ở đây
    return this.repository.update(id, updateDto);
  }

  /**
   * Cập nhật nhiều records
   */
  async updateMany(
    filter: Record<string, any>,
    data: Partial<TEntity>,
  ): Promise<AffectedResponse> {
    return this.repository.updateMany(filter, data);
  }

  /**
   * Xóa theo ID
   */
  async remove(id: number): Promise<AffectedResponse> {
    return this.repository.remove(id);
  }

  /**
   * Xóa nhiều records
   */
  async deleteMany(filter: Record<string, any>): Promise<AffectedResponse> {
    return this.repository.deleteMany(filter);
  }

  /**
   * Soft delete (xóa mềm)
   */
  async softDelete(filter: Record<string, any>): Promise<AffectedResponse> {
    return this.repository.softDelete(filter);
  }

  /**
   * Khôi phục entity đã soft delete
   */
  async restore(filter: Record<string, any>): Promise<AffectedResponse> {
    return this.repository.restore(filter);
  }
}

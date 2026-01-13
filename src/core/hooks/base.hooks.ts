import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
  UseQueryOptions,
} from "@tanstack/react-query";
import { BaseService } from "../service/base.service";
import {
  BaseEntity,
  QueryOptions,
  PageableResponse,
  AffectedResponse,
} from "../types/base.types";

/**
 * Base Hooks Factory
 * Tạo custom hooks cho mỗi entity
 */
export function createBaseHooks<
  TEntity extends BaseEntity,
  TCreateDto = Partial<TEntity>,
  TUpdateDto = Partial<TEntity>,
>(queryKey: string, service: BaseService<TEntity, TCreateDto, TUpdateDto>) {
  /**
   * Hook lấy danh sách có phân trang
   */
  const useGetPage = (
    options?: QueryOptions,
    queryOptions?: Omit<
      UseQueryOptions<PageableResponse<TEntity>>,
      "queryKey" | "queryFn"
    >,
  ): UseQueryResult<PageableResponse<TEntity>> => {
    return useQuery({
      queryKey: [queryKey, "page", options],
      queryFn: () => service.getPage(options),
      ...queryOptions,
    });
  };

  /**
   * Hook lấy tất cả (không phân trang)
   */
  const useGetMany = (
    options?: QueryOptions,
    queryOptions?: Omit<UseQueryOptions<TEntity[]>, "queryKey" | "queryFn">,
  ): UseQueryResult<TEntity[]> => {
    return useQuery({
      queryKey: [queryKey, "all", options],
      queryFn: () => service.getMany(options),
      ...queryOptions,
    });
  };

  /**
   * Hook đếm số lượng
   */
  const useCount = (
    options?: QueryOptions,
    queryOptions?: Omit<UseQueryOptions<number>, "queryKey" | "queryFn">,
  ): UseQueryResult<number> => {
    return useQuery({
      queryKey: [queryKey, "count", options],
      queryFn: () => service.count(options),
      ...queryOptions,
    });
  };

  /**
   * Hook lấy 1 bản ghi
   */
  const useGetOne = (
    options?: QueryOptions,
    queryOptions?: Omit<UseQueryOptions<TEntity>, "queryKey" | "queryFn">,
  ): UseQueryResult<TEntity> => {
    return useQuery({
      queryKey: [queryKey, "one", options],
      queryFn: () => service.getOne(options),
      ...queryOptions,
    });
  };

  /**
   * Hook kiểm tra tồn tại
   */
  const useExists = (
    options?: QueryOptions,
    queryOptions?: Omit<UseQueryOptions<boolean>, "queryKey" | "queryFn">,
  ): UseQueryResult<boolean> => {
    return useQuery({
      queryKey: [queryKey, "exists", options],
      queryFn: () => service.exists(options),
      ...queryOptions,
    });
  };

  /**
   * Hook lấy theo ID
   */
  const useFindById = (
    id: number | undefined,
    queryOptions?: Omit<UseQueryOptions<TEntity>, "queryKey" | "queryFn">,
  ): UseQueryResult<TEntity> => {
    return useQuery({
      queryKey: [queryKey, "findById", id],
      queryFn: () => service.findById(id!),
      enabled: !!id,
      ...queryOptions,
    });
  };

  /**
   * Hook lấy theo mã
   */
  const useFindByMa = (
    ma: string | undefined,
    queryOptions?: Omit<UseQueryOptions<TEntity>, "queryKey" | "queryFn">,
  ): UseQueryResult<TEntity> => {
    return useQuery({
      queryKey: [queryKey, "findByMa", ma],
      queryFn: () => service.findByMa(ma!),
      enabled: !!ma,
      ...queryOptions,
    });
  };

  /**
   * Hook tạo mới
   */
  const useCreate = (): UseMutationResult<TEntity, Error, TCreateDto> => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (createDto: TCreateDto) => service.create(createDto),
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey;

            const isTaiLieu = key[0] === queryKey;

            const isFindBy = key[1] === "findById" || key[1] === "findByMa";

            return isTaiLieu && !isFindBy;
          },
        });
      },
    });
  };

  /**
   * Hook cập nhật theo ID
   */
  const useUpdate = (): UseMutationResult<
    TEntity,
    Error,
    { id: number; data: TUpdateDto }
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({ id, data }: { id: number; data: TUpdateDto }) =>
        service.update(id, data),
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey;

            const isTaiLieu = key[0] === queryKey;

            const isFindBy = key[1] === "findById" || key[1] === "findByMa";

            return isTaiLieu && !isFindBy;
          },
        });
        queryClient.setQueriesData(
          { queryKey: [queryKey, "findById", variables.id] },
          (oldData: TEntity | undefined) => {
            if (!oldData) return _data;
            return {
              ...oldData,
              ..._data,
            } as TEntity;
          },
        );

        queryClient.setQueriesData(
          { queryKey: [queryKey, "findByMa", variables.id] },
          (oldData: TEntity | undefined) => {
            if (!oldData) return _data;

            return {
              ...oldData,
              ..._data,
            } as TEntity;
          },
        );
      },
    });
  };

  /**
   * Hook cập nhật nhiều
   */
  const useUpdateMany = (): UseMutationResult<
    AffectedResponse,
    Error,
    { filter: Record<string, any>; data: Partial<TEntity> }
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        filter,
        data,
      }: {
        filter: Record<string, any>;
        data: Partial<TEntity>;
      }) => service.updateMany(filter, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
    });
  };

  /**
   * Hook xóa theo ID
   */
  const useRemove = (): UseMutationResult<AffectedResponse, Error, number> => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (id: number) => service.remove(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey;

            const isTaiLieu = key[0] === queryKey;

            const isFindBy = key[1] === "findById" || key[1] === "findByMa";

            return isTaiLieu && !isFindBy;
          },
        });
      },
    });
  };

  const useRemoveMany = (): UseMutationResult<
    AffectedResponse,
    Error,
    number[]
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: async (ids: number[]) => {
        const results = await Promise.all(ids.map((id) => service.remove(id)));
        return {
          affected: results.reduce((sum, result) => sum + result.affected, 0),
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
    });
  };

  const useDeleteMany = (): UseMutationResult<
    AffectedResponse,
    Error,
    Record<string, any>
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (filter: Record<string, any>) => service.deleteMany(filter),
      onSuccess: () => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            const key = query.queryKey;

            const isTaiLieu = key[0] === queryKey;

            const isFindBy = key[1] === "findById" || key[1] === "findByMa";

            return isTaiLieu && !isFindBy;
          },
        });
      },
    });
  };

  const useSoftDelete = (): UseMutationResult<
    AffectedResponse,
    Error,
    Record<string, any>
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (filter: Record<string, any>) => service.softDelete(filter),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
    });
  };

  const useRestore = (): UseMutationResult<
    AffectedResponse,
    Error,
    Record<string, any>
  > => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (filter: Record<string, any>) => service.restore(filter),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      },
    });
  };

  return {
    // Query hooks
    useGetPage,
    useGetMany,
    useCount,
    useGetOne,
    useExists,
    useFindById,
    useFindByMa,

    // Mutation hooks
    useCreate,
    useUpdate,
    useUpdateMany,
    useRemove,
    useRemoveMany,
    useDeleteMany,
    useSoftDelete,
    useRestore,
  };
}

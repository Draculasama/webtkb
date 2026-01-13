import { useState, useMemo } from "react";
import { FormInstance, message } from "antd";
import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

/**
 * Base Handlers Hook
 * Tạo các handler chuẩn cho CRUD operations
 */
interface UseBaseHandlersProps<TEntity, TCreateDto, TUpdateDto> {
  form: FormInstance;
  createMutation: UseMutationResult<TEntity, Error, TCreateDto, unknown>;
  updateMutation: UseMutationResult<
    TEntity,
    Error,
    { id: number; data: TUpdateDto },
    unknown
  >;
  deleteMutation: UseMutationResult<any, Error, number, unknown>;
  allDataQuery?: UseQueryResult<TEntity[], Error>;
  onSuccess?: () => void;
  successMessages?: {
    create?: string;
    update?: string;
    delete?: string;
  };
  errorMessages?: {
    create?: string;
    update?: string;
    delete?: string;
  };
}

export function useBaseHandlers<
  TEntity extends { id?: number },
  TCreateDto,
  TUpdateDto,
>({
  form,
  createMutation,
  updateMutation,
  deleteMutation,
  allDataQuery,
  onSuccess,
  successMessages = {
    create: "Tạo mới thành công!",
    update: "Cập nhật thành công!",
    delete: "Xóa thành công!",
  },
  errorMessages = {
    create: "Tạo mới thất bại!",
    update: "Cập nhật thất bại!",
    delete: "Xóa thất bại!",
  },
}: UseBaseHandlersProps<TEntity, TCreateDto, TUpdateDto>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<TEntity | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  /**
   * Filtered data based on search value
   */
  const filteredData = useMemo(() => {
    if (!searchValue || !allDataQuery?.data) {
      return allDataQuery?.data || [];
    }

    const lowerSearchValue = searchValue.toLowerCase().trim();

    return allDataQuery.data.filter((record) => {
      // Search across all fields of the record
      return Object.values(record).some((value) => {
        if (value === null || value === undefined) return false;

        // Convert value to string and search
        const stringValue = String(value).toLowerCase();
        return stringValue.includes(lowerSearchValue);
      });
    });
  }, [searchValue, allDataQuery?.data]);
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record: TEntity) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = async (record: TEntity) => {
    try {
      await deleteMutation.mutateAsync(record.id as number);
      message.success(successMessages.delete);
      onSuccess?.();
    } catch (error) {
      console.error("Delete error:", error);
      message.error(errorMessages.delete);
    }
  };
  const handleModalOk = async (values: TCreateDto) => {
    try {
      if (editingRecord) {
        await updateMutation.mutateAsync({
          id: editingRecord.id as number,
          data: values as unknown as TUpdateDto,
        });
        message.success(successMessages.update);
      } else {
        await createMutation.mutateAsync(values);
        message.success(successMessages.create);
      }
      setModalOpen(false);
      form.resetFields();
      setEditingRecord(null);
      onSuccess?.();
    } catch (error) {
      console.error("Save error:", error);
      message.error(
        editingRecord ? errorMessages.update : errorMessages.create,
      );
    }
  };

  const handleModalCancel = () => {
    setModalOpen(false);
    form.resetFields();
    setEditingRecord(null);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return {
    // State
    modalOpen,
    editingRecord,
    searchValue,
    filteredData,

    // Handlers
    handleAdd,
    handleEdit,
    handleDelete,
    handleModalOk,
    handleModalCancel,
    handleSearch,

    // Setters (for advanced usage)
    setModalOpen,
    setEditingRecord,
    setSearchValue,
  };
}

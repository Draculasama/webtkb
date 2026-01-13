import React, { useState } from 'react';
import { Form, Input } from 'antd';
import BasePageLayout from '../../../core/components/BasePageLayout';
import BaseFormModal from '../../../core/components/BaseFormModal';
import { useBaseHandlers } from '../../../core/hooks/useBaseHandlers';
import {
  useGetUserPage,
  useGetManyUser,
  useCreateUser,
  useUpdateUser,
  useRemoveUser,
  useFindUserByMa,
} from '../hooks/user.hooks';
import { User, CreateUserDto, UpdateUserDto } from '../types/user.types';
import { UserTable } from '../components/UserTable';
import { UserForm } from '../components/UserForm';
import { UserDetailModal } from '../components/UserDetailModal';

/**
 * User Page Component
 */
const UserPage: React.FC = () => {
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({ page: 1, size: 10 });
  const [selectedMa, setSelectedMa] = useState<string | null | undefined>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Hooks
  const { data, isLoading } = useGetUserPage(pagination);
  const detailQuery = useFindUserByMa(selectedMa || '', { enabled: !!selectedMa });
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();
  const deleteMutation = useRemoveUser();
  const allDataQuery = useGetManyUser();

  const handlers = useBaseHandlers<User, CreateUserDto, UpdateUserDto>({
    form,
    createMutation,
    updateMutation,
    deleteMutation,
    allDataQuery,
  });

  return (
    <BasePageLayout loading={isLoading}>
      <UserTable
        data={handlers.filteredData.length ? handlers.filteredData : data?.items || []}
        loading={isLoading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
          total: data?.total || 0,
        }}
        onPageChange={(p) => setPagination({ page: p.current, size: p.pageSize })}
        onAdd={handlers.handleAdd}
        onEdit={handlers.handleEdit}
        onDelete={handlers.handleDelete}
        onSearch={handlers.handleSearch}
        onRowClick={(r: User) => {
          setSelectedMa(r.ma);
          setDetailOpen(true);
        }}
      />

      <BaseFormModal
        open={handlers.modalOpen}
        form={form}
        onOk={handlers.handleModalOk}
        onCancel={handlers.handleModalCancel}
        mode={handlers.editingRecord ? "edit" : "create"}
      >
        <UserForm form={form} />
      </BaseFormModal>

      <UserDetailModal
        open={detailOpen}
        loading={detailQuery.isLoading}
        detail={detailQuery.data}
        onClose={() => {
          setDetailOpen(false);
          setSelectedMa(null);
        }}
      />
    </BasePageLayout>
  );
};

export default UserPage;

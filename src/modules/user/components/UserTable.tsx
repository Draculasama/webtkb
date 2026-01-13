// modules/user/components/UserTable.tsx
import type { ColumnsType } from 'antd/es/table';
import BaseDataTable from '../../../core/components/BaseDataTable';
import { User } from '../types/user.types';
import './css/UserTable.css';

interface UserTableProps {
  data: User[];
  loading: boolean;
  pagination: any;
  onPageChange: (p: any) => void;
  onAdd: () => void;
  onEdit: (r: User) => void;
  onDelete: (r: User) => void;
  onSearch: (v: string) => void;
  onRowClick: (r: User) => void;
}

export const UserTable = ({
  data,
  loading,
  pagination,
  onPageChange,
  onAdd,
  onEdit,
  onDelete,
  onSearch,
  onRowClick,
}: UserTableProps) => {
  const columns: ColumnsType<User> = [
    {
      title: 'Mã',
      dataIndex: 'ma',
      key: 'ma',
      width: 120,
      onCell: (record) => ({
        onClick: () => onRowClick(record),
        style: { cursor: 'pointer' },
      }),
    },
    // TODO: Add more columns here
  ];

  return (
    <BaseDataTable
      title="User"
      data={data}
      loading={loading}
      columns={columns}
      pagination={pagination}
      onPageChange={onPageChange}
      onAdd={onAdd}
      onEdit={onEdit}
      onDelete={onDelete}
      onSearch={onSearch}
      rowKey="id"
    />
  );
};

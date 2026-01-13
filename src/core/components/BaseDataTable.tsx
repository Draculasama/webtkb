import React from "react";
import { Table, Button, Space, Popconfirm, Input, TableProps } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";

const { Search } = Input;

interface BaseDataTableProps<T = any> {
  // Data
  data?: T[];
  loading?: boolean;
  pagination?: false | TablePaginationConfig;

  columns?: ColumnsType<T>;

  onAdd?: () => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  onSearch?: (value: string) => void;
  onRefresh?: () => void;
  onPageChange?: TableProps<T>["onChange"];
  onRowClick?: (record: T) => void;

  // Options
  showActions?: boolean;
  showAddButton?: boolean;
  showSearch?: boolean;
  rowKey?: string | ((record: T) => string);
  title?: string;
  extra?: React.ReactNode;
  filterButtons?: React.ReactNode;
  addButtonText?: string;

  // Custom
  customActions?: (record: T) => React.ReactNode;
  rowSelection?: TableProps<T>["rowSelection"];
  expandable?: TableProps<T>["expandable"];
}

function BaseDataTable<T extends Record<string, any>>({
  data = [],
  loading = false,
  pagination,

  columns = [],

  onAdd,
  onEdit,
  onDelete,
  onSearch,
  onPageChange,
  onRowClick,

  showActions = true,
  showAddButton = true,
  showSearch = true,
  rowKey = "id",
  title,
  extra,
  filterButtons,
  addButtonText,

  customActions,
  rowSelection,
  expandable,
}: BaseDataTableProps<T>) {
  // Thêm cột actions nếu cần
  const actionColumn: ColumnsType<T>[0] | null = showActions
    ? {
        title: "Thao tác",
        key: "actions",
        fixed: "right",
        width: 100,
        render: (_: any, record: T) => (
          <Space size="small">
            {customActions?.(record) || (
              <>
                {onEdit && (
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(record)}
                    size="small"
                    title="Sửa"
                  />
                )}
                {onDelete && (
                  <Popconfirm
                    title="Xác nhận xóa"
                    description="Bạn có chắc chắn muốn xóa?"
                    onConfirm={() => onDelete(record)}
                    okText="Xóa"
                    cancelText="Hủy"
                  >
                    <Button
                      type="link"
                      danger
                      icon={<DeleteOutlined />}
                      size="small"
                      title="Xóa"
                    />
                  </Popconfirm>
                )}
              </>
            )}
          </Space>
        ),
      }
    : null;

  const allColumns: ColumnsType<T> = actionColumn
    ? [...columns, actionColumn]
    : columns;

  return (
    <div className="base-data-table">
      {/* Header */}
      <div className="table-header" style={{ marginBottom: 16 }}>
        {/* Title */}
        <div style={{ marginBottom: 16 }}>
          {title && <h2 style={{ margin: 0 }}>{title}</h2>}
        </div>

        {/* Actions Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          {/* Left: Filter Buttons or Add Button */}
          <div>
            {filterButtons
              ? filterButtons
              : showAddButton &&
                onAdd && (
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={onAdd}
                  >
                    {addButtonText || "Thêm mới"}
                  </Button>
                )}
          </div>

          {/* Right: Search and Total */}
          <Space size="middle">
            {showSearch && onSearch && (
              <Search
                placeholder="Tìm kiếm..."
                onSearch={onSearch}
                style={{ width: 300 }}
                allowClear
                enterButton={<SearchOutlined />}
              />
            )}
            {extra}
            {pagination &&
              typeof pagination !== "boolean" &&
              pagination.total !== undefined && (
                <div
                  style={{
                    padding: "6px 16px",
                    background: "#f5f5f5",
                    border: "1px solid #d9d9d9",
                    borderRadius: 4,
                    fontSize: 14,
                    color: "#666",
                  }}
                >
                  Tổng: <strong>{pagination.total.toLocaleString()}</strong>
                </div>
              )}
          </Space>
        </div>
      </div>

      {/* Table */}
      <Table<T>
        rowKey={rowKey}
        columns={allColumns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={onPageChange}
        rowSelection={rowSelection}
        expandable={expandable}
        scroll={{ x: "max-content" }}
        onRow={(record) => ({
          onClick: () => {
            if (onRowClick) onRowClick(record);
          },
        })}
      />
    </div>
  );
}

export default BaseDataTable;

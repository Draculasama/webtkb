import React from "react";
import { Modal, Spin } from "antd";

/**
 * Base Detail Modal Component
 * Modal để hiển thị chi tiết dữ liệu
 */
interface BaseDetailModalProps<T> {
  // Modal props
  open?: boolean;
  title?: string;
  onClose?: () => void;

  // Data props
  loading?: boolean;
  detail?: T;

  // Options
  width?: number;
  centered?: boolean;

  // Render functions
  children?: React.ReactNode | ((detail: T) => React.ReactNode);
  emptyText?: string;

  [key: string]: any;
}

function BaseDetailModal<T = any>({
  open = false,
  title = "Chi tiết",
  onClose,

  // Data
  loading = false,
  detail,

  // Options
  width = 650,
  centered = true,

  // Custom
  children,
  emptyText = "Không tìm thấy dữ liệu",
  ...restProps
}: BaseDetailModalProps<T>) {
  const renderContent = () => {
    if (loading) {
      return (
        <div style={{ textAlign: "center", padding: 40 }}>
          <Spin size="large" />
        </div>
      );
    }

    if (!detail) {
      return (
        <div style={{ padding: 40, textAlign: "center" }}>{emptyText}</div>
      );
    }

    if (typeof children === "function") {
      return children(detail);
    }

    return children;
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      width={width}
      centered={centered}
      {...restProps}
    >
      {renderContent()}
    </Modal>
  );
}

export default BaseDetailModal;

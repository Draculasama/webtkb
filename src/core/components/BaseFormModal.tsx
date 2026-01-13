import React, { useEffect } from "react";
import { Modal, Form, FormInstance } from "antd";

/**
 * Base Form Modal Component
 * Modal với form để tạo/sửa dữ liệu
 */
interface BaseFormModalProps {
  // Modal props
  open?: boolean;
  title?: string;
  onCancel?: () => void;
  onOk?: (values: any, form: FormInstance) => void;

  form?: FormInstance;
  initialValues?: any;
  children?: React.ReactNode;

  loading?: boolean;

  mode?: "create" | "edit" | "view";
  width?: number;
  centered?: boolean;

  footer?: React.ReactNode;
  [key: string]: any;
}

const BaseFormModal: React.FC<BaseFormModalProps> = ({
  open = false,
  title = "",
  onCancel,
  onOk,
  form,
  initialValues,
  children,
  loading = false,
  mode = "create",
  width = 600,
  centered = true,
  footer,
  ...restProps
}) => {
  const [formInstance] = Form.useForm(form);

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialValues) {
        formInstance.setFieldsValue(initialValues);
      } else if (mode === "create") {
        formInstance.resetFields();
      }
    }
  }, [open, mode, initialValues, formInstance]);

  const handleOk = async () => {
    try {
      const values = await formInstance.validateFields();
      onOk?.(values, formInstance);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    formInstance.resetFields();
    onCancel?.();
  };

  const isViewMode = mode === "view";
  const modalTitle =
    mode === "create"
      ? `Thêm mới ${title}`
      : mode === "edit"
        ? `Chỉnh sửa ${title}`
        : `Chi tiết ${title}`;

  return (
    <Modal
      title={modalTitle}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      width={width}
      centered={centered}
      okText={mode === "create" ? "Tạo" : mode === "edit" ? "Cập nhật" : "Đóng"}
      cancelText="Hủy"
      footer={isViewMode ? null : footer}
      {...restProps}
    >
      <Form
        form={formInstance}
        layout="vertical"
        initialValues={initialValues}
        disabled={isViewMode}
      >
        {children}
      </Form>
    </Modal>
  );
};

export default BaseFormModal;

// modules/ai/components/AiForm.tsx
import { Form, Input, FormInstance, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import "./css/AiForm.css";

interface AiFormProps {
  form: FormInstance;
  onSubmit: (values: { text: string }) => void;
  loading?: boolean;
}

export const AiForm = ({ form, onSubmit, loading }: AiFormProps) => {
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Form.Item
        name="text"
        label="Đặt câu hỏi"
        rules={[{ required: true, message: "Vui lòng nhập câu hỏi!" }]}
      >
        <Input.TextArea
          placeholder="Ví dụ: Thống kê phiếu mượn sách, Thống kê tài liệu theo năm xuất bản..."
          rows={3}
          disabled={loading}
          onPressEnter={(e) => {
            if (e.ctrlKey || e.metaKey) {
              handleSubmit();
            }
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SendOutlined />}
          loading={loading}
          block
        >
          Gửi câu hỏi
        </Button>
      </Form.Item>
    </Form>
  );
};

// modules/user/components/UserForm.tsx
import { Form, Input, FormInstance } from 'antd';
import './css/UserForm.css';
interface UserFormProps {
  form: FormInstance;
}

export const UserForm = ({ form }: UserFormProps) => {
  return (
    <>
      <Form.Item
        label="Mã"
        name="ma"
        rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}
      >
        <Input placeholder="Nhập mã..." />
      </Form.Item>

      {/* TODO: Add more form fields here */}
    </>
  );
};

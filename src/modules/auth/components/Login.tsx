import React from "react";
import { Button, Checkbox, Form, Input, Card, Typography, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../hooks/auth.hooks";
import { LoginDto } from "../types/auth.types";
import "./Login.css";

const { Title } = Typography;
const { Content } = Layout;

export const Login = () => {
  const { useLogin } = useAuth();
  const mutation = useLogin();

  const onFinish = (values: LoginDto) => {
    mutation.mutate(values);
  };

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={2}>Đăng nhập</Title>
        
        </div>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Tên đăng nhập"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Mật khẩu"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ đăng nhập</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              loading={mutation.isPending}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

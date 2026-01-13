import React, { useState } from "react";
import { Form, message, Card } from "antd";
import { useThongKeAi } from "../hooks/ai.hooks";
import { AiForm } from "../components/AiForm";
import { AiTable } from "../components/AiTable";

/**
 * Ai Page Component
 */
const AiPage: React.FC = () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { mutateAsync: thongKeAi } = useThongKeAi();

  // Handle thống kê AI
  const handleThongKeAi = async (values: { text: string }) => {
    setLoading(true);
    try {
      const data = await thongKeAi({ text: values.text });
      setResult(data);
      message.success("Thống kê thành công!");
      form.resetFields();
    } catch (error: any) {
      message.error(error?.message || "Thống kê thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="AI Librarian - Trợ lý thư viện thông minh">
      <AiForm form={form} onSubmit={handleThongKeAi} loading={loading} />

      <AiTable result={result} loading={loading} />
    </Card>
  );
};

export default AiPage;

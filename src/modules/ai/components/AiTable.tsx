// modules/ai/components/AiTable.tsx
import { Table, Spin, Empty } from "antd";
import "./css/AiTable.css";

interface AiTableProps {
  result: any;
  loading?: boolean;
}

export const AiTable = ({ result, loading }: AiTableProps) => {
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <Spin size="large" tip="Đang xử lý câu hỏi..." />
      </div>
    );
  }

  if (!result || !result.columns || !result.rows) {
    return (
      <div style={{ marginTop: 24 }}>
        <Empty description="Chưa có dữ liệu. Vui lòng đặt câu hỏi để xem kết quả." />
      </div>
    );
  }

  // Tạo columns cho Ant Design Table
  const columns = result.columns.map((col: string, index: number) => ({
    title: col,
    dataIndex: `col${index}`,
    key: `col${index}`,
    ellipsis: true,
  }));

  // Tạo dataSource cho Ant Design Table
  const dataSource = result.rows.map((row: any[], rowIndex: number) => {
    const rowData: any = { key: rowIndex };
    row.forEach((cell: any, cellIndex: number) => {
      rowData[`col${cellIndex}`] = cell;
    });
    return rowData;
  });

  return (
    <div style={{ marginTop: 24 }}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} dòng`,
        }}
        scroll={{ x: "max-content" }}
        bordered
      />
    </div>
  );
};

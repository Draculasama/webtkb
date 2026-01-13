import React from "react";
import { Spin } from "antd";

/**
 * Base Page Layout Component
 * Layout chuẩn cho các trang module
 */
interface BasePageLayoutProps<T = any> {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  onRowClick?: (record: any) => void;
}

const BasePageLayout: React.FC<BasePageLayoutProps> = ({
  children,
  loading = false,
  className = "",
  onRowClick,
}) => {
  return (
    <div className={`base-page-layout ${className}`}>
      <Spin spinning={loading} size="large">
        <div
          style={{ padding: "24px", background: "#fff", minHeight: "100vh" }}
        >
          {children}
        </div>
      </Spin>
    </div>
  );
};

export default BasePageLayout;

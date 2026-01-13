import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  FolderOpenOutlined,
  BookOutlined,
  TagsOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  SolutionOutlined,
  SettingOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";

import { AdminHeader } from "../components/AdminHeader";

const { Content, Sider } = Layout;

// Custom scrollbar styles
const scrollbarStyles = `
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/admin">Trang chủ</Link>,
    },
    {
      key: "he-thong",
      icon: <SettingOutlined />,
      label: "Hệ thống",
      children: [
        {
          key: "user",
          icon: <UserOutlined />,
          label: <Link to="/admin/user">User</Link>,
        },
        {
          key: "ai",
          icon: <UserOutlined />,
          label: <Link to="/admin/ai">Ai</Link>,
        }],
    },
    ];

  return (
    <>
      <style>{scrollbarStyles}</style>
      <Layout
        style={{ minHeight: "100vh", maxHeight: "100vh", overflow: "hidden" }}
      >
        <AdminHeader
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
        />

        <Layout style={{ height: "calc(100vh - 64px)", overflow: "hidden" }}>
          <Sider
            width={240}
            style={{
              background: "#fff",
              height: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
            breakpoint="lg"
            collapsedWidth="80"
            collapsed={collapsed}
            onBreakpoint={(broken) => setCollapsed(broken)}
            onCollapse={(collapsed) => setCollapsed(collapsed)}
            trigger={null}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={menuItems}
            />
          </Sider>

          <Layout style={{ padding: "0", height: "100%", overflow: "hidden" }}>
            <Content
              style={{
                padding: "clamp(16px, 3vw, 24px)",
                margin: 0,
                minHeight: 280,
                background: "#fff",
                height: "100%",
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

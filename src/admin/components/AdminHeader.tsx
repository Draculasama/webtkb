import React from "react";
import { Layout, Button, Dropdown, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  BookOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../modules/auth/context/AuthContext";
import { useAuth } from "../../modules/auth/hooks/auth.hooks";
import type { MenuProps } from "antd";

const { Header } = Layout;

interface AdminHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  collapsed,
  onToggle,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  const { logout } = useAuth();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleClient = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
  };

  const userMenuItems: MenuProps["items"] = [
    {
      key: "user-info",
      label: (
        <div
          style={{
            padding: "8px 0",
            borderBottom: "1px solid #f0f0f0",
            marginBottom: "8px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Avatar
            src={user?.avatarUrl}
            icon={!user?.avatarUrl && <UserOutlined />}
            size={48}
            style={{ flexShrink: 0 }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontWeight: 600,
                color: "#16a085",
                fontSize: "14px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.hoTen || "User"}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#999",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.username || ""}
            </div>
          </div>
        </div>
      ),
      disabled: true,
    },

    {
      key: "client",
      icon: <BookOutlined />,
      label: "Trang khách",
      onClick: handleClient,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: onToggle,
            style: { fontSize: "18px", marginRight: "16px", cursor: "pointer" },
          },
        )}

        <h2
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          <DashboardOutlined style={{ fontSize: "22px" }} />
          <span>Dashboard</span>
        </h2>
      </div>

      {isAuthenticated ? (
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button
            type="primary"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              borderColor: "rgba(255, 255, 255, 0.3)",
              color: "#fff",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 16px",
              height: "auto",
            }}
          >
            <Avatar
              src={user?.avatarUrl}
              icon={!user?.avatarUrl && <UserOutlined />}
              size={32}
              style={{ flexShrink: 0 }}
            />
            <span>{user?.hoTen || user?.username}</span>
          </Button>
        </Dropdown>
      ) : (
        <Button
          type="primary"
          icon={<LoginOutlined />}
          onClick={handleLogin}
          style={{
            background: "rgba(255, 255, 255, 0.2)",
            borderColor: "rgba(255, 255, 255, 0.3)",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          Đăng nhập
        </Button>
      )}
    </Header>
  );
};

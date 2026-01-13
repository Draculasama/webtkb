import { Avatar, Tooltip } from "antd";
import { UserOutlined } from "@ant-design/icons";

interface UserAvatarProps {
  fullName?: string;
  username?: string;
  size?: "large" | "small" | "default" | number;
}

const stringToColor = (string: string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

export const UserAvatar = ({
  fullName,
  username,
  size = "default",
}: UserAvatarProps) => {
  const displayName = fullName || username || "U";

  const firstLetter = displayName.charAt(0).toUpperCase();

  const backgroundColor = stringToColor(displayName);

  return (
    <Tooltip title={displayName}>
      <Avatar
        size={size}
        style={{
          backgroundColor: backgroundColor,
          verticalAlign: "middle",
          cursor: "pointer",
          color: "#fff",
          fontWeight: 600,
        }}
      >
        {firstLetter}
      </Avatar>
    </Tooltip>
  );
};

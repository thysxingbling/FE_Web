import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { MailOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";

const MenuItem: React.FC = () => {
  return (
    <Menu
    >
      <Menu.Item key={1}>
        <Link to="/listFriends">
          <UserAddOutlined style={{ fontSize: "25px", color: "gray", margin: 10, marginLeft: 0 }} />
          Danh sách bạn bè
        </Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Link to="/listGroups">
          <TeamOutlined style={{ fontSize: "25px", color: "gray", margin: 10, marginLeft: 0 }} />
          Danh sách nhóm
        </Link>
      </Menu.Item>
      <Menu.Item key={3}>
        <Link to="/friendsRequest">
          <MailOutlined style={{ fontSize: "25px", color: "gray", margin: 10, marginLeft: 0 }} />
          Lời mời kết bạn
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuItem;

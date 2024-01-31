import React, { useState } from "react";
import {
  CheckSquareOutlined,
  CloudOutlined,
  ContactsOutlined,
  MessageOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const dashboard: MenuItem[] = [
  {
    icon: (
      <UserOutlined
        style={{ fontSize: "30px", color: "#fff", marginTop: 10 }}
      />
    ),
    key: "1",
  },

  {
    icon: <MessageOutlined style={{ fontSize: "30px", color: "#fff" }} />,
    key: "2",
  },
  {
    icon: <ContactsOutlined style={{ fontSize: "30px", color: "#fff" }} />,
    key: "3",
  },
  {
    icon: <CheckSquareOutlined style={{ fontSize: "30px", color: "#fff" }} />,
    key: "4",
  },

  {
    icon: <VideoCameraOutlined style={{ fontSize: "30px", color: "#fff" }} />,
    key: "5",
  },
  
];

const Siderbar: React.FC = () => {
 
  return (
    <div style={{ width: 100 , background: "#3a98ff",height:"1000px"}}>
      <div >
      <Menu 
      style={{background: "#3a98ff",justifyContent:"center"}}
      items={dashboard}>

      </Menu>
        
      </div>
      <div>

      </div>
   
    </div>
  );
};

export default Siderbar;

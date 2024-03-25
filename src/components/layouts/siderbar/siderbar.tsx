import React, { useEffect, useState } from "react";

import { Menu, Avatar } from "antd";
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
import { Link } from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import ModalInformation from "../../modals/ModalInformation";
import axios from "axios";

const Siderbar: React.FC = () => {
  const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      axios
        .get("http://localhost:8080/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user); 
        })
        .catch((error) => {
          console.error("Error getting user:", error);
        });
    }
  }, []);
  // logout
  // const handleLogout = () => {
  //   // Xóa token khỏi localStorage và state
  //   localStorage.removeItem("token");
  //   setToken(null);
  // };
  const openModalInfo = () => {
    setIsOpenModalInfo(true);
  };
  const handleOk = () => {
    setIsOpenModalInfo(false);
  };

  const handleCancel = () => {
    setIsOpenModalInfo(false);
  };
  return (
    <div
      style={{
        width: "100px",
        background: "#3a98ff",
        height: "750px",
        marginLeft: -8,
        marginTop: -30,
        position: "fixed",
      }}
    >
      <div>
      
        <Menu
          style={{
            background: "#3a98ff",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <SubMenu
            key="information"
            icon={
              <Avatar
                src={user ? user.avatar : ""}
                size={40}
                style={{ marginLeft: 8, marginTop: 1, marginBottom: 10 }}
              >
                {<UserOutlined style={{ fontSize: "30px", color: "#fff" }} />}
              </Avatar>
            }
          >
            <div>
              <h4>{user ? user.name : "Sai..."}</h4>
            </div>
            <hr />
            <Menu.Item
              key="hs"
              onClick={() => {
                openModalInfo();
              }}
            >
              Hồ sơ của bạn
            </Menu.Item>
            {/* modal */}
            <ModalInformation
              open={isOpenModalInfo}
              onCancel={handleCancel}
              onOk={handleOk}
              user={user}
            />
            <Menu.Item key="cd">Cài đặt</Menu.Item>
            {/* <Menu.Item key="dx" onClick={handleLogout}>Đăng xuất</Menu.Item> */}
            <Menu.Item key="dx">Đăng xuất</Menu.Item>
          </SubMenu>

          <Menu.Item key={2}>
            <Link to="/message">
              {" "}
              <MessageOutlined
                style={{
                  fontSize: "25px",
                  color: "#fff",
                  margin: 10,
                  marginTop: 10,
                }}
              />
            </Link>
          </Menu.Item>

          <Menu.Item key={3}>
            <Link to="/contact">
              <ContactsOutlined
                style={{ fontSize: "25px", color: "#fff", margin: 10 }}
              />
            </Link>
          </Menu.Item>
          <Menu.Item key={4}>
            <CheckSquareOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>
          <Menu.Item key={5}>
            <VideoCameraOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>

          <div style={{ height: 320 }}></div>

          <Menu.Item key={6}>
            <CloudOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>

          <Menu.Item key={7}>
            <ShopOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>
          <Menu.Item key={8}>
            <SettingOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>
        </Menu>
        
      </div>
    </div>
  );
};

export default Siderbar;

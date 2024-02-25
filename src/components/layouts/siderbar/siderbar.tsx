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
import { Menu, Avatar } from "antd";
import "./siderbar.css";
import { Link, Route, Routes } from "react-router-dom";
import MessagePage from "../../../pages/MessagePage/Message - page";
import ContactPage from "../../../pages/ContactPage/Contact - page";
const Siderbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="sidebar"
      style={{
        width: "100px",
        background: "#3a98ff",
        height: "1000px",
        marginLeft: -8,
        marginTop: -8,
        position: "fixed",
      }}
    >
      <div style={{ width: 100 }}>
        <Avatar
          size={40}
          style={{ marginLeft: 30, marginTop: 10, marginBottom: 10 }}
        >
          <UserOutlined style={{ fontSize: "30px", color: "#fff" }} />
        </Avatar>
      </div>
      <div>
        <Menu
          theme="dark"
          style={{ background: "#3a98ff", justifyContent: "center" }}
        >
          <Menu.Item key={2}>
            <Link to="/mess">
              {" "}
              <MessageOutlined
                style={{ fontSize: "25px", color: "#fff", margin: 10 }}
              />{" "}
            </Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <Link to="/contact">
              {" "}
              <ContactsOutlined
                style={{ fontSize: "25px", color: "#fff", margin: 10 }}
              />{" "}
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

          <Menu.Item key={6} onClick={() => showModal()}>
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
      <div>
        <Routes>
          {/* <Route path="/" element={<HomePage/>}/> */}
          <Route path="/mess" element={<MessagePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Siderbar;

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
import {
  Menu,
  Avatar,
  Modal,
  Col,
  Row,
  Flex,
  Radio,
  Space,
  DatePicker,
  Input,
} from "antd";

// type MenuItem = Required<MenuProps>["items"][number];

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
      style={{
        width: "100px",
        background: "#3a98ff",
        height: "700px",
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
          mode="inline"
        >
          <Menu.Item key={2}>
            <MessageOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>
          <Menu.Item key={3}>
            <ContactsOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
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

      {/* Modal cập nhật thông tin */}
      <Modal
        title="Cập nhật thông tin cá nhân"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Row>
            <Col span={24}>
              <p>Tên hiển thị</p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Flex vertical gap={12}>
                <Input placeholder="NguyenAn" />
              </Flex>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p style={{ fontWeight: "bold" }}>Thông tin cá nhân</p>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Radio.Group>
                <Radio value={1}>Nam</Radio>
                <Radio value={2}>Nữ</Radio>
              </Radio.Group>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <p>Ngày sinh</p>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Space direction="vertical">
                <DatePicker style={{ width: 470 }} />
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div style={{ height: 80 }}></div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default Siderbar;

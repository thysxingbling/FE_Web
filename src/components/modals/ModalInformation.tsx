import React, { useState } from "react";

import { Modal, Row, Col, Space, Button, Avatar, Upload } from "antd";
import { UserOutlined, UploadOutlined, EditOutlined } from "@ant-design/icons";
import ModalUpdateInfo from "./ModalUpdateInfo";
import axios from "axios";
interface ModalInformationProps {
  open: boolean;
  onCancel: () => void;
  onOk: () => void;
  user: any;
}

const ModalInformation: React.FC<ModalInformationProps> = ({
  open,
  onCancel,
  onOk,
  user,
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);

  const openModalUpdateInfo = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const handleOk = () => {
    setIsOpenModalUpdateInfo(false);
  };

  const handleCancel = () => {
    setIsOpenModalUpdateInfo(false);
  };

  const handleFileUpload = (file: File) => {
    const token = localStorage.getItem("token");
  
    const formData = new FormData();
    formData.append("file", file);
  
    axios.put("http://localhost:8000/auth/update", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
    
          setAvatarUrl(response.data.user.avatar);
          console.log(response.data.user.avatar);
      })
      .catch((error) => {
        console.error("Error uploading avatar:", error);
      });
  };

  return (
    <div>
      <Modal
        title="Thông tin tài khoản"
        open={open}
        onCancel={onCancel}
        onOk={onOk}
        visible={open}
      >
        <div>
          <div>
            <Row style={{ marginTop: 10 }}>
              <Col span={8}>
                <Space wrap size={16}>
                  <Avatar
                    size={150}
                    shape="square"
                    icon={<UserOutlined />}
                    src={avatarUrl || (user && user.avatar)}
                  />
                  <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleFileUpload(file);
                      return false;
                    }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#8c82f3",
                        color: "#fff",
                        fontWeight: 400,
                        marginLeft: 20,
                      }}
                      icon={<UploadOutlined />}
                    >
                      Upload
                    </Button>
                  </Upload>
                </Space>
              </Col>
            </Row>
          </div>
          <div>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              Thông tin cá nhân
            </p>
          </div>
          <div>
            <Row>
              <Col span={6}>Tên người dùng</Col>
              <Col span={6} style={{fontWeight:"bold"}}>{user ? user.name : ""}</Col>
              <Col span={6}>
              <Button type="link" onClick={openModalUpdateInfo} icon={<EditOutlined />}></Button>
              </Col>
            </Row>
           
            <Row>
              <Col span={6}>Điện thoại</Col>
              <Col span={18}>{user && user.phoneNumber ? user.phoneNumber : "Chưa lên"}</Col>
            </Row>
            <Row>
              <Col span={24}>
                <p>
                  Chỉ bạn bè lưu số của bạn trong danh bạ mới xem được máy này
                </p>
              </Col>
            </Row>
          </div>
          <div>
          </div>
        </div>
      </Modal>
      <div>
        <ModalUpdateInfo
          open={isOpenModalUpdateInfo}
          onCancel={handleOk}
          onOk={handleCancel}
          user={user}
        />
      </div>
    </div>
  );
};

export default ModalInformation;

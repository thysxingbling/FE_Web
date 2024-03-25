import React, { useState } from "react";

import { Modal, Row, Col, Space, Button, Avatar, Upload } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import ModalUpdateInfo from "./ModalUpdateInfo";
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
  // const [user, setUser] = useState<any>(null);

  const openModalUpdateInfo = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const handleOk = () => {
    setIsOpenModalUpdateInfo(false);
  };

  const handleCancel = () => {
    setIsOpenModalUpdateInfo(false);
  };

  const handleFileUpload = async (file: File) => {
    debugger;
    const token = localStorage.getItem("token");
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:8080/auth/update", {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        debugger;
        const data = await response.json();
        setAvatarUrl(data.user.avatar);
        console.log(data.user.avatar);
      } else {
        console.error("Failed to upload avatar");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  };

  return (
    <div>
      <Modal
        title="Thông tin tài khoản"
        open={open}
        onCancel={onCancel}
        onOk={onOk}
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
                    // src={user ? user.avatar : ""}
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
              <Col span={16}>
                <p style={{ fontWeight: "bold", fontSize: 18 }}>
                  {user ? user.name : ""}
                </p>
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
              <Col span={6}>Giới tính</Col>
              <Col span={18}>Nam</Col>
            </Row>
            <Row>
              <Col span={6}>Ngày sinh</Col>
              <Col span={18}>27 Tháng 12 , 2002</Col>
            </Row>
            <Row>
              <Col span={6}>Điện thoai</Col>
              <Col span={18}>{user ? user.phoneNumber : ""}</Col>
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
            <Button type="default" onClick={openModalUpdateInfo}>
              Cập nhật
            </Button>
          </div>
        </div>
      </Modal>
      <div>
        <ModalUpdateInfo
          open={isOpenModalUpdateInfo}
          onCancel={handleOk}
          onOk={handleCancel}
        />
      </div>
    </div>
  );
};

export default ModalInformation;

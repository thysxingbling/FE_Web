import React, { useState } from "react";

import { Modal, Image, Row, Col, Space, Button, Avatar, ModalProps } from "antd";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import ModalUpdateInfo from "./ModalUpdateInfo";

const ModalInformation:React.FC<ModalProps>= ({ open, onCancel, onOk }) => {
 

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
  return (
    <div>
      <Modal 
      title="Thông tin tài khoản" 
      open={open}
    //   visible={isOpen}
      
      onCancel={onCancel}
      onOk={onOk}
      >
        <div>
          <div>
            <p style={{ fontWeight: "bold", fontSize: "16px" }}>
              Thông tin cá nhân
            </p>
          </div>
          <div>
            <Image
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              width={400}
              height={200}
            ></Image>
          </div>
          <div>
            <Row style={{ marginTop: 10 }}>
              <Col span={6}>
                <Space wrap size={16}>
                  <Avatar size={64} icon={<UserOutlined />} />
                </Space>
              </Col>
              <Col span={18}>
                <p>
                  asuna{" "}
                  <Button onClick={openModalUpdateInfo}>
                    <EditOutlined />
                  </Button>
                </p>{" "}
              </Col>
            </Row>
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
              <Col span={18}>+84 789 224 335</Col>
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
            <Button type="default" onClick={openModalUpdateInfo}>Cập nhật</Button>
          </div>
        </div>
      </Modal>
      <div>
         <ModalUpdateInfo open={isOpenModalUpdateInfo} onCancel={handleOk} onOk={handleCancel}/>
      </div>
    </div>
  );
};

export default ModalInformation;

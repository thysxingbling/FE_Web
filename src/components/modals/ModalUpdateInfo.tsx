import {
  Modal,
  Col,
  Row,
  Flex,
  Input,
  ModalProps,
} from "antd";
import React from "react";

const ModalUpdateInfo:React.FC<ModalProps & { user: any }> =({open,onCancel,onOk,user} )=>{

  return (
      <Modal
      title="Cập nhật tên người dùng"
      open={open}
      onCancel={onCancel}
      onOk={onOk}
    >
      <div>
        <Row>
          <Col span={24}>
            <p>Tên người dùng</p>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Flex vertical gap={12}>
            {/* <Input placeholder={user && user.name ? user.name : "Nhập tên người dùng"} /> */}
              <Input placeholder="hí ae"></Input>
              {/* <Input placeholder="NguyenAn" >{user && user.phoneNumber ? user.phoneNumber : "Chưa lên"}</Input> */}
            </Flex>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}
export default ModalUpdateInfo;
import {
  Modal,
  Col,
  Row,
  Flex,
  Space,
  DatePicker,
  Input,
  ModalProps,
} from "antd";
import React from "react";

const ModalUpdateInfo:React.FC<ModalProps> =({open,onCancel,onOk} )=>{
  return (
      <Modal
      title="Cập nhật thông tin cá nhân"
      open={open}
      onCancel={onCancel}
      onOk={onOk}
     
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
            
          </Col>
        </Row>
        <Row>
          
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
  )
}
export default ModalUpdateInfo;
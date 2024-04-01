import { Modal, Col, Row, Flex, Input, ModalProps } from "antd";
import React, { useState } from "react";

const ModalUpdateInfo: React.FC<ModalProps & { user: any }> = ({
  open,
  onCancel,
  onOk,
  user,
}) => {
  const [newName, setNewName] = useState(user ? user.name : "");
  
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
            <Flex vertical gap={12}>
              <Col span={6}>Tên người dùng</Col>

              <Col span={18}>
                <Input
                  placeholder="Nhập tên của bạn"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Col>
            </Flex>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};
export default ModalUpdateInfo;

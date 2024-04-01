import { Modal, Col, Row, Flex, Input, ModalProps, message } from "antd";
import React, { useState } from "react";
import axios from "axios";

const ModalUpdateInfo: React.FC<ModalProps & { user: any }> = ({
  open,
  onCancel,
  onOk,
  user,
}) => {
  const [newName, setNewName] = useState(user ? user.name : "");
  const [token, setToken] = useState(""); 

  const handleUpdateName = async () => {
    try {
      debugger
      const response = await axios.put(
        "http://localhost:8000/auth/updateName",
        {
          name: newName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewName(response.data.user.name); 
      console.log(response.data.user.name);
      
      
      message.success(response.data.message); 
    } catch (error) {
      console.error("Error:", error);
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
    }
  };

  return (
    <Modal
      title="Cập nhật tên người dùng"
      visible={open}
      onCancel={onCancel}
      onOk={handleUpdateName}
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

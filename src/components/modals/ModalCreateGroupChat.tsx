import { CameraOutlined } from "@ant-design/icons";
import {
  Modal,
  Col,
  Row,
  Input,
  ModalProps,
  Avatar,
  Upload,
  List,
  message,
  Checkbox,
} from "antd";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IFriends } from "../models/friends";

const ModalCreateGroupChat: React.FC<ModalProps> = ({ open, onCancel }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friends, setFriends] = useState<IFriends[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatName, setChatName] = useState("");
  const [memberIds, setMemberIds] = useState([]);
  const [file, setFile] = useState<any>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getList = async () => {
      try {
        debugger;
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/friend/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data.friends);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getList();
  }, []);
  const handleSearch = (e: any) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`http://localhost:8000/friend/find/${phoneNumber}`, config)
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (data.friend) {
          setFriends([data.friend]);
          console.log([data.friend]);
        } else {
          message.info("Friend not found.");
        }
      })

      .catch((error) => {
        console.error("Error searching friend:", error);
        message.error("Failed to search for friend.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const CreateGroupChat = async () => {
    const data = {
      chatName: chatName,
      memberIds: memberIds,
    };

    if (file) {
      // data.image = file;
    }

    axios
      .post("http://localhost:8000/conversation/group", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Group chat created:", response.data);
        message.success("Group chat created successfully!");
      })

      .catch((error) => {
        console.error("Error creating group chat:", error);
        message.error("Failed to create group chat.");
      });
  };

  return (
    <Modal
      title="Tạo nhóm"
      visible={open}
      onCancel={onCancel}
      onOk={CreateGroupChat}
      cancelText="Hủy"
      okText="Tạo nhóm"
    >
      <div>
        <Row>
          <Col span={2}>
            <Avatar>
              <Upload>
                <CameraOutlined />
              </Upload>
            </Avatar>
          </Col>
          <Col span={22}>
            <Input placeholder="Nhập tên nhóm"></Input>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Input.Search
              value={phoneNumber}
              placeholder="Nhập số điện thoại"
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                marginTop: 10,
                borderRadius: 20,
              }}
              onSearch={(e) => {
                if (e == "") {
                  setFriends(null);
                } else {
                  setPhoneNumber(e);
                  handleSearch(e);
                }
              }}
              loading={loading}
              allowClear
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {friends !== null && (
              <List
                style={{
                  marginLeft: 0,
                }}
                itemLayout="horizontal"
                dataSource={friends}
                renderItem={(item) => (
                  <List.Item style={{ marginLeft: 40 }}>
                    <Checkbox />
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={item.name}
                    />
                  </List.Item>
                )}
              />
            )}
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default ModalCreateGroupChat;

import { CameraOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Modal,
  Col,
  Row,
  Input,
  ModalProps,
  Avatar,
  Upload,
  List,

  Radio,
  message,
} from "antd";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IFriends } from "../models/friends";



const ModalCreateGroupChat: React.FC<ModalProps> = ({
  open,
  onCancel,
  onOk,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friends, setFriends] = useState<IFriends[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/friend/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data.users);
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
  return (
    <Modal title="Tạo nhóm" visible={open} onCancel={onCancel} onOk={onOk} cancelText="Hủy" okText="Tạo nhóm">
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
              placeholder="Nhập tên , số điện thoại , danh sách số điện thoại"
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
                    <Radio/>
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

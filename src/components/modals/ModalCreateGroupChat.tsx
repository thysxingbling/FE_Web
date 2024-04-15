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
         ;
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
  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const uploadImage = {
    name: "file",
    multiple: true,
    customRequest: dummyRequest,
    accept: "image/png,image/gif,image/jpeg",
    onChange(info) {
      console.log(info);
      setFile(info.file);
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const CreateGroupChat = async () => {
    const formData = new FormData();
    formData.append("chatName", chatName);
    for(const item of memberIds){
       formData.append("memberIds", item);
    }
    console.log(formData);

    if (file) {
      formData.append("image", file.originFileObj);
    }
     ;
    axios
      .post("http://localhost:8000/conversation/group", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
         ;
        console.log("Group chat created:", response.data);
        message.success("Group chat created successfully!");
      
      })
      .catch((error) => {
         ;
        console.error("Error creating group chat:", error);
        message.error("Failed to create group chat.");
      });
  };

  const handleCheckboxChange = (itemId: string): void => {
    const updatedMemberIds: string[] = [...memberIds]; 

    if (memberIds.includes(itemId)) {
      const index = updatedMemberIds.indexOf(itemId);
      updatedMemberIds.splice(index, 1);
    } else {
   
      updatedMemberIds.push(itemId);
    }

    setMemberIds(updatedMemberIds);
  };
  const handleChatNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatName(event.target.value);
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
          <Upload {...uploadImage}>
          <Avatar
            style={{
              height: 30,
              width: 30,
              marginLeft: 5,
              backgroundColor: "gray",
              border: "none",
            }}
            // src={?.avatar}
          />
          </Upload>
          </Col>
          <Col span={22}>
            <Input value={chatName} onChange={handleChatNameChange} placeholder="Nhập tên nhóm"></Input>
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
                  <List.Item key={item._id} style={{ marginLeft: 40 }}>
                    <Checkbox
                      checked={memberIds.includes(item._id)}
                      onChange={() => handleCheckboxChange(item._id)}
                    />
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

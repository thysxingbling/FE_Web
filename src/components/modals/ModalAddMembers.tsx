import {
  Modal,
  Col,
  Row,
  Input,
//   ModalProps,
  Avatar,
  List,
  message,
  Checkbox,
} from "antd";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IFriends } from "../models/friends";
interface ModalConversation{
    conversationId:string;
    onCancel: () => void;
    open:boolean;
   
}

const ModalAddMembers: React.FC<ModalConversation> = ({ conversationId ,onCancel,open}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friends, setFriends] = useState<IFriends[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [memberIds, setMemberIds] = useState([]);
  // const [members, setMembers] = useState<Member[]>([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getList = async () => {
      try {
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

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios
      .get(`http://localhost:8000/friend/find/${phoneNumber}`, { headers })
      .then((response) => {
        const data = response.data;
        console.log(data);

        if (data.friend) {
          setFriends([data.friend]);
        //   console.log([data.friend]);
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

  const handleAddMember = (memberIds: string[]) => {
    
    axios
      .post(
        `http://localhost:8000/conversation/member/${conversationId}`,
        {
          newMemberIds: memberIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Members added:", response.data);
        message.success("Thành viên đã được thêm thành công.");
      })
      .catch((error) => {
        console.error("Error adding members:", error);
        message.error("Đã xảy ra lỗi khi thêm thành viên.");
      });
  };

  return (
    <Modal
      title="Thêm thành viên"
      visible={open}
      onCancel={onCancel}
      onOk={() => handleAddMember(memberIds)}
      cancelText="Hủy"
      okText="Thêm thành viên"
    >
      <div>
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

export default ModalAddMembers;

import {
  Modal,
  Col,
  Row,
  Input,
  Avatar,
  List,
  message,
  Checkbox,
  Button,
} from "antd";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { IFriends } from "../models/friends";
interface ModalConversation {
  // conversationId: string;
  messageId: string | null;
  onCancel: () => void;
  open: boolean;
}

const ModalShareData: React.FC<ModalConversation> = ({
  messageId,
  onCancel,
  open,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friends, setFriends] = useState<IFriends[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const token = localStorage.getItem("token");
  const [listConversationIds, setListConversationIds] = useState<string[]>([]);
  const handleCancelModalShare = () => {
    setMembers([]);
    onCancel?.();
  };
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/conversation", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const conversations = response.data.conversations;
      const listConversations: IFriends[] = conversations.map(
        (conversations: any) => {
          return {
            _id: conversations._id,
            userId: conversations.userId,
            avatar: conversations.avatar,
            name: conversations.name,
            lastMessage: conversations.lastMessage,
            type: conversations.type,
            conversationId: conversations.conversationId,
          };
        }
      );
      listConversations.map((member) => {
        if (
          member.type === "SINGLE" &&
          (member.conversationId === "" || member.conversationId == null)
        ) {
          axios
            .post(
              `http://localhost:8000/conversation/single/${member._id}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              member.conversationId = response.data.conversation.conversationId;
            });
        }
      });

      setFriends(listConversations);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
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
  const handleCheckboxChange = (item: any): void => {
    const updatedMembers: any[] = [...members];
    if (members.includes(item)) {
      const index = updatedMembers.indexOf(item);
      updatedMembers.splice(index, 1);
    } else {
      updatedMembers.push(item);
    }
    setMembers(updatedMembers);
  };
  const handleShareData = () => {
    try {
      debugger;
      const updateListConversatoionIds: any[] = [...listConversationIds];
      // members.forEach((member) => {
      //   if (member.type === "SINGLE") {
      //     axios
      //       .post(
      //         `http://localhost:8000/conversation/single/${member._id}`,
      //         {},
      //         {
      //           headers: {
      //             Authorization: `Bearer ${token}`,
      //           },
      //         }
      //       )
      //       .then((response) => {
      //         updateListConversatoionIds.push(
      //           response.data.conversation.conversationId
      //         );
      //       })
      //       .catch(() => {});
      //   } else if (member.type === "GROUP") {
      //     updateListConversatoionIds.push(member.conversationId);
      //   }
      // });

      setListConversationIds(updateListConversatoionIds);

      members.forEach((conserId) => {
        axios
          .post(
            `http://localhost:8000/message/${messageId}/share/${conserId.conversationId}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            message.success("Chia sẽ thành công.");
            handleCancelModalShare();
          })
          .catch((error) => {
            message.error("Đã xảy ra lỗi khi chia sẽ.",error);
          });
      });
    } catch (error) {
      console.error("Error fetching conversation IDs:", error);
    }
  };

  return (
    <Modal
      title="Chia sẻ"
      visible={open}
      onCancel={handleCancelModalShare}
      onOk={() => handleShareData()}
      cancelText="Hủy"
      okText="Chia sẻ"
    >
      <div>
        <Row>
          <Col span={24}>
            <Input.Search
              value={phoneNumber}
              placeholder="Tìm kiếm hội thoại cần chia sẻ"
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
                      checked={members.includes(item)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={item.name}
                    />
                    <Button />
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

export default ModalShareData;

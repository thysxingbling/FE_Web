import React, { useEffect, useState } from "react";
import { Avatar, Button, List, message } from "antd";
import axios from "axios";
import { IFriends } from "../../components/models/friends";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface ModalListFriends {
  users: IFriends[] | null;
}

const ListDataFriends: React.FC<ModalListFriends> = ({ users }) => {
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [currentUserId, setCurrentUserId] = useState("");
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleAddFriend = (_id: string) => {
    if (sentRequests.includes(_id)) {
      message.info("Lời mời đã được gửi.");
      return;
    }
    const config = {
      headers,
    };

    axios
      .post(`http://localhost:8000/friend/add/${_id}`, {}, config)
      .then((response) => {
        const data = response.data;
        console.log(data);

        message.success(data.message);
        setSentRequests([...sentRequests, _id]);
      })
      .catch((error) => {
        console.error("Error adding friend:", error);
        message.error("Failed to add friend.");
      });
  };
  const isSentRequest = (_id: string) => sentRequests.includes(_id);

  /////
  const createConversation = async (receiverId: string) => {
    const token = localStorage.getItem("token");
    console.log(token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (token) {
      try {
        debugger;
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        if (userId === receiverId) {
          return;
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("Token not found in localStorage");
    }

    axios
      .post(
        `http://localhost:8000/conversation/${receiverId}`,
        {},
        {
          headers,
        }
      )
      .then((response) => {
        const conversation = response.data.conversation._id;
        console.log("chưa ra", conversation);
        return conversation;
      })
      .catch((error) => {
        console.error("Error creating conversation:", error);
      });
  };

  return (
    users !== null && (
      <List
        style={{
          backgroundColor: "#ffffff",
          minHeight: 400,
          overflowY: "auto",
        }}
        itemLayout="horizontal"
        dataSource={users}
        renderItem={(item, index) => (
          <Link
            to={{
              pathname: `/message`,
              search: `?id=${item._id}`,
            }}
            onClick={async () => {
              try {
                const conversation = await createConversation(item._id);
                console.log("Conversation created:", conversation);
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            <List.Item
              style={{ height: 50 }}
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleAddFriend(item._id)}
                  disabled={isSentRequest(item._id)}
                  style={{
                    display: item.checkIsFriends ? "none" : "inline-block",
                  }}
                >
                  {isSentRequest(item._id) ? "Đã gửi lời mời" : "Kết bạn"}
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.name}
                description={item.message ? item.message : "No message"}
              />
            </List.Item>
          </Link>
        )}
      />
    )
  );
};
export default ListDataFriends;

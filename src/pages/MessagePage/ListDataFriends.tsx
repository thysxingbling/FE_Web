import React, { useEffect, useState } from "react";
import { Avatar, Button, List, message } from "antd";
import axios from "axios";
import { IFriends } from "../../components/models/friends";
import { Link } from "react-router-dom";
import MessagePage from "./Message - page";

interface ModalListFriends {
  users: IFriends[] | null;
}

const ListDataFriends: React.FC<ModalListFriends> = ({ users }) => {
  const [sentRequests, setSentRequests] = useState<string[]>([]);
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

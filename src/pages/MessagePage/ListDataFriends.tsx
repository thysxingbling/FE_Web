import React, { useState } from "react";
import { Avatar, Button, List, message } from "antd";
import axios from "axios";
import { IFriends } from "../../components/models/friends";
import { Link } from "react-router-dom";

interface ModalListFriends {
  users: IFriends[];
}

const ListDataFriends: React.FC<ModalListFriends> = ({users}) => {

  const [sentRequests, setSentRequests] = useState<string[]>([]);

  const handleAddFriend = (_id: string) => {
    if (sentRequests.includes(_id)) {
      message.info("Lời mời đã được gửi.");
      return;
    }
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`http://localhost:8080/friend/add/${_id}`, {}, config)
      .then((response) => {
        const data = response.data;
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
   
      <List
        style={{
          backgroundColor:'#ffffff',
          width:350,
          maxHeight:600,
          overflowY: "auto",
        
        }}
        itemLayout="horizontal"
        dataSource={users}
       
        renderItem={(item, index) => (
          <Link to="/message">
          <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleAddFriend(item._id)}
              disabled={isSentRequest(item._id)}
              style={{ display: item.checkIsFriends ? 'none' : 'inline-block' }}
              
            >
              {isSentRequest(item._id) ? "Đã gửi lời mời" : "Kết bạn"}
            </Button>,
     

          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={item.name}
            // title={item.chat}
          />
        </List.Item>
        </Link>
        )}
      />
  
  );
};

export default ListDataFriends;

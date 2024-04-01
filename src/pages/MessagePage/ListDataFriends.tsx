import React, { useEffect, useState } from "react";
import { Avatar, Button, List, message } from "antd";
import axios from "axios";
import { IFriends } from "../../components/models/friends";
import { Link } from "react-router-dom";

interface ModalListFriends {
  users: IFriends[];
}

const ListDataFriends: React.FC<ModalListFriends> = ({users}) => {

  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [conversations, setConversations] = useState([]);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const handleAddFriend = (_id: string) => {
    if (sentRequests.includes(_id)) {
      message.info("Lời mời đã được gửi.");
      return;
    } 
    const config = {
      headers
    };

    axios
      .post(`http://localhost:8000/friend/add/${_id}`, {}, config)
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


  // useEffect(() => {
  //   const getConversation = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/auth/conversations', { headers });
  //       setConversations(response.data.conversations);
  //     } catch (error) {
  //       console.error('Error fetching conversations:', error);
  //     }
  //   };
  
  //   getConversation();
  // }, []);
  
  return (
   
      <List
        style={{
          backgroundColor:'#ffffff',
          width:300,
          maxHeight:600,
          // overflowY: "auto",
          marginLeft:10
        
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
            description={item.content}
          />
        </List.Item>
        </Link>
        )}
      />
  
  );
};

export default ListDataFriends;

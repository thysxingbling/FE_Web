import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import ListDataFriends from "../../../pages/MessagePage/ListDataFriends";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { IFriends } from "../../models/friends";
import { useSocket } from "../../../Socket/SocketContext";
import { jwtDecode } from "jwt-decode";


const Search: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friends, setFriends] = useState<IFriends[] | null>(null);
  const [originalFriends, setOriginalFriends] = useState<IFriends[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { socket } = useSocket();

  const token = localStorage.getItem("token");
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    if (token) {
      const decodedToken: any = jwtDecode(token);
      setCurrentUserId(decodedToken.userId);
    }
  }, [token]);

  const fetchConversations = useCallback(async () => {
    setLoading(true);
    setError(null);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    axios.get("http://localhost:8000/conversation/", config)
      .then((response) => {
        
        const conversations = response.data.conversations;
        if (!conversations) {
          throw new Error("Danh sách cuộc trò chuyện không tồn tại.");
        }
        const listConversations: IFriends[] = conversations.map((conversation: any) => ({
          _id: conversation._id,
          userId: conversation.userId,
          avatar: conversation.avatar,
          name: conversation.name,
          lastMessage: conversation.lastMessage,
          type: conversation.type,
          conversationId: conversation.conversationId,
        }));
  
        setFriends(listConversations);
        setOriginalFriends(listConversations);
  
        if (socket) {
          const conversationIds = listConversations.map((conversation: any) => conversation.conversationId);
          socket.emit("join-conversations", conversationIds);
          socket.emit("join", currentUserId);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
        setError(error.message || "Không thể tải danh sách cuộc trò chuyện");
        setLoading(false);
      });
  }, [socket, token, currentUserId]);
  
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (socket) {
      socket.on("create-group-conversation", (data)=>{
        if(data.action === "create" && data.group.member._id.toString() === currentUserId.toString()){
          fetchConversations();
        }
      });
    }
  }, [socket,fetchConversations]);

 
  const handleSearch = (e: string) => {
    if (e === "") {
      setFriends(originalFriends);
      setLoading(false);
      return;
    }

    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:8000/friend/find/${phoneNumber}`, config)
      .then((response) => {
        const data = response.data;
        if (data.friend) {
          setFriends([data.friend]);
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
    <div
      style={{
        flexDirection: "row",
        height: 70,
        marginLeft: 100,
        marginTop: 0,
        position: "fixed",
        borderRight: "0.5px solid #ededee",
      }}
    >
      <Input.Search
        value={phoneNumber}
        placeholder="Tìm kiếm"
        onSearch={(e) => handleSearch(e)}
        allowClear
        loading={loading}
        style={{ width: 200, color: "red", marginLeft: 10, marginTop: 10 }}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />

      <UserAddOutlined
        style={{
          marginTop: "10px",
          marginLeft: 5,
          width: 30,
          height: 30,
          color: "gray",
        }}
      />
      <UsergroupAddOutlined style={{ width: 40, height: 50, color: "gray" }} />
      <ListDataFriends users={friends || []} />
    </div>
  );
};

export default Search;

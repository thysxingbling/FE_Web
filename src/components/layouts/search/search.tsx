import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import ListDataFriends from "../../../pages/MessagePage/ListDataFriends";
import { useEffect, useState } from "react";
import axios from "axios";
import { IFriends } from "../../models/friends";

const Search: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friends, setFriends] = useState<IFriends[] | null>(null);
  const [originalFriends, setOriginalFriends] = useState<IFriends[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const getList = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get("http://localhost:8000/friend/list", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setFriends(response.data.users);
  //       setOriginalFriends(response.data.users);
  //       // console.log(response.data.users);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   getList();
  // }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:8000/conversation/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const conversations = response.data.conversations;
        if (!conversations) {
          throw new Error("Danh sách cuộc trò chuyện không tồn tại.");
        }
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
        setFriends(listConversations);
        setOriginalFriends(listConversations);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching conversations:", error);
        setError(error.message || "Không thể tải danh sách cuộc trò chuyện");
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: any) => {
    if (e == "") {
      setFriends(originalFriends);
      setLoading(false);
      return;
    }
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
        // onSearch={handleSearch}
        onSearch={(e) => {
          handleSearch(e);
        }}
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
      <ListDataFriends users={friends ? friends : []} />
    </div>
  );
};

export default Search;

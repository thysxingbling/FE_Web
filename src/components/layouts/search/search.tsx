import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import ListDataFriends from "../../../pages/MessagePage/ListDataFriends";
import { useState } from "react";
import axios from "axios";

const Search: React.FC = () => {
  // const data = [
  //   {
  //     userName: "Nguyễn Ngọc Tuấn",
  //     chat: "Bạn : Hello",
  //   },

  //   {
  //     userName: "Nguyễn Ngọc Chính",
  //     chat: "Bạn : Hello",
  //   },
  // ];
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    debugger
    setLoading(true);
    const token = localStorage.getItem("token"); 
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };
    axios
      .get(`http://localhost:8080/friend/find/${phoneNumber}`, config)
      .then((response) => {
        const data = response.data;
        console.log(data);
        
        if (data.friend) {
          setFriend(data.friend);
          console.log(data.friend);
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
        onSearch={handleSearch}
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
      <ListDataFriends users={friend ? [friend] : []} />
    </div>
  );
};

export default Search;

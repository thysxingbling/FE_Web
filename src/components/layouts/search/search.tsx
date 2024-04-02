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
  useEffect(() => {
    const getList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/friend/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data.users);   
        setOriginalFriends(response.data.users);
        // console.log(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getList();
  }, []);

  const handleSearch = (e: any) => {
    if (e == "") {
      // If search input is empty, revert to original list of friends
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

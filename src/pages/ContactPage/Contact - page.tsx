import Component from "../../components/layouts/components/components";
import { Col, Input, Row, message } from "antd";
import MenuItem from "./Menu";
import Siderbar from "../../components/layouts/siderbar/siderbar";
import Search from "../../components/layouts/search/search";
import { useState } from "react";
import { IFriends } from "../../components/models/friends";
import axios from "axios";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import ListDataFriends from "../MessagePage/ListDataFriends";

const ContactPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friends, setFriends] = useState<IFriends[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: any) => {
    setLoading(true);
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`http://localhost:8000/friend/find/${e}`, config)
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
    <Row>
      <Col span={1} style={{ position: "fixed" }}>
        <Siderbar />
      </Col>
      <Col
        style={{
          flexDirection: "row",
          height: 70,
          marginLeft: 100,
          marginTop: 0,
          position: "fixed",
          borderRight: "0.5px solid #ededee",
        }}
        span={7}
      > 
        <Input.Search
          value={phoneNumber}
          placeholder="Tìm kiếm"
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
          style={{ width: 200, color: "red", marginLeft: 10, marginTop: 10 }}
          onChange={(e) => {
            // if (e.target.value == null) {
            // }
            setPhoneNumber(e.target.value);
          }}
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
        <UsergroupAddOutlined
          style={{ width: 40, height: 50, color: "gray" }}
        />
        {friends ? <ListDataFriends users={friends} /> : <MenuItem />}
      </Col>
    </Row>
  );
};
export default ContactPage;

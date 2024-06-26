import React, { useState } from "react";
import { Avatar, Layout, List, Row, Col, Input, message } from "antd";

import { Content, Header } from "antd/es/layout/layout";

import MenuItem from "./Menu";
import Siderbar from "../../components/layouts/siderbar/siderbar";
import Search from "../../components/layouts/search/search";
import { IFriends } from "../../components/models/friends";
import axios from "axios";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import ListDataFriends from "../MessagePage/ListDataFriends";
// const {Search} = Input ;
const ListGroups: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friends, setFriends] = useState<IFriends[] | null>(null);
  const [friendSearchs, setFriendSearchs] = useState<IFriends[] | null>(null);
  const [loading, setLoading] = useState(false);

  // const handleSearch = (e: any) => {
  //   setLoading(true);
  //   const token = localStorage.getItem("token");

  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };
  //   axios
  //     .get(`http://localhost:8000/friend/find/${e}`, config)
  //     .then((response) => {
  //       const data = response.data;
  //       console.log(data);

  //       if (data.friend) {
  //         setFriendSearchs([data.friend]);
  //         console.log([data.friend]);
  //       } else {
  //         message.info("Friend not found.");
  //       }
  //     })

  //     .catch((error) => {
  //       console.error("Error searching friend:", error);
  //       message.error("Failed to search for friend.");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  return (
    <Row>
      <Col span={1} style={{ position: "fixed" }}>
        <Siderbar />
        <Search />
      </Col>
      <Col span={7}>
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
            onSearch={(e) => {
              if (e == "") {
                setFriendSearchs(null);
              } else {
                setPhoneNumber(e);
                // handleSearch(e);
              }
            }}
            loading={loading}
            allowClear
            style={{ width: 200, color: "red", marginLeft: 10, marginTop: 10 }}
            onChange={(e) => {
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
          {friendSearchs ? (
            <ListDataFriends users={friendSearchs} />
          ) : (
            <MenuItem />
          )}
        </div>
      </Col>
      <Col span={16}>
        <Layout
          style={{
            marginLeft: -50,
            width: 1130,
            display: "flex",
            position: "fixed",
            marginTop: -10,
          }}
        >
          <Header
            style={{
              backgroundColor: "#ffff",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <p
              style={{
                color: "black",
                fontFamily: "Time new Roman",
                marginTop: 10,
                marginLeft: 10,
                fontSize: 25,
                fontWeight: "bold",
              }}
            >
              Danh sách nhóm
            </p>
          </Header>
          <Content
            style={{ backgroundColor: "white", height: 640, padding: 20 }}
          >
            <Content>
              <List
                style={{
                  backgroundColor: "#ffffff",
                  width: 1130,

                  marginLeft: 0,
                }}
                itemLayout="horizontal"
                // dataSource={data}
                renderItem={(item, index) => (
                  <List.Item style={{ marginLeft: 40 }}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                        />
                      }
                      // title={item.userName}
                    />
                  </List.Item>
                )}
              ></List>
            </Content>
          </Content>
        </Layout>
      </Col>
    </Row>
  );
};

export default ListGroups;

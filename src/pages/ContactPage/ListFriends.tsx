import React, { useEffect, useState } from "react";
import { Avatar, Layout, List, Row, Col, Menu , Input , Select  } from "antd";

import { MailOutlined, UserAddOutlined, TeamOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import Component from "../../components/layouts/components/components";
import axios from "axios";
const {Search} = Input ;

const ListFriends: React.FC = () => {
   const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/friend/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getList();
  }, []);
  return (
    <Row>
      <Col span={1} style={{ position: "fixed" }}>
        <Component />
      </Col>
      <Col span={7}>
        <Menu
          style={{
            justifyContent: "center",
            marginTop: 50,
            width: 294,
            marginLeft: 100,

            position: "fixed",

            height: 300,
          }}
        >
          <Menu.Item key={1}>
            <Link to="/listFriends">
              <UserAddOutlined
                style={{
                  fontSize: "25px",
                  color: "gray",
                  margin: 10,
                  marginLeft: 0,
                }}
              />
              Danh sách bạn bè
            </Link>
          </Menu.Item>
          <Menu.Item key={2}>
           <Link to="/listGroups">
           
           {" "}
            <TeamOutlined
              style={{
                fontSize: "25px",
                color: "gray",
                margin: 10,
                marginLeft: 0,
              }}
            />
            Danh sách nhóm
           </Link>
          </Menu.Item>

          <Menu.Item key={3}>
            {" "}
            <MailOutlined
              style={{
                fontSize: "25px",
                color: "gray",
                margin: 10,
                marginLeft: 0,
              }}
            />
            Lời mời kết bạn
          </Menu.Item>
        </Menu>
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
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <UserAddOutlined
              style={{ fontSize: "25px", color: "gray", marginLeft: -40 }}
            />
            <p
              style={{
                color: "gray",
                fontFamily: "Time new Roman",
                marginTop: 0,
                marginLeft: 10,
                fontSize: 16,
              }}
            >
              Danh sách bạn bè{" "}
            </p>
          </Header>
          <Content style={{ backgroundColor: "gray", height: 640 }}>
            <Layout style={{ maxHeight: 640, overflowY: "auto",position:'fixed' }}>
              <Header style={{ backgroundColor: "#ffffff" }}>Bạn bè</Header>
              <Content>
                <Header
                  style={{
                    backgroundColor: "#ffffff",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* chen  */}
                  <Search placeholder="Tìm bạn" style={{width:400}}/>
                  <Select placeholder="Tên(A->Z)" style={{width:300, marginLeft:20}}/>
                  <Select placeholder="Tên(Z->A)" style={{width:300, marginLeft:20}}/>
                </Header>
                <Content>
                  <List
              itemLayout="horizontal"
              dataSource={friends}
              renderItem={(friend: any) => (
                <List.Item>
                  <List.Item.Meta
                    title={friend.name}
                    avatar={<Avatar src={friend.avatar} />}
                  />
                </List.Item>
              )}
            />
                </Content>
              </Content>
            </Layout>
            
          </Content>
        </Layout>
      </Col>
    </Row>
  );
};

export default ListFriends;
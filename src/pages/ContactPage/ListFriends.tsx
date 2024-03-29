import React, { useEffect, useState } from "react";
import { Avatar, Layout, List, Row, Col, Menu, Input, Select } from "antd";

import { MailOutlined, UserAddOutlined, TeamOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import Component from "../../components/layouts/components/components";
import axios from "axios";
import { IFriends } from "../../components/models/friends";
const { Search } = Input;
const ListFriends: React.FC = () => {

  const [friends, setFriends] = useState<IFriends[]>([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/friend/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data.users);
        // console.log(response.data.users);
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
          <Link to="/friendsRequest">
            <MailOutlined
              style={{
                fontSize: "25px",
                color: "gray",
                margin: 10,
                marginLeft: 0,
              }}
            />
            Lời mời kết bạn
            </Link>
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
            <p
              style={{
                color: "black",
                fontFamily: "Time new Roman",
                marginTop: 10,
                marginLeft: 10,
                fontSize: 25,
               fontWeight:"bold",
               
              }}
            >
              Danh sách bạn bè
            </p>
          </Header>
          <Content style={{ backgroundColor: "white", height: 640,padding:20 }}>
            
                <Content>
                  <List
                    style={{
                      backgroundColor: "#ffff",
                      width: 1130,
                      marginLeft: 0,
                    }}
                    itemLayout="horizontal"
                    dataSource={friends}
                    renderItem={(
                      item 
                    ) => (
                      <List.Item style={{ marginLeft: 40 }}>
                        <List.Item.Meta
                          avatar={<Avatar src={item.avatar} />} 
                          title={item.name} 
                        />
                      </List.Item>
                    )}
                  />
                </Content>
              
        
          </Content>
        </Layout>
      </Col>
    </Row>
  );
};

export default ListFriends;

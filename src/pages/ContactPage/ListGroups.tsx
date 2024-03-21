import React from "react";
import { Avatar, Layout, List, Row, Col, Menu , Input , Select  } from "antd";

import { MailOutlined, UserAddOutlined, TeamOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import Component from "../../components/layouts/components/components";
const {Search} = Input ;
const ListGroups: React.FC = () => {
  const data = [
    {
      userName: "Nguyễn Ngọc Tuấn",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Ánh",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Chính",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Tuấn",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Ánh",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Chính",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Tuấn",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Ánh",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Chính",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Tuấn",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Ánh",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Chính",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Tuấn",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Ánh",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Chính",
      chat: "Bạn : Hello",
    },
  ];
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
            <UsergroupAddOutlined
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
              Danh sách nhóm{" "}
            </p>
          </Header>
          <Content style={{ backgroundColor: "gray", height: 640 }}>
            <Layout style={{ maxHeight: 640, overflowY: "auto",position:'fixed' }}>
              <Header style={{ backgroundColor: "#ffffff" }}>Nhóm</Header>
              <Content>
                <Header
                  style={{
                    backgroundColor: "#ffffff",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  {/* chen  */}
                  <Search placeholder="Tìm kiếm..." style={{width:400}}/>
                  <Select placeholder="Hoạt động (Mới -> Cũ)" style={{width:300, marginLeft:20}}> 
                       <Select value="option1">
                            Hoat động Mới - Cũ
                       </Select>
                       <Select value="option2">
                            Hoat động Cũ - Mới
                       </Select>
                  </Select>
                  <Select placeholder="Tất cả" style={{width:300, marginLeft:20}}/>
                </Header>
                <Content>
                  <List
                    style={{
                      backgroundColor: "#ffffff",
                      width: 1130,
                      
                      marginLeft:0
                    }}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                      <List.Item style={{marginLeft:40}}>
                        <List.Item.Meta
                          avatar={
                            <Avatar
                              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                            />
                          }
                          title={item.userName}
                        />
                      </List.Item>
                    )}
                  ></List>
                </Content>
              </Content>
            </Layout>
            
          </Content>
        </Layout>
      </Col>
    </Row>
  );
};

export default ListGroups;

import { MailOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Layout, List, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";

import Component from "../../components/layouts/components/components";
import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import ListFriends from "./ListFriends";

const ContactPage: React.FC = () => {
  const [token, setToken] = useState("");
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getList = async () => {

      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjAzODQ0OTI5MjAiLCJ1c2VySWQiOiI2NWY5YTM3ZmVmNDdkMmNiNWIwNmIwM2QiLCJpYXQiOjE3MTA4NjM5MTcsImV4cCI6MTcxMDkwNzExN30.nxU-jJiPrI3MRVdOiH50CYrCSOjrqWY2eqfkJ3BQqho";
        // Gửi yêu cầu API với token được đặt
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
            <UserAddOutlined
              style={{
                fontSize: "25px",
                color: "gray",
                margin: 10,
                marginLeft: 0,
              }}
            />
            Danh sách bạn bè
          </Menu.Item>
          <Menu.Item key={2}>
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
          <Content style={{ backgroundColor: "#fffff", height: 640 }}>
            {/* <List
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
            /> */}
            <ListFriends/>
          </Content>
        </Layout>
      </Col>
    </Row>
  );
};
export default ContactPage;

import { MailOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { Avatar, Layout, List, Menu } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import Component from "../../components/layouts/components/components";
import { Col, Row } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const ContactPage: React.FC = () => {
  const [token, setToken] = useState("");
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getList = async () => {
      debugger;
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IjAzMjYzOTI0MzgiLCJ1c2VySWQiOiI2NWYyNzBkZWY0NTkzY2Y1MGMyOTIzNTAiLCJpYXQiOjE3MTA0MzU2NzMsImV4cCI6MTcxMDQzOTI3M30.I8TI8jrNLiBcoJ4HRi5kjsk8YS92G0q3bKAVMxigTbE";
        // Gửi yêu cầu API với token được đặt
        const response = await axios.get("http://localhost:8080/friend/list", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFriends(response.data);
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
          <Content style={{ backgroundColor: "gray", height: 640 }}>
            <List
              itemLayout="horizontal"
              dataSource={friends}
              renderItem={(friend: any) => (
                <List.Item>
                  <List.Item.Meta
                    title={
                      <Link to={`/profile/${friend._id}`}>{friend.name}</Link>
                    }
                    avatar={<Avatar src={friend.avatar} />}
                  />
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </Col>
    </Row>
  );
};
export default ContactPage;

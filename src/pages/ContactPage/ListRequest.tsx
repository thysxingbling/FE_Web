import React, { useEffect, useState } from "react";
import { Button, Card, Col, Layout, List, Menu, Row, Space } from "antd";
import axios from "axios";
import Component from "../../components/layouts/components/components";
import { Link } from "react-router-dom";
import { MailOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";

interface Recipient {
  _id: string;
  reciverId: string;
  // reciverName:string;
  senderName: string;
}
const ListRequest: React.FC = ({}) => {
  const [requests, setRequests] = useState<Recipient[]>([]);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const getaddFriendsReqs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/friend/list/req",
          {
            headers,
          }
        );
        const { data } = response;
        setRequests(data.addFriendReqs);
        console.log();
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    getaddFriendsReqs();
  }, []);
  // const handleAccept = async (addFriendReqId: string) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8080/friend/status/${addFriendReqId}`,
  //       {
  //         status: true,
  //       },
  //       { headers }
  //     );
  //   } catch (error) {
  //     console.error("Error accepting friend request:", error);
  //   }
  // };

  // const handleReject = async (addFriendReqId: string) => {
  //   try {
  //     await axios.put(
  //       `http://localhost:8080/friend/status/${addFriendReqId}`,
  //       {
  //         status: false,
  //       },
  //       { headers }
  //     );
  //   } catch (error) {
  //     console.error("Error rejecting friend request:", error);
  //   }
  // };
  const handleFriendRequest = async (
    addFriendReqId: string,
    status: boolean
  ) => {
    try {
      await axios.put(
        `http://localhost:8080/friend/status/${addFriendReqId}`,
        {
          status: status,
        },
        { headers }
      );
    } catch (error) {
      console.error(
        `Error ${status ? "accepting" : "rejecting"} friend request:`,
        error
      );
    }
  };
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
              Lời mời kết bạn
            </p>
          </Header>

          <Content
            style={{ backgroundColor: "white", height: 600, padding: 20 }}
          >
            <Content>
              <div>
                {requests.map((request) => (
                  <Card
                    key={request._id}
                    style={{ width: 500, marginBottom: 15 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>{request.senderName} muốn kết bạn với bạn</p>
                      <Button
                        type="primary"
                        onClick={() => handleFriendRequest(request._id, true)}
                      >
                        Đồng ý
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleFriendRequest(request._id, false)}
                      >
                        Từ chối
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Content>
          </Content>
        </Layout>
      </Col>
    </Row>
  );
};

export default ListRequest;

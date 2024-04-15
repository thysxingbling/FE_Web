import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Input, Layout, Row, message } from "antd";
import axios from "axios";
import Component from "../../components/layouts/components/components";
import { Content, Header } from "antd/es/layout/layout";
import MenuItem from "./Menu";
import { IFriends } from "../../components/models/friends";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import ListDataFriends from "../MessagePage/ListDataFriends";

interface Recipient {
  _id:string;
  reciverId: string;
  sender:{
    name: string;
    avatar:string;
    // _id: string;
  }

}
const ListRequest: React.FC = ({}) => {
  const [requests, setRequests] = useState<Recipient[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [friendSearchs, setFriendSearchs] = useState<IFriends[] | null>(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const getaddFriendsReqs = async () => {
      debugger
      try {
        const response = await axios.get(
          "http://localhost:8000/friend/list/req",
          {
            headers,
          }
        );
        const { data } = response;
                console.log(data);
        
        setRequests(data.addFriendReqs);
        console.log(data.addFriendReqs);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };

    getaddFriendsReqs();
  }, []);

  const handleFriendRequest = async (
    addFriendReqId: string,
    status: boolean
  ) => {
    try {
      
      await axios.put(
        `http://localhost:8000/friend/status/${addFriendReqId}`,
        {
          status: status,
        },
        { headers }
      ).then(response => {
        console.log("Friend request status updated:", response.data);
      });
    } catch (error) {
      console.error(
        `Error ${status ? "accepting" : "rejecting"} friend request:`,
        error
      );
    }
  };
  
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
        // console.log(data);

        if (data.friend) {
          setFriendSearchs([data.friend]);
          // console.log([data.friend]);
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
        <Component />
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
                handleSearch(e);
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
                      <Avatar src={request.sender.avatar} />
                      <p >{request.sender.name} muốn kết bạn với bạn</p>
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

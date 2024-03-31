import React, { useEffect, useState } from "react";
import { Avatar, Layout, List, Row, Col, Input } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Component from "../../components/layouts/components/components";
import axios from "axios";
import { IFriends } from "../../components/models/friends";
import MenuItem from "./Menu";
import Siderbar from "../../components/layouts/siderbar/siderbar";
import Search from "../../components/layouts/search/search";
// const { Search } = Input;
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getList();
  }, []);
  return (
    <Row>
      <Col span={1} style={{ position: "fixed" }}>
      <Siderbar/>
       <Search/>
      </Col> 
       <Col span={7}>
        <MenuItem/>
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


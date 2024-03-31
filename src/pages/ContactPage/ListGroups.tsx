import React from "react";
import { Avatar, Layout, List, Row, Col,Input} from "antd";

import { Content, Header } from "antd/es/layout/layout";
import Component from "../../components/layouts/components/components";
import MenuItem from "./Menu";
import Siderbar from "../../components/layouts/siderbar/siderbar";
import Search from "../../components/layouts/search/search";
// const {Search} = Input ;
const ListGroups: React.FC = () => {
  const data = [
   
    {
      userName: "Nguyễn Ngọc Chính",
      chat: "Bạn : Hello",
    },
    {
      userName: "Nguyễn Ngọc Tuấn",
      chat: "Bạn : Hello",
    },
    
    {
      userName: "Nguyễn Ngọc Tuấn",
      chat: "Bạn : Hello",
    },
   
  ];
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
               fontWeight:"bold",
               
              }}
            >
              Danh sách nhóm
            </p>
          </Header>
          <Content style={{ backgroundColor: "white", height: 640 ,padding:20 }}>
         
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
      </Col>
    </Row>
  );
};

export default ListGroups;

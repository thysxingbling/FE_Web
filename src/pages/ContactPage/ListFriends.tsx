import React, { useEffect, useState } from "react";
import { Avatar, Layout, List } from "antd";

import { Content, Header } from "antd/es/layout/layout";
import axios from "axios";

const ListFriends: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await axios.get("http://localhost:8080/list");
        setData(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getList();
  }, []);

  return (
    <Layout style={{ maxHeight: 640, overflowY: "auto", width: 1130 }}>
      <Header style={{ backgroundColor: "#ffffff" }}>Bạn bè</Header>
      <Content>
        <Header
          style={{
            backgroundColor: "#ffffff",
            display: "flex",
            flexDirection: "row",
          }}
        ></Header>
        <Content>
          <List
            style={{
              backgroundColor: "#ffffff",
              width: 1130,
            }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  //   title={item.name}
                />
              </List.Item>
            )}
          ></List>
        </Content>
      </Content>
    </Layout>
  );
};

export default ListFriends;

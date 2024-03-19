import React, { useEffect, useState } from "react";
import { Avatar, List } from "antd";
import axios from "axios";
const ListFriends: React.FC = () => {
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
   
      <List
        style={{
          backgroundColor:'#ffffff',
          width:350,
          maxHeight:600,
          overflowY: "auto",
        
        }}
        itemLayout="horizontal"
        // dataSource={data}
       
        renderItem={(item, index) => (
          <List.Item>
        
          
              <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
            //   title={item.userName}
            //   description={item.chat}
            />
          
          
            
          </List.Item>
        )}
      />
  
  );
};

export default ListFriends;

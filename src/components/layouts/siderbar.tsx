// import React, { useState } from "react";
import React from "react";
import {
  CheckSquareOutlined,
  CloudOutlined,
  ContactsOutlined,
  MessageOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Menu,
  Avatar,
} from "antd";
import {Link} from 'react-router-dom';

import Router from "../../routers/Router";

const Siderbar: React.FC = () => {
  return (
    <div
      style={{
        width: "100px",
        background: "#3a98ff",
        height: "700px",
        marginLeft: -8,
        marginTop: -8,
        
      }}
    >
      <div style={{ width: 100 }}>
        <Avatar
          size={40}
          style={{ marginLeft: 30, marginTop: 10, marginBottom: 10 }}
        >
          <UserOutlined style={{ fontSize: "30px", color: "#fff" }} />
        </Avatar>
      </div>
      <div style={{flexDirection:"row" , flex:1}}>
      
      <div>
      <Menu
          theme="dark"
          style={{ background: "#3a98ff", justifyContent: "center" }}
        >
          <Menu.Item key={1} >
           
           

           <Link to="/mess"> <MessageOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            /></Link>
           
         
          </Menu.Item>
          <Menu.Item key={2}>
            <Link to="/contact">
            <ContactsOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
            </Link>
          </Menu.Item>
          <Menu.Item key={3}>
            <CheckSquareOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>
          <Menu.Item key={4}>
            <VideoCameraOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>

          <div style={{ height: 320 }}></div>

          <Menu.Item key={5}>
            <CloudOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>

          <Menu.Item key={6}>
            <ShopOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>
          <Menu.Item key={7}>
            <SettingOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>
        </Menu>
      </div>

     
      <div>
    
      </div>
    
        <Router/>
        
      </div>
      
    </div>
  );
};

export default Siderbar;

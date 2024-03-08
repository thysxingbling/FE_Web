import React, { useState } from "react";

import {  Menu, theme , Avatar } from 'antd';
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
import { Link } from "react-router-dom";
import Router from "../../../routers/Router";
import SubMenu from "antd/es/menu/SubMenu";
import ModalInformation from "../../modals/ModalInformation";
const Siderbar: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

    const [isOpenModalInfo, setIsOpenModalInfo] = useState(false);

  const openModalInfo = () => {
    setIsOpenModalInfo(true);
  };
  const handleOk = () => {
    setIsOpenModalInfo(false);
  };

  const handleCancel = () => {
    setIsOpenModalInfo(false);
  };
  return (
    <div
      style={{
        width: "100px",
        background: "#3a98ff",
        height: "700px",
        marginLeft: -8,
        marginTop: -8,
        position: "fixed",
      }}
    >
      <div>
        <Menu
          style={{ background: "#3a98ff", justifyContent: "center" ,marginTop: 40}}
        >
          <SubMenu key="information" icon={ <Avatar
          size={40}
          style={{ marginLeft: 8, marginTop: 1, marginBottom: 10 }}
        >
          <UserOutlined style={{ fontSize: "30px", color: "#fff" }} />
        </Avatar>}>
         <div><h4>Username</h4></div>
         <hr/>
        <Menu.Item key="hs" onClick={()=>{
          openModalInfo()
        }}>Hồ sơ của bạn</Menu.Item>
          {/* modal */}
        <ModalInformation open={isOpenModalInfo} onCancel={handleCancel} onOk={handleOk}/>
        <Menu.Item key="cd">Cài đặt</Menu.Item>
        <Menu.Item key="dx">Đăng xuất</Menu.Item>
      
          </SubMenu>

          <Menu.Item key={2}>
            <Link to="/message">
              {" "}
              <MessageOutlined
                style={{ fontSize: "25px", color: "#fff", margin: 10,marginTop:10 }}
              />
            </Link>
          </Menu.Item>

          <Menu.Item key={3}>
          <Link to="/contact">
            <ContactsOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
            </Link>
          </Menu.Item>
          <Menu.Item key={4}>
            <CheckSquareOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>
          <Menu.Item key={5} >
            <VideoCameraOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>

          <div style={{ height: 320 }}></div>

          <Menu.Item key={6}>
            <CloudOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>

          <Menu.Item key={7}>
            <ShopOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>
          <Menu.Item key={8}>
            <SettingOutlined
              style={{ fontSize: "25px", color: "#fff", margin: 10 }}
            />
          </Menu.Item>
        </Menu>
    <Router/>
      </div>
      
    </div>
    
  );
};

export default Siderbar;
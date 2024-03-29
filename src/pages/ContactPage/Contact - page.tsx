import { MailOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import {  Menu } from "antd";
import {   Link } from "react-router-dom";
import Component from "../../components/layouts/components/components";
import {Col,Row} from "antd"



const ContactPage: React.FC = () => {
  return (
    <Row>
       <Col span={1} style={{position:'fixed'}}>
          <Component/>
       </Col>
      <Col span={7}  >
      <Menu
          style={{
            justifyContent: "center",
            marginTop: 50,
            width: 294,
            marginLeft:100,
            
            position:"fixed",

            height:300  ,
            
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
              <Link to="/friendsRequest">
            <MailOutlined
              style={{
                fontSize: "25px",
                color: "gray",
                margin: 10,
                marginLeft: 0,
              }}
            />
            Lời mời kết bạn
            </Link>
          </Menu.Item>
        </Menu>

      </Col>
    </Row>
  );
};
export default ContactPage;

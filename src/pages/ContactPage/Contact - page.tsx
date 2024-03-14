import { MailOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { Layout, List, Menu } from "antd";
// import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import {   Link } from "react-router-dom";
import Component from "../../components/layouts/components/components";
import {Col,Row} from "antd"
import ListFriends from "./ListFriends";


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
      <Col span={16} >
              <Layout style={{marginLeft:-50,width:1130  ,display:"flex",position:'fixed',marginTop:-10}}>
              <Header style={{backgroundColor:"#ffffff", display:"flex", flexDirection:"row"}}>
              <UserAddOutlined
          style={{ fontSize: "25px", color: "gray", marginLeft: -40 }}
        />
        <p style={{color:"gray" , fontFamily:"Time new Roman", marginTop:0, marginLeft:10, fontSize:16}}>Danh sách bạn bè </p>
              </Header>
              <Content style={{backgroundColor:"gray",height:640}}>

                 <ListFriends/>

              </Content>
              </Layout>
              
      </Col>
    </Row>
  );
};
export default ContactPage;

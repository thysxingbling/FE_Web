import { MailOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Layout, { Header } from "antd/es/layout/layout";


const ContactPage: React.FC = () => {
  return (
    <div
    

      style={{
        marginLeft: 100,
        marginTop: -650,
        width: 1490,
        display: "flex",
        position: "fixed",
        height: "100px",
      }}
    >

      
      <Sider>
        <Menu
          style={{
            justifyContent: "center",
            marginTop: 40,
            width: 294,
          }}
        >
          <Menu.Item key={1}>
            <UserAddOutlined
              style={{
                fontSize: "25px",
                color: "gray",
                margin: 10,
                marginLeft: 0,
              }}
            />
            Danh sách bạn bè
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
      </Sider>
     
      <Header
        style={{
          marginLeft: 95,
          marginTop: -25,
          width: "80%",
          borderBottom: "0.1px solid #ededee",
          background: "white",
        }}
      >
        <UserAddOutlined
          style={{ fontSize: "25px", color: "gray", marginLeft: -40 }}
        />
        Danh sách bạn bè
      </Header>
      
    </div>
  );
};
export default ContactPage;

import { Avatar, Button, Layout, Input, List } from "antd";
import ListDataFriends from "./ListDataFriends";
import React from "react";
import {
  SearchOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  FileImageOutlined,
  ContactsOutlined,
  ClockCircleOutlined,
  PaperClipOutlined,
  ExclamationOutlined,
  MehOutlined,
  LayoutOutlined,
  EditOutlined,
  BellOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import Component from "../../components/layouts/components/components";



const { Header, Content, Sider, Footer } = Layout;

const MessagePage: React.FC = () => {
  const data = [
    {
      name: "Nguyễn Ngọc Tuấn",
      chat:'Bạn : Hello'
    },
   
    {
      name: "Nguyễn Ngọc Chính",
      chat:'Bạn : Hello'
    },

  ];
  return (
    <Layout
      style={{
        marginLeft: 0,
        marginTop: 0,
        backgroundColor: "#ffffff",
        width: 1490,
        display: "flex",
        position: "fixed",
      }}
    >
      <Component/>
      <Sider width={300} style={{ backgroundColor: "#ffffff", marginLeft:100, marginTop:50 }}>
        <Header
          style={{
            flexDirection: "row",
            marginTop: 0,
            display: "flex",
            backgroundColor: "#ffffff",
            height: "40px",
            marginLeft: 5,
            width: 350,
          }}
        >
          <Button type="text" style={{ marginLeft: -50 }}>
            Tất cả
          </Button>
          <Button type="text">Chưa đọc</Button>
          <Button type="text">Phân loại</Button>
        </Header>
        <Content
          style={{
            marginTop: 0,
            marginLeft: 10,
          }}
        >
          <ListDataFriends users={data}/>
        </Content>
      </Sider>

      <Content
        style={{
          height: "680px",
          marginLeft: 30,
          borderLeft: "1px",
        }}
      >
        <div
          style={{
            height: "70px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 30,
            borderRight: "1px solid #000",
            borderBottom: "1px solid #000",
            borderLeft: "1px solid #000",
            marginTop:-10,
          }}
        >
          <Avatar
            style={{ height: 50, width: 50, marginLeft: 20 ,backgroundColor:'gray'}}
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=`}
          />

          <div style={{ marginLeft: 10, height: 50, width: 200 }}>
            <p
              style={{
                marginTop: 0,
                fontWeight: "bold",

                height: 25,
              }}
            >
              Nguyễn Ngọc Tuấn
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: 180,
             
              justifyContent: "center",
              height: 50,
              width: 150,
              marginTop: 0,
            }}
          >
            <Button type="text">
              <SearchOutlined style={{ color: "gray", height: 30 }} />
            </Button>
            <Button type="text">
              <VideoCameraOutlined style={{ color: "gray", height: 30 }} />
            </Button>
            <Button type="text">
              <LayoutOutlined style={{ color: "gray", height: 30 }} />
            </Button>
          </div>
        </div>
        <Content
          style={{
            backgroundColor: "gray",
            marginLeft: "30px  ",
            height: "530px",
            display: "flex",
            borderRight: "1px solid #000",
            width:650
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 10,
              marginTop: 10,
            }}
          >
            <Avatar
              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=`}
              style={{ height: 40, width: 40 }}
            ></Avatar>
            <p
              style={{
                backgroundColor: "#ffffff",
                height: "64px",
                borderRadius: "10px",
                width: "100px",
                marginLeft: 10,
                marginTop: 0,
              }}
            >
              Helo word
            </p>
          </div>
        </Content>
        <Footer style={{ marginLeft: "30px", height: 100 }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              width: 730,
              marginLeft: -50,
              height: 40,
              marginBottom: 1,
              display: "flex",
              marginTop: -25,
              flexDirection: "row",
              alignItems: "center",
              borderRight: "1px solid #000",
              borderLeft: "1px solid #000",
            }}
          >
            <Button type="text">
              <FileImageOutlined  style={{ color: "grey" }} />
            </Button>
            <Button type="text">
              <PaperClipOutlined style={{ color: "grey" }} />
            </Button>
            <Button type="text">
              {" "}
              <ContactsOutlined style={{ color: "grey" }} />
            </Button>
            <Button type="text">
              <ExclamationOutlined style={{ color: "grey" }} />
            </Button>
            <Button type="text">
              <ClockCircleOutlined style={{ color: "grey" }} />
            </Button>
            <Button type="text">
              <ExclamationOutlined style={{ color: "grey" }} />
            </Button>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              width: 730,
              marginLeft: -50,
              display: "flex",
              alignItems: "center",
              borderRight: "1px solid #000",
              borderLeft: "1px solid #000",
              flexDirection:"row",
            }}
          >
            <Input
              placeholder="Nhập tin nhắn @ Tên người dùng "
              style={{ borderRadius: "0px", height: 60 , width:510}}
            />
            <Button type="text">
              <MehOutlined />
            </Button>
            <Button type="text">Gửi</Button>
          </div>
        </Footer>
      </Content>
      <Sider width={400} style={{ backgroundColor: "#ffffff" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid #000",
            backgroundColor: "#fff",
            width: 450,
            height: 60,
          }}
        >
          <p
            style={{
              fontFamily: "Time new Roman",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Thông tin hội thoại
          </p>
        </Header>
        <Content>
          <List
            style={{
              backgroundColor: "#ffffff",
              width: 450,
              maxHeight: 600,
              overflowY: "auto",
            }}
          >
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",width: 450,height:310,flexDirection:"column",borderBottom:'6px solid gray'}}>
            <Avatar
            style={{ height: 50, width: 50, marginLeft: 0,backgroundColor:'gray' }}
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=`}
            />
              <div style={{display:"flex",flexDirection:"row"}}>
                <p style={{fontFamily:"Time new Roman",fontSize:20,fontWeight:"bold"}}>Tuấn</p>
                <Button type="text" style={{marginTop:10,height:50 , borderRadius:25}}>
                    <Avatar><EditOutlined/></Avatar>
                </Button>
              </div>

              <div style={{display:"flex",flexDirection:"row" }}>
                
                <Button type="text" style={{marginTop:10,height:50 , borderRadius:25}}>
                    <Avatar><BellOutlined/></Avatar>
                    <p>Tắt thông </p>
                    <p>Báo</p>
                </Button>
                <Button type="text" style={{marginTop:10,height:50 , borderRadius:25,marginLeft:20}}>
                    <Avatar><PushpinOutlined/></Avatar>
                    <p>Ghim hội </p>
                    <p>Thoại</p>
                </Button>
                <Button type="text" style={{marginTop:10,height:50 , borderRadius:25,marginLeft:20}}>
                    <Avatar><UsergroupAddOutlined/></Avatar>
                    <p>Tạo nhóm </p>
                    <p>trò chuyện</p>
                </Button>
              </div>

             

            </div>
            <div style={{width:450 , height:150 , borderBottom:'6px solid gray', display:'flex', flexDirection:'column'}}>
                  <Button type="text" style={{display:"flex",flexDirection:"row",width:350,height:75 ,alignItems:"center"}}>
                      <ClockCircleOutlined style={{marginRight:10,marginTop:-2}}/>
                      <p >Danh sách nhắc hẹn</p>
                  </Button>

                  <Button type="text" style={{display:"flex",flexDirection:"row",width:350,height:75 ,alignItems:"center"}}>
                      <UsergroupAddOutlined style={{marginRight:10,marginTop:-1}}/>
                      <p >Nhóm chung</p>
                  </Button>
                  
            </div>
          </List>
        </Content>
      </Sider>
    </Layout>
  );
};
export default MessagePage;


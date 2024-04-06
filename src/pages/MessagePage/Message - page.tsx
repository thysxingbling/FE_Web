import { Avatar, Button, Layout, Input, List, message } from "antd";
import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  FileImageOutlined,
  ContactsOutlined,
  ClockCircleOutlined,
  PaperClipOutlined,
  MehOutlined,
  LayoutOutlined,
  BellOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import Component from "../../components/layouts/components/components";
import "./Message.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const { Header, Content, Sider, Footer } = Layout;
interface Message {
  senderId: string;
  content: string;
}
const MessagePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  const urlSearchParams = new URLSearchParams(window.location.search); 
  const id = urlSearchParams.get("id");

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchConversation = async () => {
    
      try {
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setCurrentUserId(userId);
            console.log(userId);
            
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        } else {
          console.error("Token not found in localStorage");
        }
       
        const response = await axios.get(
          `http://localhost:8000/conversation/${id}`,
          {
            headers,
          }
        );
        const data = response.data.messages;
        setMessages(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    fetchConversation();
  }, []);

const sendMessage = async  () => {
  if (inputText.trim() === "") {
    return;
  }

  const newMessage: Message = {
    senderId: currentUserId || '', 
    content: inputText,
  };

  const requestData = {
    content: newMessage.content,
  };
  

  axios.post(
    `http://localhost:8000/message/text/${id}`,
    requestData,
    { headers }
  )
    .then((response) => {
      console.log('Message sent successfully:', response.data);
      setMessages([...messages, newMessage]);
      setInputText("");
    })
    .catch((error) => {
      console.error('Error sending message:', error);
   
    });
    
};

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
      <Component />
      <Content
        style={{
          height: "680px",
          marginLeft: 400,
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
            marginTop: -10,
          }}
        >
          <Avatar
            style={{
              height: 50,
              width: 50,
              marginLeft: 20,
              backgroundColor: "gray",
            }}
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
              Thuy
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

        <List
          style={{
            backgroundColor: "gray",
            marginLeft: "30px  ",
            height: "530px",
            display: "flex",
            borderRight: "1px solid #000",
            width: 670,
            overflowY: "auto",
            justifyContent: "flex-end",
          }}
          itemLayout="vertical"
          dataSource={messages}
          renderItem={(message) => (
            <List.Item
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent:
                    message.senderId ==  currentUserId 
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <div
                className={`message-bubble ${
                  message.senderId === currentUserId ? "sent" : "received"
                }`}
                style={{
                  maxWidth: "70%",
                  padding: "10px",
                  margin: "5px",
                  borderRadius: "10px",
                  backgroundColor:
                  currentUserId === message.senderId ? "#0084ff" : "#f1f0f0",
                  color:  currentUserId === message.senderId ? "#fff" : "#000",
                }}
              >
                {message.content}
              </div>
            </List.Item>
          )}
        ></List>
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
              <FileImageOutlined style={{ color: "grey" }} />
            </Button>
            <Button type="text">
              <PaperClipOutlined style={{ color: "grey" }} />
            </Button>
            <Button type="text">
              <ContactsOutlined style={{ color: "grey" }} />
            </Button>
          </div>

          <div
            style={{
              backgroundColor: "#ffffff",
              width: 730,
              marginLeft: -50,
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Input
              placeholder="Nhập tin nhắn  "
              style={{ borderRadius: "0px", height: 60, width: 510 }}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onPressEnter={sendMessage}
            />
            <Button type="text">
              <MehOutlined />
            </Button>
            <Button type="text" onClick={sendMessage}>
              Gửi
            </Button>
          </div>
        </Footer>
      </Content>
      <Sider width={400} style={{ backgroundColor: "#ffff" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",

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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 450,
                height: 310,
                flexDirection: "column",
                borderBottom: "6px solid gray",
              }}
            >
              <Avatar
                style={{
                  height: 50,
                  width: 50,
                  marginLeft: 0,
                  backgroundColor: "gray",
                }}
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=`}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p
                  style={{
                    fontFamily: "Time new Roman",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Thuy
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  type="text"
                  style={{ marginTop: 10, height: 50, borderRadius: 10 }}
                >
                  <Avatar>
                    <BellOutlined />
                  </Avatar>
                  <p>Tắt thông báo</p>
                </Button>
                <Button
                  type="text"
                  style={{
                    marginTop: 10,
                    height: 50,
                    borderRadius: 10,
                    marginLeft: 20,
                  }}
                >
                  <Avatar>
                    <PushpinOutlined />
                  </Avatar>
                  <p>Ghim hội thoại</p>
                </Button>
                <Button
                  type="text"
                  style={{
                    marginTop: 10,
                    height: 50,
                    borderRadius: 10,
                    marginLeft: 20,
                  }}
                >
                  <Avatar>
                    <UsergroupAddOutlined />
                  </Avatar>
                  <p>Tạo nhóm </p>
                </Button>
              </div>
            </div>
            <div
              style={{
                width: 450,
                height: 150,
                borderBottom: "6px solid ",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Button
                type="text"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 350,
                  height: 75,
                  alignItems: "center",
                }}
              >
                <ClockCircleOutlined
                  style={{ marginRight: 10, marginTop: -2 }}
                />
                <p>Danh sách nhắc hẹn</p>
              </Button>

              <Button
                type="text"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 350,
                  height: 75,
                  alignItems: "center",
                }}
              >
                <UsergroupAddOutlined
                  style={{ marginRight: 10, marginTop: -1 }}
                />
                <p>Nhóm chung</p>
              </Button>
            </div>
          </List>
        </Content>
      </Sider>
    </Layout>
  );
};
export default MessagePage;

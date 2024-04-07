import {
  Avatar,
  Button,
  Layout,
  Input,
  List,
  message,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  SearchOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  FileImageOutlined,
  ClockCircleOutlined,
  MehOutlined,
  LayoutOutlined,
  PushpinOutlined,
  LinkOutlined,
  SmileOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Component from "../../components/layouts/components/components";
import "./Message.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const { Header, Content, Sider, Footer } = Layout;

enum MessageType {
  TEXT = "TEXT",
  FILE = "FILE",
  LINK = "LINK",
}
interface Message {
  senderId: string;
  content: string;
  type: MessageType;
  fileUrl: string;
}
interface Information {
  avatar: string;
  chatName: string;
}
const MessagePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [information, setInformation] = useState<Information>();
  const [file, setFile] = useState<any>(null);

  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const uploadImage = {
    name: "file",
    multiple: true,
    customRequest: dummyRequest,
    accept: "image/png,image/gif,image/jpeg",
    onChange(info) {
      console.log(info);
      setFile(info.file);
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const uploadFile = {
    name: "file",
    multiple: true,
    customRequest: dummyRequest,
    accept: ".doc, .docx, .txt, .pdf",
    onChange(info) {
      debugger;
      console.log(info);
      setFile(info.file);
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const getFileName = (fileUrl: string) => {
    const segments = fileUrl.split("/");
    const filenameWithParams = segments[segments.length - 1];
    const filename = filenameWithParams.split("?")[0];
    console.log(filename);
    const decodedFilename = decodeURIComponent(filename);
    const desiredFilename = decodedFilename.split("-").slice(1).join("-");

    return desiredFilename;
  };
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;
            setCurrentUserId(userId);
            // console.log(userId);
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

        const data = response.data;
        const chatInformation: Information = {
          avatar: data.avatar,
          chatName: data.chatName,
        };
        setMessages(data.chat.messages);
        setInformation(data);
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    fetchConversation();
  }, []);

  function isImageFile(filename: string): boolean {
    const parts = filename.split(".");
    const extension = parts[parts.length - 1].toLowerCase();
    const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    if (!validExtensions.includes(extension)) {
      return false;
    }
    return true;
  }
  function isFile(filename: string): boolean {
    debugger;
    const parts = filename.split(".");
    const extension = parts[parts.length - 1].toLowerCase();
    const validExtensions = ["doc", "txt", "pdf", "docx"];
    if (!validExtensions.includes(extension)) {
      return false;
    }
    return true;
  }

  // gửi tin nhắn
  const sendMessage = async () => {
    if (inputText.trim() === "" && file == null) {
      return;
    }

    const newMessage: Message = {
      senderId: currentUserId || "",
      content: inputText,
    };
    debugger;
    console.log(inputText, file);

    const formData = new FormData();
    if (inputText.trim() !== "") formData.append("content", inputText);
    if (file !== "" && file != null)
      formData.append("file", file.originFileObj);
    console.log(formData);

    debugger;
    axios
      .post(`http://localhost:8000/message/text/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        console.log("Message sent successfully:", response.data);
        setMessages([...messages, newMessage]);
        setInputText("");
      })
      .catch((error) => {
        console.error("Error sending message:", error);
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
              border: "none",
            }}
            src={information?.avatar}
          />

          <div style={{ marginLeft: 10, height: 50, width: 200 }}>
            <p
              style={{
                marginTop: 10,
                fontWeight: "bold",
                height: 25,
                fontSize: 18,
              }}
            >
              {information?.chatName}
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
                padding: 10,
                width: 670,
                justifyContent:
                  message.senderId == currentUserId ? "flex-end" : "flex-start",
              }}
            >
              {message.content || message.fileUrl ? (
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
                      currentUserId === message.senderId
                        ? "#0084ff"
                        : "#f1f0f0",
                    color: currentUserId === message.senderId ? "#fff" : "#000",
                  }}
                >
                  <div>{message.content}</div>
                  {message.fileUrl ? (
                    isImageFile(message.fileUrl) ? (
                      <img
                        src={message.fileUrl}
                        alt=""
                        style={{ maxWidth: "40%" }}
                      />
                    ) : (
                      <a
                        style={{ textDecoration: "none", color: "white" }}
                        href={message.fileUrl}
                      >
                        {" "}
                        {getFileName(message.fileUrl)}{" "}
                      </a>
                     
                    )
                  ) : (
                    ""
                  )}
                 
                </div>
              ) : (
                ""
              )}
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
            <Upload {...uploadImage}>
              <Button
                style={{
                  color: "gray",
                  border: "none",
                }}
                icon={<FileImageOutlined />}
              ></Button>
            </Upload>

            <Upload {...uploadFile}>
              <Button
                style={{
                  color: "gray",
                  border: "none",
                }}
                icon={<LinkOutlined />}
              ></Button>
            </Upload>
            {/*  todo chưa ra */}
            <Upload>
              <Button
                style={{
                  color: "gray",
                  border: "none",
                }}
                icon={<SmileOutlined />}
              ></Button>
            </Upload>
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
                  border: "none",
                  height: 70,
                  width: 70,
                  marginLeft: 0,
                  backgroundColor: "gray",
                }}
                src={information?.avatar}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {information?.chatName}
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
                  <PushpinOutlined
                    style={{ fontSize: "25px", color: "black" }}
                  />
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
                  <UsergroupAddOutlined
                    style={{ fontSize: "25px", color: "green" }}
                  />

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

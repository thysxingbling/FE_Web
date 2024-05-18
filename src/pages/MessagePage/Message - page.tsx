import {
  Avatar,
  Button,
  Layout,
  Input,
  List,
  message,
  Upload,
  Modal,
} from "antd";
import React, {useEffect, useState } from "react";
import {
  SearchOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
  FileImageOutlined,
  MehOutlined,
  LayoutOutlined,
  LinkOutlined,
  SmileOutlined,
  DeleteOutlined,
  ForwardOutlined,
  ReloadOutlined,
  TeamOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import Component from "../../components/layouts/components/components";
import "./Message.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ModalCreateGroupChat from "../../components/modals/ModalCreateGroupChat";
import ModalAddMembers from "../../components/modals/ModalAddMembers";
import ModalShareData from "../../components/modals/ModalShareData";
import { useSocket } from "../../Socket/SocketContext";


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
  fileUrls: string[];
  _id: string;
  senderAvatar: string;
  isDeleted: boolean;
}
interface Information {
  avatar: string;
  name: string;
}
interface InformationGroup {
  avatar: string;
  chatName: string;
}
interface Member {
  _id: string;
  avatar: string;
  name: string;
}
const MessagePage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [informationGroup, setinformationGroup] = useState<InformationGroup>();
  const [informations, setInformations] = useState<Information[]>([]);
  const [file, setFile] = useState<any>(null);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");
  const type = urlSearchParams.get("type");
  const conversationPramter = urlSearchParams.get("conversation");
  const [isOpenModalCreateGroupChat, setIsOpenModalCreateGroupChat] =
    useState(false);
  const [isOpenModalAddMember, setIsOpenModalAddMember] = useState(false);
  const [isOpenModalShareData, setIsOpenModalShareData] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messageId, setMessageId] = useState<string | null>(null);

  const [members, setMembers] = useState<Member[]>([]);
  const [visible, setVisible] = useState(false);
  const token = localStorage.getItem("token");
  const { socket } = useSocket();

  useEffect(() => {}, [informations]);
  useEffect(() => {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.userId;
    setCurrentUserId(userId);

    fetchConversation();
  }, []);


  const fetchConversation = async () => {
    try {
      // id là user bị click
      if (id !== null && type === "SINGLE" && currentUserId !== id) {
        axios
          .post(
            `http://localhost:8000/conversation/single/${id}`,
            {},
            {
              headers,
            }
          )
          .then((responseCreateChat) => {
            var conversationId =
              responseCreateChat.data.conversation.conversationId;
            setConversationId(conversationId);
            axios
              .get(`http://localhost:8000/conversation/${conversationId}`, {
                headers,
              })
              .then((response) => {
                const data = response.data;
                var messageList = data.messages;
                var setValueDelete = messageList.map((item: any) => {
                  if (item.isDeleted == true) {
                    item.content = "Tin nhắn đã thu hồi";
                  }
                  return item;
                });
                setMessages(setValueDelete);
                setInformations([data.nameAndAvatar]);
              })
              .catch((error) => {
                console.log("lỗi get cuộc trò chuyện", error);
              });
          })
          .catch((error) => {
            console.log("lỗi tạo cuộc trò chuyện", error);
          });
      } else if (type === "GROUP") {
        setConversationId(conversationPramter);
        axios
          .get(`http://localhost:8000/conversation/${conversationPramter}`, {
            headers,
          })
          .then((response) => {
            const data = response.data;
            setMessages(data.messages);
            setInformations(data.nameAndAvatar);
            setinformationGroup(data.conversation);
            // console.log(data);
          })
          .catch((error) => {
            console.log("lỗi get cuộc trò chuyện", error);
          });
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on("message-received", (message: any) => {
        setMessages((prevMessages) => [...prevMessages, message]);
        console.log(message);
        
      });

      socket.on("conversation-data", (data: any) => {
        setMessages(data.messages);
        useEffect(() => {
          fetchConversation();
        }, [conversationId]);
      });
    }
  }, [socket]);
  //  useEffect(()=>{
  //     socket.on("updatethread",(data:any)=>{
  //       console.log('respoen socket')
  //       console.log(data)
  //     })
  //  },[socket])

  //   useEffect(() => {
  //     fetchConversation();
  //   }, [conversationId]);
  // getList memeber
  const getListMembers = () => {
    axios
      .get(`http://localhost:8000/conversation/member/${conversationId}`, {
        headers,
      })
      .then((response) => {
        const data = response.data;
        setMembers(data.users);
      })
      .catch((error) => {
        console.log("lỗi get thành viên", error);
      });
  };
  const showModal = (conversationId: string) => {
    setVisible(true);
    getListMembers();
    setConversationId(conversationId);
  };
  // delete memeber
  const handleDeleteMember = (memberId: string) => {
    axios
      .delete(`http://localhost:8000/conversation/member/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          deleteUserId: memberId,
        },
      })

      .then((response) => {
        console.log("Member deleted:", response.data);
        message.success("Thành viên đã được xóa thành công.");
        getListMembers();
      })
      .catch((error) => {
        console.error("Error deleting conversation:", error);
        message.error("Đã xảy ra lỗi khi xóa thành viên.");
      });
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const handleMouseEnter = (_id: string) => {
    setHoveredMessageId(_id);
  };

  const handleMouseLeave = () => {
    setHoveredMessageId(null);
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
      // console.log(info);
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
    const decodedFilename = decodeURIComponent(filename);
    const desiredFilename = decodedFilename.split("-").slice(1).join("-");

    return desiredFilename;
  };

  function isImageFile(filename: string): boolean {
    const parts = filename.split("/");
    const extension = parts[parts.length - 1].toLowerCase();
    const parts1 = extension.split(".");
    const extension1 = parts1[parts1.length - 1].toLowerCase();
    const validExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];
    if (!validExtensions.includes(extension1)) {
      return false;
    }
    return true;
  }

  function isFile(filename: string): boolean {
    const parts = filename.split(".");
    const extension = parts[parts.length - 1].toLowerCase();
    const parts1 = extension.split(".");
    const extension1 = parts1[parts1.length - 1].toLowerCase();
    const validExtensions = ["doc", "txt", "pdf", "docx"];
    if (!validExtensions.includes(extension1)) {
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
    const formData = new FormData();

    if (inputText.trim() !== "") formData.append("content", inputText);
    if (file !== "" && file != null)
      formData.append("files", file.originFileObj);
    axios
      .post(`http://localhost:8000/message/text/${conversationId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        debugger;
        console.log("Message sent successfully:", response.data);
        newMessage._id = response.data.message._id;
        newMessage.fileUrls = response.data.message.fileUrls;
        setMessages([...messages, newMessage]);
        setInputText("");
        if (socket) { 
          socket.emit('new-message', newMessage);  
        } else {
          console.error('Socket connection not established yet. Message not sent through socket.');
        }
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };
  
  // xóa cuộc trò chuyện

  const deleteConversation = async (id: string) => {
    axios
      .delete(`http://localhost:8000/conversation/message/${conversationId}`, {
        headers,
      })
      .then((response) => {
        console.log("Conversation deleted:", response.data);
        message.success("Cuộc trò chuyện đã được xóa thành công.");
        window.location.href = "/message";
      })

      .catch((error) => {
        console.error("Error deleting conversation:", error);
        message.error("Đã xảy ra lỗi khi xóa cuộc trò chuyện.");
      });
  };

  // xóa tin nhắn
  const deleteMessage = async (messageId: string) => {
    axios
      .delete(`http://localhost:8000/message/delete/only/${messageId}`, {
        headers,
      })
      .then((response) => {
        console.log("Conversation deleted:", response.data);
        message.success("Tin nhắn đã được xóa thành công.");
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId)
        );
      })
      .catch((error) => {
        console.error("Error deleting conversation:", error);
        message.error("Đã xảy ra lỗi khi xóa tin nhắn.");
      });
  };

  //thu hồi tin nhắn
  const handleRecallMessage = async (messageId: string) => {
    axios
      .delete(`http://localhost:8000/message/delete/${messageId}`, {
        headers,
      })

      .then((response) => {
        console.log("Conversation deleted:", response.data);
        message.success("Tin nhắn đã được thu hồi thành công.");
        // setMessageRecall();
      })

      .catch((error) => {
        console.error("Error deleting conversation:", error);
        message.error("Đã xảy ra lỗi khi thu hồi tin nhắn.");
      });
  };

  // rời nhóm
  const handleLeaveGroup = () => {
    axios
      .delete(
        `http://localhost:8000/conversation/member/leave/${conversationId}`,
        {
          headers,
        }
      )
      .then((response) => {
        console.log("Leave group:", response.data);
        message.success("Rời nhóm thành công.");
      })

      .catch((error) => {
        console.error("Error deleting conversation:", error);
        message.error("Đã xảy ra lỗi khi rời nhóm.");
      });
  };

  // giải tán nhóm
  const handleDeleteGroup = (conversationId: string) => {
    axios
      .delete(`http://localhost:8000/conversation/group/${conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Deleted conversation:", response.data);
        message.success("Nhóm đã được giải tán thành công.");
      })
      .catch((error) => {
        console.error("Failed to delete conversation:", error);
        message.error("Đã xảy ra lỗi khi giải tán nhóm.");
      });
  };
  // show modal create group
  const openModalCreateGroupChat = () => {
    setIsOpenModalCreateGroupChat(true);
  };
  const handleOk = () => {
    setIsOpenModalCreateGroupChat(false);
    setIsOpenModalAddMember(false);
  };

  const handleCancel = () => {
    setIsOpenModalCreateGroupChat(false);
    setIsOpenModalAddMember(false);
    setVisible(false);
  };

  // show modal add member
  const openModalAddMember = (conversationId) => {
    setIsOpenModalAddMember(true);
    setConversationId(conversationId);
  };
  // show modal share data
  const openModalShare = (messageId: string) => {
    setMessageId(messageId);
    setIsOpenModalShareData(true);
  };
  const handleCancelModalShare = () => {
    setIsOpenModalShareData(false);
    setVisible(false);
  };
  const handleOkModalShare = () => {
    setIsOpenModalShareData(false);
  };
  // chuyển quyền leader
  const handleTransferLeader = (memberId: string) => {
    axios

      .patch(
        `http://localhost:8000/conversation/${conversationId}/member/${memberId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Kết quả:", response.data);
        message.success(
          "Người dùng đã được chuyển quyền làm nhóm trưởng thành công."
        );
      })
      .catch((error) => {
        console.error("Lỗi khi chuyển quyền làm nhóm trưởng:", error);
        message.error("Đã xảy ra lỗi khi chuyển quyền làm nhóm trưởng.");
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
            src={
              informationGroup?.avatar ||
              informations.map((info) => info.avatar).join(", ")
            }
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
              {informationGroup?.chatName
                ? informationGroup.chatName
                : informations.map((info) => info.name).join(", ")}
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
            marginLeft: "30px",
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
                  message.senderId === currentUserId
                    ? "flex-end"
                    : "flex-start",
              }}
              onMouseEnter={() => handleMouseEnter(message._id)}
              onMouseLeave={handleMouseLeave}
            >
              {message.senderId !== currentUserId && (
                <img
                  src={message.senderAvatar}
                  alt="Avatar"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                  }}
                />
              )}
              {message.content || message.fileUrls ? (
                <>
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
                      color:
                        currentUserId === message.senderId ? "#fff" : "black",
                    }}
                  >
                    <div>{message.content}</div>
                    {message.fileUrls && message.fileUrls.length > 0 ? (
                      isImageFile(message.fileUrls[0]) ? (
                        <img
                          src={message.fileUrls[0]}
                          alt=""
                          style={{ maxWidth: "40%" }}
                        />
                      ) : (
                        <a
                          style={{ textDecoration: "none", color: "black" }}
                          href={message.fileUrls[0]}
                        >
                          {" "}
                          {getFileName(message.fileUrls[0])}{" "}
                        </a>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    style={{
                      background: "gray",
                      padding: 2,
                      marginRight: 10,
                      display:
                        hoveredMessageId === message._id ? "block" : "none",
                    }}
                  >
                    {true && (
                      <Button
                        style={{ marginLeft: 5, marginTop: 10 }}
                        icon={<DeleteOutlined />}
                        onClick={() => deleteMessage(message._id)}
                      />
                    )}
                    {/* chuyển tiếp */}
                    {true && (
                      <Button
                        style={{ marginLeft: 5, marginTop: 10 }}
                        icon={<ForwardOutlined />}
                        onClick={() => openModalShare(message._id)}
                      />
                    )}

                    {/* Thu hồi */}
                    {
                      <Button
                        style={{ marginLeft: 5, marginTop: 10 }}
                        icon={<ReloadOutlined />}
                        onClick={() => handleRecallMessage(message._id)}
                      ></Button>
                    }
                  </div>
                </>
              ) : (
                ""
              )}
            </List.Item>
          )}
        />

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
                src={
                  informationGroup?.avatar ||
                  informations.map((info) => info.avatar).join(", ")
                }
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  {informationGroup?.chatName
                    ? informationGroup.chatName
                    : informations.map((info) => info.name).join(", ")}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  type="text"
                  style={{ marginTop: 10, height: 50, borderRadius: 10 }}
                  onClick={() => deleteConversation(id)}
                >
                  <DeleteOutlined style={{ fontSize: "25px", color: "RED" }} />
                  <p>Xóa cuộc trò chuyện</p>
                </Button>

                <Button
                  type="text"
                  style={{
                    marginTop: 10,
                    height: 50,
                    borderRadius: 10,
                    marginLeft: 20,
                  }}
                  onClick={() => {
                    openModalAddMember(conversationId);
                    // console.log(conversationId);
                  }}
                >
                  <UsergroupAddOutlined
                    style={{ fontSize: "25px", color: "black" }}
                  />
                  <p>Thêm thành viên</p>
                </Button>
                <ModalAddMembers
                  open={isOpenModalAddMember}
                  onCancel={handleCancel}
                  onOk={handleOk}
                  conversationId={conversationId}
                />
                <Button
                  type="text"
                  style={{
                    marginTop: 10,
                    height: 50,
                    borderRadius: 10,
                    marginLeft: 20,
                  }}
                  onClick={() => {
                    openModalCreateGroupChat();
                  }}
                >
                  <UsergroupAddOutlined
                    style={{ fontSize: "25px", color: "green" }}
                  />

                  <p>Tạo nhóm </p>
                </Button>

                <ModalCreateGroupChat
                  open={isOpenModalCreateGroupChat}
                  onCancel={handleCancel}
                  onOk={handleOk}
                />
                <ModalShareData
                  open={isOpenModalShareData}
                  onCancel={handleCancelModalShare}
                  onOk={handleOkModalShare}
                  messageId={messageId}
                />
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
                onClick={() => showModal(conversationId)}
              >
                <TeamOutlined style={{ fontSize: "25px" }} />
                <p>Thành viên nhóm</p>
              </Button>
              <Modal
                title="Thành viên nhóm"
                visible={visible}
                onCancel={handleCancel}
                footer={null}
              >
                <List
                  dataSource={members}
                  renderItem={(item) => (
                    <List.Item
                      key={item._id}
                      actions={[
                        <Button
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={() => handleDeleteMember(item._id)}
                        />,
                        <Button
                          type="text"
                          icon={<UserSwitchOutlined />}
                          // onClick={handleTransferLeader(item._id)}
                          onClick={() => handleTransferLeader(item._id)}
                        ></Button>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <img
                            src={item.avatar}
                            alt="Avatar"
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: "50%",
                            }}
                          />
                        }
                        title={<p>{item.name}</p>}
                      />
                    </List.Item>
                  )}
                />
              </Modal>

              <Button
                type="text"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: 350,
                  height: 75,
                  alignItems: "center",
                }}
                onClick={handleLeaveGroup}
              >
                <UserDeleteOutlined
                  style={{ marginRight: 10, marginTop: -1 }}
                />
                <p>Rời nhóm</p>
              </Button>
            </div>
          </List>
          {/* <Button
          style={{justifyContent:"center"}}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            // onClick={deleteGroupConversation}
            onClick={() => deleteGroupConversation(item._id)}
          >
            Giải tán nhóm
          </Button> */}
          <Button
            style={{ justifyContent: "center" }}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteGroup(conversationId)}
          >
            Giải tán nhóm
          </Button>
        </Content>
      </Sider>
    </Layout>
  );
};

export default MessagePage;

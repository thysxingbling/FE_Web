import { Avatar, Layout } from "antd";
import Search from "../../components/layouts/search/search";
import { UserOutlined } from "@ant-design/icons";
const {Header, Content, Sider} = Layout;

const MessagePage: React.FC = () => {
  // return <div>
  //   <div
  //     style={{
  //       marginLeft: 200,
  //       marginTop: -680,
  //       backgroundColor: "red",
  //       width: 100,
  //       height: 100,
  //     }}
  //   >
  //     Conksdkjfsdkjlfjklfdkjldfkjlfde
  //   </div>
  // </div>;
  return(
    <Layout
    style={{
            marginLeft: 100,
            marginTop: -680,
            backgroundColor: "red",
            width:1490,
            display:"flex",
            position:'fixed',
          }}>
        
       
   
          <Sider width={250} style={{backgroundColor:"#ffffff"}}>
          
          <Header style={{backgroundColor:"#ffffff"}}><Search/></Header>
          <hr/>
          <Content>
            {/* List data  */}
            <div style={{backgroundColor:'red' ,width:240,marginLeft:5}}>
                <Avatar>
                  <UserOutlined/>
                </Avatar>
                <p>hello word</p>
            </div>
          </Content>
          </Sider>

          <Content style={{height:'100vh'}}>
              hello
          </Content>
    </Layout>
  )
};
export default MessagePage;

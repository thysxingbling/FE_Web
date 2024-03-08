import { Avatar, Layout } from "antd";
import Search from "../../components/layouts/search/search";
import { UserOutlined } from "@ant-design/icons";
import Siderbar from "../../components/layouts/siderbar/siderbar";
const {Header, Content, Sider} = Layout;

const MessagePage: React.FC = () => {

  return(
    <Layout
    style={{

            marginLeft: 0,
            marginTop: 0,
            backgroundColor: "red",
            width:1490,
            display:"flex",
            position:'fixed',
          }}>
        
        <Siderbar/>
   
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

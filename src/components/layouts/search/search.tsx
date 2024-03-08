import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Search: React.FC = () => {
  const { Search } = Input;
  return (
    <div style={{flexDirection:'row' , height:70,marginLeft:100,marginTop:30,position:'fixed',borderRight:"0.5px solid #ededee"}}>
      
    
      <Search placeholder="Tìm kiếm" style={{ width: 200, color: "red" ,marginLeft:10,marginTop:10}} />
      
      <UserAddOutlined
        style={{
          marginTop:"10px",
          marginLeft: 5,
          width: 30,
          height: 30,
          color: "gray",
   
        }}
      />
      <UsergroupAddOutlined style={{ width: 40, height: 50, color: "gray" }} />
    </div>
  );
};
export default Search;

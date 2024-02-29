import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Search: React.FC = () => {
  const { Search } = Input;
  return (
    <div style={{flexDirection:'row' , height:50,marginLeft:-50,marginTop:10,position:'fixed'}}>
      
    
      <Search placeholder="Tìm kiếm" style={{ width: 150, color: "red" ,marginLeft:10,marginTop:5}} />
      
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

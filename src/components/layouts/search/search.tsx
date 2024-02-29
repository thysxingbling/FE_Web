import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Input } from "antd";

const Search: React.FC = () => {
  const { Search } = Input;
  return (
    <div>
      <Search placeholder="Tìm kiếm" style={{ width: 150, color: "red" ,marginLeft:100}} />
      <UserAddOutlined
        style={{
          marginTop:"10px",
          marginLeft: 5,
          width: 30,
          height: 30,
          color: "gray",
   
        }}
      />
      <UsergroupAddOutlined style={{ width: 40, height: 50, color: "gray"}} />
    </div>
  );
};
export default Search;

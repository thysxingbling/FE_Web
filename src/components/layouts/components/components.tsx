import { useEffect, useState } from "react";
import ListDataFriends from "../../../pages/MessagePage/ListDataFriends";
import Search from "../search/search";
import Siderbar from "../siderbar/siderbar";
import "./compenent.css";
import { IFriends } from "../../models/friends";
import axios from "axios";
import { Col, Row } from "antd";
const Component: React.FC = () => {
  // const [friends, setFriends] = useState<IFriends[]>([]);
  // useEffect(() => {
  //   const getList = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get("http://localhost:8000/friend/list", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setFriends(response.data.users);
  //       // console.log(response.data.users);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   getList();
  // }, []);
  return (
    // <Row>
    //   <Col span={1} style={{ position: "fixed" }}>
    //    <Siderbar/>

    //   </Col>
    //   <Col span={7}>
    //   <Search/>
    //   <ListDataFriends users={friends ? friends : []} />
    //     {/* <MenuItem /> */}
    //   </Col>
    // </Row>
    <div className="full-screen-sidebar-layout">
      <Siderbar />
      <Search />
      {/* <ListDataFriends users={friends ? friends : []} /> */}
    </div>
  );
};
export default Component;

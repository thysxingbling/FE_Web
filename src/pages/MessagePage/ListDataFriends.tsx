import React from "react";
import { Avatar, List } from "antd";
interface IUsersResponse {
  name: string;
  chat:string;
  avatar:string;
}
interface ModalListFriends {
  users: IUsersResponse[];
}

const ListDataFriends: React.FC<ModalListFriends> = ({
 users
}) => {
  // const data = [
  //   {
  //     userName: "Nguyễn Ngọc Tuấn",
  //     chat:'Bạn : Hello'
  //   },
   
   
  //   {
  //     userName: "Nguyễn Ngọc Chính",
  //     chat:'Bạn : Hello'
  //   },
  // ];
  return (
   
      <List
        style={{
          backgroundColor:'#ffffff',
          width:350,
          maxHeight:600,
          overflowY: "auto",
        
        }}
        itemLayout="horizontal"
        dataSource={users}
       
        renderItem={(item, index) => (
          <List.Item>
              <List.Item.Meta
              avatar={
                <Avatar
                  src={item.avatar}
                />
              }
              title={item.name}
             
            />
          </List.Item>
        )}
      />
  
  );
};

export default ListDataFriends;

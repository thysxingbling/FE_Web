import React from "react";
import { Avatar, List } from "antd";
interface IUsersResponse {
  userName: string;
  chat:string
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
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={item.userName}
              description={item.chat}
            />
          </List.Item>
        )}
      />
  
  );
};

export default ListDataFriends;

import React, { useEffect, useState } from 'react';
import { Button, Card } from 'antd';
import axios from 'axios';

interface Recipient{
  _id:string;
  reciverId:string;
  // reciverName:string;
  senderName:string;
  
}
const ListRequest: React.FC = ({  }) => {
  const [requests, setRequests] = useState<Recipient[]>([]);
  const token = localStorage.getItem('token'); 
  useEffect(() => {
    const getaddFriendsReqs = async () => {
      
      debugger
      try {
        const response = await axios.get('http://localhost:8080/friend/list/req', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        const { data } = response;
        setRequests(data.addFriendReqs);
        console.log();
        
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    getaddFriendsReqs();
  }, []); 
  const handleAccept = async (addFriendReqId: string) => {
    debugger
    try {
      await axios.put(`http://localhost:8080/friend/status/${addFriendReqId}`, { status: true });
    } catch (error) {
      console.error('Error accepting friend request:', error);
    }
  };

  const handleReject = async (addFriendReqId: string) => {
    debugger
    try {
      await axios.put(`http://localhost:8080/friend/status/${addFriendReqId}`, { status: false });
    } catch (error) {
      console.error('Error rejecting friend request:', error);
    }
  };
  return (
      <div>
      {requests.map(request => (
        <Card
          key={request._id}
          extra={<Button type="primary" onClick={() => handleReject(request._id)}>Từ chối</Button>}
          style={{ width: 300, marginBottom: 16 }}
        >
          <p>{request.senderName} muốn kết bạn với bạn.</p>
          <Button type="primary" onClick={() => handleAccept(request._id)}>Đồng ý</Button>
        </Card>
      ))}
    </div>
  );
};

export default ListRequest;

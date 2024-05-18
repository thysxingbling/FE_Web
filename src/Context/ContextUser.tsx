// import React from 'react'
// import { createContext, useState, useEffect } from "react";
// import io, { Socket } from 'socket.io-client'
// const UserContext=createContext<any>(null);
// console.log('vao day')

// const UserContextProvider=({children}: {children: React.ReactNode})=>{

//     const [socket, setSocket] = useState<Socket>(null!);

 
//     useEffect(()=>{
      
//       async function connectSocket(){
//         const SocketIo=io('http://localhost:8000',{
//             withCredentials: true,
//             extraHeaders: {
//               "Access-Control-Allow-Origin": "*",
//               "Access-Control-Header":
//                 "Origin, X-Requested-With, Content-Type, Accept, Authorization",
//               "Access-Control-Allow-Methods": "PUT, POST, DELETE, GET",
//             },
//             })

//             console.log(SocketIo)
//             if(SocketIo){
//                 console.log('data socket connet')
//                 console.log(SocketIo)
//               setSocket(SocketIo);
//             }
//        return ()=>socket.close();
//     }
//     connectSocket();
      
//     },[]);
//     const state = {
//       socket: socket,
    
//     };

//     return (
//       <UserContext.Provider value={{state}}>{children}</UserContext.Provider>
//     )
//   }
  
//   export {UserContext,UserContextProvider}
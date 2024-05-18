import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routers/Router";
import { SocketProvider } from "./Socket/SocketContext";

// import {UserContextProvider} from '../../FE_Web/src/Context/ContextUser'
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <UserContextProvider> */}
    <SocketProvider>
    <BrowserRouter>
        <Router />
      </BrowserRouter>
    </SocketProvider>
    
  
    {/* </UserContextProvider> */}
  </React.StrictMode>
);

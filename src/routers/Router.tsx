import { Route, Routes } from "react-router-dom";
import MessagePage from "../pages/MessagePage/Message - page";
import ContactPage from "../pages/ContactPage/Contact - page";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Component from "../components/layouts/components/components";
import ListFriends from "../pages/ContactPage/ListFriends";
import ListGroups from "../pages/ContactPage/ListGroups";
import ListRequest from "../pages/ContactPage/ListRequest";

const Router: React.FC=()=>{
    return (
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path='/register' element={<Register />} />
        <Route path="/home" element={<Component/>}/>
        <Route path='/message' element={<MessagePage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/listFriends' element={<ListFriends />} />
        <Route path='/listGroups' element={<ListGroups />} />
        <Route path='/friendsRequest' element={<ListRequest/>} />
     
      
      </Routes>
    )
   
}
export default Router;
import { Route, Routes } from "react-router-dom";
import MessagePage from "../pages/MessagePage/Message - page";
import ContactPage from "../pages/ContactPage/Contact - page";
import Register from "../pages/Register/Register";

const Router: React.FC=()=>{
    return (
        <Routes>
        <Route path='/message' element={<MessagePage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    )
   
}
export default Router;
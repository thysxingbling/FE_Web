import { Route, Routes } from "react-router-dom";
import MessagePage from "../pages/MessagePage/Message - page";
import ContactPage from "../pages/ContactPage/Contact - page";

const Router: React.FC=()=>{
    return (
        <Routes>
        <Route path='/message' element={<MessagePage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
    )
   
}
export default Router;
import { Route, Routes } from "react-router-dom";
import Siderbar from "../components/layouts/siderbar";
import MessagePage from "../pages/MessagePage/Message - page";
import ContactPage from "../pages/ContactPage/Contact - page";

const Router: React.FC=()=>{
    return (
      <Routes>
        <Route path='/' element={<Siderbar />} />
        <Route path='/message' element={<MessagePage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
    )
   
}
export default Router;
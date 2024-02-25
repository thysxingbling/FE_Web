
import Search from "../search/search";
import Siderbar from "../siderbar/siderbar";
import "./compenent.css";
const Component: React.FC = () => {
  return (
    <div className="full-screen-sidebar-layout">
      <Siderbar  />
      <Search />
     
    </div>
  );
};
export default Component;

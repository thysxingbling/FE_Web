import Component from "../../components/layouts/components/components";
import { Col, Row } from "antd";
import MenuItem from "./Menu";
import Siderbar from "../../components/layouts/siderbar/siderbar";
import Search from "../../components/layouts/search/search";

const ContactPage: React.FC = () => {
  return (
    <Row>
      <Col span={1} style={{ position: "fixed" }}>
       <Siderbar/>

      </Col>
      <Col span={7}>
      <Search/>
        <MenuItem />
      </Col>
    </Row>
  );
};
export default ContactPage;

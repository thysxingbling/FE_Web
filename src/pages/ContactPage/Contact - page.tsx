import Component from "../../components/layouts/components/components";
import { Col, Row } from "antd";
import MenuItem from "./Menu";

const ContactPage: React.FC = () => {
  return (
    <Row>
      <Col span={1} style={{ position: "fixed" }}>
        <Component />
      </Col>
      <Col span={7}>
        <MenuItem />
      </Col>
    </Row>
  );
};
export default ContactPage;

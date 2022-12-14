import { Container, Row, Col, Image } from "react-bootstrap";
import EmployeeReminder from "../components/EmployeeReminder";
import mainLogo from "../img/logo.png";
import { Outlet } from "react-router-dom";
import "../Assets/CSS/view.css";
import "../Assets/CSS/style.css";

const LandingPage = () => {
  return (
    <Container className="min-view">
      <Row className="px-4 my-5 ">
        {/* PAGE LEFT:  */}
        <Col sm={7}>
          {/* Dummy placeg=holder for now- TODO replace with company logo */}
          <Image src={mainLogo} fluid rounded className="" width="600" />
          {/* image generated from https://smashinglogo.com/ and used for non for profit educational purposes */}
        </Col>

        {/* PAGE RIGHT */}
        <Col id="form" sm={5}>
          {}
          <Outlet />
        </Col>
      </Row>
      <Row>
        <EmployeeReminder />
      </Row>
    </Container>
  );
};

export default LandingPage;

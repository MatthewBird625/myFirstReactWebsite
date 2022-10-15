import { Container, Row, Col, Image } from "react-bootstrap";
import profile from "../img/profile.jpg";
import { Outlet, useNavigate } from "react-router-dom";

import "../Assets/CSS/Button.css";
import "../Assets/CSS/view.css";
import "../Assets/CSS/Profile.css";
const ProfilePage = (props) => {
  const navigate = useNavigate();

  if (props.loginStatus !== true) {
    navigate("/");
  }

  return (
    <Container>
      <Row className="px-2 my-2 min-view">
        {/* PAGE LEFT:  */}
        <Col className="profile-image" sm={5}>
          {/* Dummy placeg=holder for now- TODO replace with company logo */}
          <Image src={profile} fluid rounded className="" width="300" />
          {/* image generated from https://smashinglogo.com/ and used for non for profit educational purposes */}
        </Col>

        {/* PAGE RIGHT */}
        <Col sm={7}>
          {}
          <Outlet />
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};

export default ProfilePage;

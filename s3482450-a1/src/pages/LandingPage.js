import { Container, Row, Col, Image} from "react-bootstrap";
import Login from "../components/Login";
import EmployeeReminder from "../components/EmployeeReminder";

const LandingPage = () => {


    return (   <Container>
        <Row className="px-4 my-5">
          {/* PAGE LEFT:  */}
          <Col sm={8}>

          {/* Dummy placeg=holder for now- TODO replace with company logo */}
            <Image
              src="https://picsum.photos/600/400"
              fluid
              rounded
              className=""
            />
          </Col>
    
          {/* PAGE RIGHT */}
          <Col sm={4}>

          <Login />
           
          </Col>
        </Row>
        <Row>
          <EmployeeReminder />
        </Row>
      </Container>);
}


export default LandingPage;
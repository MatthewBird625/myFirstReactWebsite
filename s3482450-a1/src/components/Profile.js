import {Card, Button, Table} from "react-bootstrap";
import { useState } from "react";


const Profile = (props) => {

    const [name, setName] = useState(localStorage.getItem("name"));
    const [email, setEmail] = useState(props.currentUser);
    const [pass, setPass] = useState(localStorage.getItem("password"));

    return    <Card>
            <Card.Header>Profile</Card.Header>
            <Card.Body>
              <Card.Text>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{name}</td>
                    </tr>
                  </tbody>
                </Table>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{email}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Text>
              <Button variant="primary" className="button-bigger">
                Edit profile
              </Button>
              <Button variant="secondary" className="button-bigger">
                Change Password
              </Button>
            </Card.Body>
          </Card>
}

export default Profile;
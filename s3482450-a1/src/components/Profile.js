import {Card, Button, Table} from "react-bootstrap";
import { useState , useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Profile = (props) => {

  const navigate = useNavigate();

    useEffect(() => {
      if (props.loginStatus !== true) {
        navigate("/");
      }
    });

    
  const [users] = useState(
    localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : []
  );
 
  let user = users.find(userSearch => userSearch.email === props.currentUser);




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
                      <td>{user.name}</td>
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
                      <td>{user.email}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Text>
              
             <Link to="/profile/edit"><Button variant="primary" className="button-bigger more-left-margin">
                Edit profile
              </Button></Link> 
            <Link to= "/profile/changePassword"><Button variant="secondary" className="button-bigger more-left-margin">
                Change Password
              </Button>

            </Link>
            <Link to= "/profile/delete"><Button variant="danger" className="button-bigger more-left-margin">
                Delete Account
              </Button>

            </Link>
            
            </Card.Body>
          </Card>
}

export default Profile;
import { Card, Button, Table } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, findUser } from "../data/repository";
import "../Assets/CSS/Profile.css";

const Profile = (props) => {
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (getUser() === null) {
      navigate("/");
    }
  });

  //fetch our user profile data with a use effect

  useEffect(() => {
    const fetchUser = async () => {
      const result = await findUser(getUser().email);
      setUser(result);
      console.log("fetching user" + getUser().email);
    };
    fetchUser().catch(console.error);
  }, []);

  //date conversion based on this reference : https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
  let date = new Date(user.createdAt);
  let month = date.getUTCMonth() + 1;
  let day = date.getUTCDate();
  let year = date.getUTCFullYear();
  date = day + "/" + month + "/" + year;

  return (
    <Card>
      <Card.Header>Profile</Card.Header>
      <Card.Subtitle className="mb-2 text-muted padded-date">
        join date: {date}
      </Card.Subtitle>
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

        <Link to="/profile/edit">
          <Button variant="primary" className="button-bigger more-left-margin">
            Edit profile
          </Button>
        </Link>
        <Link to="/profile/changePassword">
          <Button
            variant="secondary"
            className="button-bigger more-left-margin"
          >
            Change Password
          </Button>
        </Link>
        <Link to="/profile/delete">
          <Button variant="danger" className="button-bigger more-left-margin">
            Delete Account
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoleUser } from "../../userRole";
import PgLogo from "../../assets/images/logo.svg";
import { updateUser } from "../../apis/userApi";
import "./index.scss";
import { useSelector } from "react-redux";
function UserLogin() {
  const User = useSelector((state) => state.UserReducer);
  const userInformation = User.userInformation;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsValid, setCredentialsValid] = useState(true);
  const [userInfoUpdated, setUserInfoUpdated] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Find the user in the users array with the entered username
    // const user = RoleUser.users.find(
    //   (u) => u.username.toLowerCase() === username.toLowerCase()
    // );

    // if (user && user.password === password) {
    //   // Save the user's username and role in sessionStorage
    //   const session = {
    //     username: user.username,
    //     role: user.role,
    //     permissions: user.permissions,
    //     bu: user.bu,
    //     region: user.region,
    //     userid: user.userid,
    //     loginTime: new Date().toLocaleString(),
    //   };

    //   // Save the session object in sessionStorage
    //   sessionStorage.setItem("session", JSON.stringify(session));
    // Redirect to home page
    //   navigate("/myProjects");
    // } else {
    //   alert("Invalid username or password");
    // }
    const infoUpdated = await updateUser(username, password);
    setUserInfoUpdated(infoUpdated);
  };

  useEffect(() => {
    if (userInfoUpdated) {
      if (userInformation?.username) {
        setCredentialsValid(true);
        navigate("/myProjects");
      } else {
        // alert("Invalid username or password");
        setCredentialsValid(false);
        setUsername("");
        setPassword("");
      }
    }
  }, [userInfoUpdated, userInformation]);

  return (
    <div className="login-screen">
      <Row>
        <Col>
          <img src={PgLogo} />
        </Col>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <h2>Welcome!</h2>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                required
                className="mb-3"
                placeholder="Enter your usename"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                required
                className="mb-3"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mb-3">
              Login
            </Button>
            {!credentialsValid && (
              <p style={{ color: "red" }}>
                CREDENTIALS INVALID! <br />
                Please try with correct credentials.
              </p>
            )}
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default UserLogin;

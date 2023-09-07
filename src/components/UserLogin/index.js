import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const infoUpdated = updateUser(username, password);
    setUserInfoUpdated(infoUpdated);
  };

  useEffect(() => {
    if (userInfoUpdated) {
      if (userInformation?.username) {
        setCredentialsValid(true);
        navigate("/roles");
        // navigate("/myProjects");
      } else {
        setCredentialsValid(false);
        setUsername("");
        setPassword("");
      }
    }
  }, [userInfoUpdated, userInformation, navigate]);
  
  return (
    <div className="login-screen">
      <div className="userList">
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
            {/* <Table /> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default UserLogin;

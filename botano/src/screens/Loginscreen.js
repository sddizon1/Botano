import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

function Loginscreen({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  /////////////////////////////////////////////////////

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  ////////////////////////////////////////////////////

  return (
    <Container>
        <Row>
            
            <h1>Sign In</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                Not Registered Yet?{" "}
                <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                    Register
                </Link>
                </Col>
            </Row>
        </Row>
    </Container>
  );
}

export default Loginscreen;

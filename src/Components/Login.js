import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation, useHistory } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Login = () => {
  const location = useLocation();
  const redirectURL = location.state?.from?.pathname || "/";
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
    return () => setUsers([]);
  }, []);
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const exist = users?.find((user) => {
      return user.email === emailRef.current.value;
    });

    if (exist) {
      const isValidPassword = await bcrypt.compare(
        passwordRef?.current?.value,
        exist.password
      );
      if (exist.name !== nameRef.current.value) {
        alert("Name does not match");
        return;
      } else if (isValidPassword) {
        //generate token
        console.log(process.env.REACT_APP_JWT_SECRET);
        const token = jwt.sign(
          {
            id: exist.id,
            name: exist.name,
            email: exist.email,
          },
          process.env.REACT_APP_JWT_SECRET
        );
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(exist));
        alert("successfully logged in");
        history.push(redirectURL);
      } else {
        alert("wrong password");
      }
    } else {
      alert("user not found. please sign up");
    }
  };

  return (
    <div>
      <h2 className="text-center">Log in</h2>
      <Form onSubmit={handleSubmit} className="w-25 mx-auto my-5">
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            ref={nameRef}
            type="text"
            required
            placeholder="Enter your name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            ref={emailRef}
            type="email"
            required
            placeholder="Enter your email"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            ref={passwordRef}
            placeholder="Enter your password"
          />
        </Form.Group>
        <div className="text-center mb-3">
          Need an account? <Link to="/signup">Sign up</Link>
        </div>
        <Button className="shadow-none w-100" variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </div>
  );
};
export default Login;

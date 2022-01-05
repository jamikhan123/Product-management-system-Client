import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Passwords do not match");
      return;
    }
    axios
      .post(`http://localhost:5000/signup`, {
        name: nameRef?.current?.value,
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      })
      .then((res) => {
        if (res.data.insertedId) {
          alert("successfully signed up");
          history.push("/login");
        } else {
          alert("User already exists");
        }
      });
  };

  return (
    <div>
      <h2 className="text-center">Sign Up</h2>
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
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            ref={confirmPasswordRef}
            placeholder="Confirm your password"
          />
        </Form.Group>
        <div className="text-center mb-3">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
        <Button className="shadow-none w-100" variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default Signup;

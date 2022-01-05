import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router";

const AddProduct = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:5000/addProduct`,
        {
          name: nameRef.current.value,
          price: priceRef.current.value,
          quantity: quantityRef.current.value,
          user,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.insertedId) {
            alert("successfully added");
            history.push("/products");
          }
        } else {
          history.push("/login");
        }
      });
  };

  return (
    <div>
      <h2 className="text-center">Add a Product</h2>
      <Form onSubmit={handleSubmit} className="w-25 mx-auto my-5">
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            ref={nameRef}
            type="text"
            required
            placeholder="Enter product name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            ref={priceRef}
            type="number"
            required
            min="0"
            placeholder="Enter product price"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            ref={quantityRef}
            type="number"
            required
            min="0"
            placeholder="Enter product quantity"
          />
        </Form.Group>
        <Button className="shadow-none w-100" variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;

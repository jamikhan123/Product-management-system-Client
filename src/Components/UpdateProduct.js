import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";

const UpdateProduct = () => {
  const history = useHistory();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => setProduct(res.data));
    return () => {
      setProduct({});
    };
  }, [id]);
  const handleProductName = (e) => {
    const newProductName = e.target.value;
    const newProduct = {
      name: newProductName,
      price: product.price,
      quantity: product.quantity,
    };
    setProduct(newProduct);
  };
  const handleProductPrice = (e) => {
    const newProductPrice = e.target.value;
    const newProduct = {
      name: product.name,
      price: newProductPrice,
      quantity: product.quantity,
    };
    setProduct(newProduct);
  };
  const handleProductQuantity = (e) => {
    const newProductQuantity = e.target.value;
    const newProduct = {
      name: product.name,
      price: product.price,
      quantity: newProductQuantity,
    };
    setProduct(newProduct);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.patch(`http://localhost:5000/products/${id}`, product).then((res) => {
      if (res.data.modifiedCount) {
        history.push("/products");
      }
      e.target.reset();
    });
  };
  return (
    <div>
      <h2 className="text-center">Update product</h2>
      <Form onSubmit={handleSubmit} className="w-25 mx-auto my-5">
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            onChange={handleProductName}
            value={product.name || ""}
            type="text"
            placeholder="Enter product name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Price</Form.Label>
          <Form.Control
            onChange={handleProductPrice}
            value={product.price || ""}
            type="number"
            min="0"
            placeholder="Enter product price"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Product Quantity</Form.Label>
          <Form.Control
            onChange={handleProductQuantity}
            value={product.quantity || ""}
            type="number"
            min="0"
            placeholder="Enter product quantity"
          />
        </Form.Group>
        <Button className="shadow-none w-100" variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProduct;

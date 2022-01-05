import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";

const Products = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/products`, user, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setProducts(res.data);
        } else {
          history.push("/login");
        }
      });
  }, [history, token, user]);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/products/${id}`, user, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.deletedCount) {
            const confirmDelete = window.confirm(
              "Are you sure you wanna delete it?"
            );
            if (confirmDelete) {
              const remainingProducts = products.filter(
                (product) => product._id !== id
              );
              setProducts(remainingProducts);
            }
          }
        } else {
          history.push("/login");
        }
      });
  };
  const handleUpdate = (id) => {
    history.push(`/product/update/${id}`);
  };
  return (
    <div>
      <h2 className="text-center">Added Products: {products.length}</h2>
      <Row className="my-5 mx-5" xs={1} md={3}>
        {products?.map((product) => {
          const { name, price, quantity, _id } = product;
          return (
            <Card
              key={_id}
              variant="dark"
              style={{ width: "18rem" }}
              className="m-2 text-center"
            >
              <Card.Body>
                <Card.Title>
                  <h2>{name}</h2>
                </Card.Title>
                <Card.Body>
                  <h5>Quantity: {quantity}</h5>
                  <h4>Price: ${price}</h4>
                </Card.Body>
                <Button
                  onClick={() => handleDelete(_id)}
                  className="me-3 shadow-none"
                  variant="danger"
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleUpdate(_id)}
                  className="shadow-none"
                  variant="success"
                >
                  Update
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </div>
  );
};

export default Products;

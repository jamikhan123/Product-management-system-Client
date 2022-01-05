import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./Components/Products";
import Navigation from "./Components/Navigation";
import AddProduct from "./Components/AddProduct";
import UpdateProduct from "./Components/UpdateProduct";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import PrivateRoute from "./private/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/products">
            <Products />
          </PrivateRoute>
          <PrivateRoute path="/product/update/:id">
            <UpdateProduct />
          </PrivateRoute>
          <PrivateRoute to="/addProduct">
            <AddProduct />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

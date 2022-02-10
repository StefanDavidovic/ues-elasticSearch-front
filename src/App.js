import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import { PrivateRoute } from "./components/PrivateRoute";

import Login from "./components/login.component";
import UserComponent from "./components/user.component";

import ArticleComponent from "./components/article.component";
import Orderss from "./components/Orders";
import ResetPassword from "./components/ResetPassword";
import NewProduct from "./components/add.article.component";
import Register from "./components/register.component";
import RegisterSalesmenComponent from "./components/registerSalesmenComponent";
import Orders from "./components/Order";

import ViewArtical from "./components/CRUDArtical/ViewArtical";
import EditArticle from "./components/CRUDArtical/EditArticle";
import AddArticle from "./components/CRUDArtical/AddArticle";
import Profile from "./components/profile.component";
import AddArticle2 from "./components/add.article.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import ShoppingCart from "./components/ShoppingCart";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("SALESMEN"),
        showAdminBoard: user.roles.includes("ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/articles"} className="navbar-brand">
            SHOP
          </Link>
          <div className="navbar-nav mr-auto">
            {currentUser && (
              <li className="nav-item">
                <Link to={"/articles"} className="nav-link">
                  Artikli
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/cart"} className="nav-link">
                  Shopping Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/orders"} className="nav-link">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/registerSalesmen"} className="nav-link">
                  Register Salesmen
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Buyer Register
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            {/* <Route exact path="/home" component={ArticleComponent} /> */}
            <Route exact path="/articles" component={ArticleComponent} />
            <Route exact path="/login" component={Login} />
            {/* <Route exact path="/new" component={NewProduct} /> */}
            <Route exact path="/viewArticle/:id" component={ViewArtical} />
            {/* <Route exact path="/updateArticle/:id" component={EditArticle} /> */}
            {/* <Route exact path="/cart" component={Orders} /> */}
            {/* <Route exact path="/users" component={UserComponent} /> */}

            <PrivateRoute
              exact
              path="/addArticle"
              component={AddArticle}
              roles={["SALESMEN"]}
            />

            <PrivateRoute
              exact
              path="/updateArticle/:id"
              component={EditArticle}
              roles={["SALESMEN"]}
            />
            <PrivateRoute
              exact
              path="/cart"
              component={ShoppingCart}
              roles={["BUYER"]}
            />
            <PrivateRoute
              exact
              path="/reset-password"
              component={ResetPassword}
              roles={["SALESMEN", "BUYER"]}
            />
            <PrivateRoute
              exact
              path="/orders"
              component={Orderss}
              roles={["BUYER", "SALESMEN"]}
            />
            <PrivateRoute
              exact
              path="/deleteArticle/:id"
              // component={EditArticle}
              roles={["SALESMEN"]}
            />

            <PrivateRoute
              exact
              path="/users"
              component={UserComponent}
              roles={["ADMIN"]}
            />

            <Route exact path="/register" component={Register} />
            <Route
              exact
              path="/registerSalesmen"
              component={RegisterSalesmenComponent}
            />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

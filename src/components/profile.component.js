import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  handleChange(){
    this.props.history.push("/reset-password");
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          Username:{currentUser.username}<br/>
          Role:{currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </header>
        </div>
    :<p>UserProfile</p>}
    
    <button onClick={this.handleChange}>Change Password</button>
    
    </div>
  )}
}

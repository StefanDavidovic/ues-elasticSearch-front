import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import UserService from "../services/UserService";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
    this.onChangeRepeatPassword = this.onChangeRepeatPassword.bind(this);

    this.state = {
      username: "",
      password: "",
      newPassword: "",
      repeatPassword: "",
      loading: false,
      message: "",
      user: ''
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const user = UserService.getUserByUsername(currentUser.username).then(result => this.setState({ user: result.data}))
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeNewPassword(e) {
    this.setState({
      newPassword: e.target.value
    });
  }

  onChangeRepeatPassword(e) {
    console.log(this.state.newPassword)
    this.setState({
      repeatPassword: e.target.value
    });
  }

  handleLogin= (e) => {
  e.preventDefault();
    let user = {username:this.state.user.username, firstname:this.state.user.firstname,
      lastname:this.state.user.lastname, password:this.state.newPassword, blocked:false}
    UserService.resetPassword(user).then(res => {
      this.props.history.push("/profile");
      console.log("Order")
    });
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >


            <div className="form-group">
              <label htmlFor="password">Current Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <Input
                type="password"
                className="form-control"
                name="newPassword"
                value={this.state.newPassword}
                onChange={this.onChangeNewPassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <Input
                type="password"
                className="form-control"
                name="repeatPassword"
                value={this.state.repeatPassword}
                onChange={this.onChangeRepeatPassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Reset</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

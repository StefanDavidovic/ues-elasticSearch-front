import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const name = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Input product name.
      </div>
    );
  }
};

const description = value => {
  if (value.length < 3 || value.length > 200) {
    return (
      <div className="alert alert-danger" role="alert">
        Input description.
      </div>
    );
  }
};

const price = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Input price.
      </div>
    );
  }
};

const image_src = value => {
    if (value) {
      return (
        <div className="alert alert-danger" role="alert">
          Input image.
        </div>
      );
    }
  };


export default class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice= this.onChangePrice.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);

    this.state = {
      name: "",
      description: "",
      price: "",
      image_src: "",
      message: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeImage(e) {
    this.setState({
      image_src: e.target.value
    });
  }

 
  handleRegister(e) {
    e.preventDefault();

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.name,
        this.state.description,
        this.state.price,
        this.state.image_src,
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
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

          <Form>
            {!this.state.successful && (
              <div>

                <div className="form-group">
                  <label htmlFor="image_src">Image</label>
                  <Input
                    type="file"
                    className="form-control"
                    name="image_src"
                    value={this.state.image_src}
                    onChange={this.onChangeImage}
                    validations={[required, image_src]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChangeName}
                    validations={[required, name]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    validations={[required, description]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="price"
                    value={this.state.price}
                    onChange={this.onChangePrice}
                    validations={[required, price]}
                  />
                </div>



              

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Add</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
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

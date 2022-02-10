import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import ArticleService from "../services/ArticleService";

export default class ShoppingCart extends Component{
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      totalPrice: 0,
    };
  }

  totalPriceFun(arr) {
    arr.forEach(art => {
      this.setState({
        totalPrice: this.totalPrice +  (art.qty * art.price)
      })
      
    });
  }

  componentDidMount() {
    ArticleService.getCarts().then(
      response => {
        console.log(response.data[0])
        this.setState({
          articles: response.data
        });
        response.data.forEach(art => {
          this.setState({
            totalPrice: this.state.totalPrice + (art.price * art.qty)
          })

        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString() ||
            console.log("GRESKAAA")
        });
      }

    );
  }

  deleteFromCartt(id){
    ArticleService.deleteFromCart(id).then(res => {
      console.log(this.state.articles)
        this.setState({articles: this.state.articles.filter(articles => articles.id !== id)});
    });

}


  handleOrder = (e) =>{
    e.preventDefault();
    ArticleService.order(this.state.totalPrice).then(res => {
      console.log("Order")
      window.location.reload();
  });
    
  }

  

  render() {
    return (
      <div className="col-md-12">
        <div className="containerr">
          <h1 className="shoppingCartH1">Shopping Cart</h1>
          <div className="tableDiv">
            <table style={{width:"100%"}}>
              <thead>
                <tr>
                  {/* <th>Image</th> */}
                  <th>Name</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {this.state.articles.map(art => 
                  <tr key = {art.product_id.id} className="tablerow">
                    {/* <td> <img alt="" src={`http://localhost:8096/api/articles/getImage/${art.product_id.image_src}`} width="70px" height="70px"/></td> */}
                    <td>{art.product_id.name}</td>
                    <td>{art.product_id.price}</td>
                    <td>{art.qty}</td>
                    <td>{(art.qty)*art.price}</td>
                    <button style={{marginLeft: "10px"}} onClick={ () => this.deleteFromCartt(art.id)} className="btn btn-danger">Delete</button>
                  </tr>
                )}
              
              </tbody>
              
            </table>
           
          </div>
          <div className="total">
            <p className="totalPrice"><b>Ukupno: </b><span>{this.state.totalPrice}</span></p>
            <br/><button className="btn btn-success pay" onClick={this.handleOrder}>Poruci</button>
          </div>
        </div>

      </div>
    )
  }
}
import React from 'react'
import Menu from '../components/Menu'
import ArticleService from '../services/ArticleService'
import MyCart from '../components/MyCart'

class Orders extends React.Component {
constructor(){
    super();
    this.state = {

        id:'',
        list: ArticleService.getArticles(),
        newList:[],
        price:'',
        name:[],
        total:0,
        quantity:0,
        clickable: false
    };
}
childHandler = (ChildPrice,ChildName,ChildQuantity) => {

    this.setState(
        {price: ChildPrice,
        name: ChildName,
        quantity : ChildQuantity+1,
        clickable: true }
    )};
render(){
    return(
    <div>
         <div id='items'>
                    <center><h2>Order Now</h2></center>
                    <br/>

                    {this.state.newList.map (
                        x => x.menu.map(item => <Menu
                                                    desc={item.desc} 
                                                    price={item.price} 
                                                    name={item.name}
                                                    action={this.childHandler} />)
                    )       

                    }

                </div>
        <div id= "right-in">
            <h4>My Cart</h4>

            { this.state.clickable && 
                <div>
                    <MyCart 
                        name={this.state.name}
                        price={this.state.price}
                        quantity={this.state.quantity} 
                        increment={this.incrementQuantity} 
                        decrement={this.decrementQuantity}>
                    </MyCart>
                </div>
            }

            <div id="total">
                <p id="total"> Total amount: 
                    <span className="spn">  {this.state.total}</span>
                </p>
                <input id="pay" type="button" value="Calculate"
                onClick = {() => this.total(this.state.price,this.state.quantity)} />
                <br/>
                <input id="pay" type="button" value="Pay Now"/>
            </div>
        </div> 
    </div>)
    }
}

export default Orders;

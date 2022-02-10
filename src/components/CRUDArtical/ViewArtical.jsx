import React, { Component } from 'react'
import ArticleService from '../../services/ArticleService';

class ViewArtical extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            artikli: {},
            qty: 1,
        }
        
}

componentDidMount(){
    ArticleService.getArticleById(this.state.id).then(res => {
        this.setState({artikli: res.data});
    });
}

handleChange = (e)=> {
    this.setState({ qty: e.target.value });
    console.log("Fruit Selected!!" + this.state.qty);
}

addToCart = (e) =>{
    e.preventDefault();
    let article = ArticleService.getArticleById(this.state.id)
    
    article.then(value => {
        console.log(value)
        let article = {product:value.data.name,price:value.data.price}
        ArticleService.addToCart(article, this.state.qty).then(res => {
            this.props.history.push('/articles');
        });
    })
    
}

cancel(){
    this.props.history.push('/articles');
}

    render(){
        return(
            <div>
                <div className="card col-md-6 offset-md-3">
                    <h2 className="text-center">{this.state.artikli.name}</h2>
                    <div className="card-body">
                    {/* <td> <img alt="" src={`http://localhost:8096/api/articles/getImage/${this.state.artikli.image_src}`} width="70px" height="70px"/></td> */}
                        <div className="row">
                            <label style={{color:"blue"}}>Vrsta : {this.state.artikli.name}</label>
                        </div><br></br>
                        <div className="row">
                            <label style={{color:"blue"}}>Opis : {this.state.artikli.description}</label>
                        </div><br></br>
                        <div className="row">
                            <label style={{color:"blue"}}>Cena : {this.state.artikli.price}</label>
                        </div><br></br>
                        <label htmlFor="qty">Kolicina:</label>

                        <select name="qty" id="qty" onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </select>

                        
                    </div>
                    <button onClick={this.addToCart}>Add to Cart</button>

                    
                </div>
            </div>
        )
    }

}

export default ViewArtical;
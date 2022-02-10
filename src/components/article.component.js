import React, { useContext } from "react";
import ArticleService from "../services/ArticleService";
import UserService from "../services/UserService";
import AuthService from "../services/auth.service";

export default class ArticleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      search: "",
      minPrice:'',
      maxPrice:'',
      role:''
    };

    this.addArticle = this.addArticle.bind(this);
    this.viewArticle = this.viewArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.getImages = this.getImages.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.changeSearchPriceMin = this.changeSearchPriceMin.bind(this);
    this.changeSearchPriceMax = this.changeSearchPriceMax.bind(this);
    this.searchByPrice = this.searchByPrice.bind(this);
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    this.setState({ role: currentUser.roles[0]});

    if(currentUser.roles[0]== "BUYER"){
      ArticleService.getArticles().then((response) => {
        this.setState({ articles: response.data });
      });
    }else{
      ArticleService.getArticlesForSalesmen(currentUser.username).then((response) => {
        this.setState({ articles: response.data });
      });
    }
  }
  viewArticle(id) {
    this.props.history.push(`viewArticle/${id}`);
  }

  addArticle() {
    this.props.history.push("/addArticle");
  }

  deleteArticle(id) {
    ArticleService.deleteArticle(id).then((res) => {
      this.setState({
        artikli: this.state.articles.filter((articles) => articles.id !== id),
      });
      console.log(id);
    });
  }

  getImages(image_src) {
    ArticleService.getImages(image_src).then((res) => {
      this.state({ image: res.data });
    });
  }

  editArticle(id) {
    this.props.history.push(`/updateArticle/${id}`);
  }

  changeSearch = (event, value) => {
    console.log(this.state.role)
    ArticleService.getArticlesName(event.target.value).then((response) => {
      this.setState({ articles: response.data });
    });
  };

  changeSearchPriceMin= (event, value) => {
      this.setState({minPrice:event.target.value})
  };

  changeSearchPriceMax= (event, value) => {
    this.setState({maxPrice:event.target.value})
  };

  searchByPrice = () =>{
    ArticleService.getArticlesPrice(this.state.minPrice, this.state.maxPrice).then((response) => {
        this.setState({ articles: response.data });
      });
  }

  

  render() {
    return (
      <div>
        <h1 className="text-center"> Artikli </h1>

        <div className="row">
          <label htmlFor="search">
            <input
              placeholder="Search"
              id="search"
              type="text"
              onChange={this.changeSearch}
            />
          </label>

          <label style={{margin:10}} htmlFor="minPrice">
            <input
              placeholder="min"
              id="minPrice"
              type="number"
              onChange={this.changeSearchPriceMin}
            />
          </label>
          <label htmlFor="maxPrice">
            <input
              placeholder="max"
              id="maxPrice"
              type="number"
              onChange={this.changeSearchPriceMax}
            />
          </label>
          <button style={{height:32, margin:8}} onClick={this.searchByPrice}>Search</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>
                <b>Description</b>
              </td>
              <td>
                <b>Price</b>
              </td>
              <td>
                <b>Actions</b>
              </td>
            </tr>
          </thead>

          <tbody>
            {this.state.articles.map((article) => (
              <tr key={article.id}>
                {/* <td> <img alt="" src={`http://localhost:8096/api/articles/getImage/${article.image_src}`} width="70px" height="70px"/></td> */}
                <td> {article.name}</td>
                <td>{article.description}</td>
                <td>{article.price}</td>
                <td>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => this.viewArticle(article.id)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => this.editArticle(article.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => this.deleteArticle(article.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success" onClick={this.addArticle}>
          Add
        </button>
      </div>
    );
  }
}

import React, { useContext } from "react";
import ArticleService from "../services/ArticleService";
import shortid from 'shortid';


export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      search: "",
      minRate:'',
      maxRate:''
    };

    this.changeSearch = this.changeSearch.bind(this);
    this.changeSearchRateMin = this.changeSearchRateMin.bind(this);
    this.changeSearchRateMax = this.changeSearchRateMax.bind(this);
    this.searchByRate = this.searchByRate.bind(this);
  }

  componentDidMount() {
    ArticleService.getOrders().then((response) => {
      this.setState({ articles: response.data });
    });
  }

  changeSearch = (event, value) => {
    console.log(this.state.articles)
    ArticleService.getOrdersComment(event.target.value).then((response) => {
      this.setState({ articles: response.data });
    });
  };

  changeSearchRateMin= (event, value) => {
      this.setState({minRate:event.target.value})
  };

  changeSearchRateMax= (event, value) => {
    this.setState({maxRate:event.target.value})
  };

  searchByRate = () =>{
    ArticleService.getOrdersRate(this.state.minRate, this.state.maxRate).then((response) => {
        this.setState({ articles: response.data });
      });

  }

  

  render() {
    return (
      <div>
        <h1 className="text-center"> Orders </h1>

        <div className="row">
          <label htmlFor="search">
            <input
              placeholder="Search"
              id="search"
              type="text"
              onChange={this.changeSearch}
            />
          </label>
          
          <label style={{margin:10}} htmlFor="minRate">
            Rate from:
            <input
              placeholder="min"
              id="minRate"
              type="number"
              onChange={this.changeSearchRateMin}
            />
          </label>
          <label htmlFor="maxRate">
            to:
            <input
              placeholder="max"
              id="maxRate"
              type="number"
              onChange={this.changeSearchRateMax}
            />
          </label>
          <button style={{height:32, margin:8}} onClick={this.searchByRate}>Search</button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <td>
                <b>Date</b>
              </td>
              <td>
                <b>Comment</b>
              </td>
              <td>
                <b>Rate</b>
              </td>
              <td>
                <b>Is Annonymous</b>
              </td>

            </tr>
          </thead>

          <tbody>
            {this.state.articles.map((article) => (
              <tr key={shortid.generate()}>
                {/* <td> <img alt="" src={`http://localhost:8096/api/articles/getImage/${article.image_src}`} width="70px" height="70px"/></td> */}
                <td> {article.date[0]+'-'+article.date[1]+'-'+article.date[2]}</td>
                <td>{article.comment}</td>
                <td>{article.rate}</td>
                <td>{article.annonymousComment ? 'annonymous' : 'public'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

import axios from "axios";

const ARTICLES_REST_API_URL = "http://localhost:8096/api/articles";

class ArticleService {
  getArticles2() {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.get(ARTICLES_REST_API_URL, {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
      },
    });
  }

  getArticlesForSalesmen(username) {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.get("http://localhost:8096/api/productsElastic/salesmen/" + username, {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
      },
    });
  }

  getOrders() {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.get("http://localhost:8096/api/ordersElastic", {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
      },
    });
  }

  getOrdersComment(comment) {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.get("http://localhost:8096/api/ordersElastic/"+comment, {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
      },
    });
  }

  getOrdersRate(minRate, maxRate) {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.get(`http://localhost:8096/api/ordersElastic/rate?minRate=${minRate}&maxRate=${maxRate}`, {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
      },
    });
  }

  getArticles() {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.get("http://localhost:8096/api/productsElastic", {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
      },
    });
  }

  getArticlesName(name) {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.get("http://localhost:8096/api/productsElastic/" + name, {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
      },
    });
  }

  getArticlesPrice(minPrice, maxPrice) {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.get(
      `http://localhost:8096/api/productsElastic/price?minPrice=${minPrice}&maxPrice=${maxPrice}`,
      {
        headers: {
          Authorization: `Bearer ${json.accessToken}`,
        },
      }
    );
  }

  getCarts() {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.get(ARTICLES_REST_API_URL + "/carts/", {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
      },
    });
  }

  createArticle(article) {
    let user = localStorage.getItem("user");
    let json = JSON.parse(user);
    const formdata = new FormData();
    formdata.append("name", article.name);
    formdata.append("description", article.description);
    formdata.append("price", article.price);
    formdata.append("username", json.username);
    let articlee = {...article, username:json.username}
    console.log(articlee);
    return axios.post("http://localhost:8096/api/productsElastic", articlee, {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
    });
  }

  createArticle2(article) {
    let user = localStorage.getItem("user");
    let json = JSON.parse(user);
    const formdata = new FormData();
    formdata.append("name", article.name);
    formdata.append("description", article.description);
    formdata.append("price", article.price);
    // formdata.append("image_src", "slika.jpg")
    formdata.append("user", json.id);
    console.log(formdata);
    return axios.post("http://localhost:8096/api/articles/new", formdata, {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
    });
  }

  addToCart(article, qty) {
    console.log(article.product)
    let user = localStorage.getItem("user");
    let json = JSON.parse(user);
    // let article = {articlee, username:json.username}
    const formdata = new FormData();
    formdata.append("product", article.product);
    formdata.append("price", parseFloat(article.price));
    formdata.append("qty", qty);
    console.log(formdata.product);
    return axios.post(ARTICLES_REST_API_URL + "/addToCart", formdata, {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
    });
  }

  order(price) {
    let user = localStorage.getItem("user");
    let json = JSON.parse(user);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;

    console.log(json);
    const formdata = new FormData();
    formdata.append("date", today);
    formdata.append("delivered", false);
    formdata.append("rate", 3);
    formdata.append("comment", "Komentar");
    formdata.append("price", price);
    formdata.append("anonymousComment", true);
    formdata.append("archivedComment", false);
    formdata.append("username", json.username);
    let order = {"date":today, "delivered":false,"rate":1,"comment":"Komentar","price":price,"anonymousComment":false,
    "archivedComment":false,"username":json.username}
    console.log(price, json.username);
    return axios.post("http://localhost:8096/api/ordersElastic", order, {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
    });
  }

  getArticleById(articleId) {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.get(
      "http://localhost:8096/api/productsElastic/id" + "/" + articleId,
      {
        headers: {
          Authorization: `Bearer ${json.accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
      }
    );
  }

  updateArticle(article, articleId) {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    console.log("username:"+json.username)
    let articlee = {...article, username:json.username}
    return axios.put(
      "http://localhost:8096/api/productsElastic/update" + "/" + articleId,
      articlee,
      {
        headers: {
          Authorization: `Bearer ${json.accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
      }
    );
  }

  deleteArticle(articleId) {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.delete(
      "http://localhost:8096/api/productsElastic" + "/" + articleId,
      {
        headers: {
          Authorization: `Bearer ${json.accessToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
          "Access-Control-Allow-Credentials": "true",
          "Content-Type": "application/json",
        },
      }
    );
  }

  deleteFromCart(articleId) {
    let user = localStorage.getItem("user");
    var json = JSON.parse(user);
    return axios.delete(ARTICLES_REST_API_URL + "/carts/" + articleId, {
      headers: {
        Authorization: `Bearer ${json.accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json",
      },
    });
  }
}

export default new ArticleService();

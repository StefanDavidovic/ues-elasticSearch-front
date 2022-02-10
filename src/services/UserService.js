import axios from 'axios'

const ARTICLES_REST_API_URL = 'http://localhost:8096/api/users';

class UserService{
    getArticles(){

        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        return axios.get(ARTICLES_REST_API_URL, {
            headers: {
                'Authorization': `Bearer ${json.accessToken}`
              }
        });
    }

    getImages(image_src){

        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        return axios.get(ARTICLES_REST_API_URL + "/getImage/" + image_src, {
            headers: {
                'Authorization': `Bearer ${json.accessToken}`
              }
        });
    }

    createArticle(article){
        let user = localStorage.getItem("user")
        let json = JSON.parse(user);
        const formdata = new FormData();
        formdata.append("name", article.name)
        formdata.append("description", article.description)
        formdata.append("price", article.price)
        formdata.append("image_src", article.image_src)
        return axios.post(ARTICLES_REST_API_URL + "/new", formdata, {headers: {
            'Authorization': `Bearer ${json.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type':  'multipart/form-data'
          }});
    }

    getArticleById(username){
        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        return axios.get(ARTICLES_REST_API_URL + '/' + username, {headers: {
            'Authorization': `Bearer ${json.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type':  'application/json'
          }})
    }

    getUserByUsername(articleId){
        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        return axios.get("http://localhost:8096/api/users/username" + '/' + articleId, {headers: {
            'Authorization': `Bearer ${json.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type':  'application/json'
          }})
    }

    updateArticle(article, articleId){
        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        const formdata = new FormData();
        formdata.append("name", article.name)
        formdata.append("description", article.description)
        formdata.append("price", article.price)
        formdata.append("image_src", article.image_src)
        return axios.put(ARTICLES_REST_API_URL + '/' + articleId, formdata, {headers: {
            'Authorization': `Bearer ${json.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type':  'multipart/form-data'
          }});
    }

    resetPassword(user){
        let userr = localStorage.getItem("user")
        var json = JSON.parse(userr);
        const formdata = new FormData();
        formdata.append("username", user.username)
        formdata.append("firstname", user.firstname)
        formdata.append("lastname", user.lastname)
        formdata.append("password", user.password)
        formdata.append("blocked", false)
        return axios.put("http://localhost:8096/api/users/change-password" + '/' + user.username, user, {headers: {
            'Authorization': `Bearer ${json.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type':  'application/json'
          }});
    }

    deleteArticle(articleId){
        let user = localStorage.getItem("user")
        var json = JSON.parse(user);
        return axios.delete(ARTICLES_REST_API_URL + '/' + articleId, {headers: {
            'Authorization': `Bearer ${json.accessToken}`,
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods":"DELETE, POST, GET, OPTIONS",
            'Access-Control-Allow-Credentials': 'true',
            'Content-Type':  'application/json'
          }});
    }
}

export default new UserService();

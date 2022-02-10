import axios from "axios";
import { TokenService } from "./TokenService";

const API_URL = "http://localhost:8096/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        username,
        password
      })
      .then(response => {

        if (response.data.accessToken) {
          console.log(response.data)
          localStorage.setItem("user", JSON.stringify(response.data));

        }
        console.log(response.data)
        return response.data;
      });
  }


  // resetPassword(user,newPassword) {
  //   return axios
  //     .post("http://localhost:8096/api/users/change-password/"+username, {
  //       user,
  //       newPassword
  //     })
  //     .then(response => {

  //       if (response.data.accessToken) {
  //         console.log(response.data)
  //         localStorage.setItem("user", JSON.stringify(response.data));

  //       }
  //       console.log(response.data)
  //       return response.data;
  //     });
  // }

  logout() {
    localStorage.removeItem("user");
  }

  register(firstname, lastname, username,   password, adress) {
    return axios.post(API_URL + "buyer/signup", {
      firstname,
      lastname,
      username,
      password,
      adress
    });
  }

  registerSalesman(firstname, lastname, username,   password, adress) {
    return axios.post(API_URL + "salesmen/signup", {
      firstname,
      lastname,
      username,
      password,
      adress
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getRole() {
      console.log("BLAA")
    const token = TokenService.getToken();
    console.log("eoooo" + token)
    const decoded_token = token ? TokenService.decodeToken(token) : null;
        console.log(decoded_token)

    if (decoded_token) {
      
      return decoded_token.role.authority;
    } else {
      return null;
    }
  }

}

export default new AuthService();

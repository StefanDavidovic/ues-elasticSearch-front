import jwtDecode from "jwt-decode";


export const TokenService = {
  getToken,
  setToken,
  removeToken,
  decodeToken,
  didTokenExpire,
};

function getToken() {
  let user = localStorage.getItem("user")
  var json = JSON.parse(user);
  console.log('getToken: ' + json.accessToken)
  return json.accessToken;
  
}

function setToken(value) {
  let user = localStorage.getItem("user")
  var json = JSON.parse(user);
  localStorage.setItem("accessToken", value);
}

function removeToken() {
  let user = localStorage.getItem("user")
  var json = JSON.parse(user);
  localStorage.removeItem("accessToken");
}

function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
}

function didTokenExpire() {
  const token = getToken();
  const decodedToken = token ? decodeToken(token) : null;
  return decodedToken ? decodedToken.exp_date < Date.now() : null;
}
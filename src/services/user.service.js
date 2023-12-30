import { storageService } from "./async-storage.service.js";
import { httpService } from "./http.service.js";

const BASE_URL = "auth/";
const STORAGE_KEY_LOGGEDIN = "loggedinUser";

export const userService = {
  login,
  logout,
  signup,
  getById,
  getLoggedinUser,
  getEmptyCredentials,
  isAdmin,
};

function isAdmin() {
  var isAdmin = false;
  if (getLoggedinUser() && getLoggedinUser().isAdmin) {
    isAdmin = true;
  }
  return isAdmin;
}

function getById(userId) {
  return httpService.get(BASE_URL + userId);
}

async function login({ username, password }) {
  try {
    const user = await httpService.post(BASE_URL + "login", {
      username,
      password,
    });
    if (user) return _setLoggedinUser(user);
    return Promise.reject("Invalid login");
  } catch (err) {
    return Promise.reject("Invalid login");
  }

  // return httpService.post(BASE_URL + 'login', { username, password })
  //     .then(user => {
  //         if (user) return _setLoggedinUser(user)
  //         else return Promise.reject('Invalid login')
  //     })
}

async function signup({ username, password, fullname }) {
  const user = { username, password, fullname };
  try {
    const signedUser = await httpService.post(BASE_URL + "signup", user);
    if (signedUser) return _setLoggedinUser(signedUser);
    return Promise.reject("Invalid signup");
  } catch {
    return Promise.reject("Invalid signup");
  }

  //   return httpService.post(BASE_URL + "signup", user).then((user) => {
  //     if (user) return _setLoggedinUser(user);
  //     else return Promise.reject("Invalid signup");
  //   });
}

// function updateScore(diff) {

//   if (getLoggedinUser().score + diff < 0) return Promise.reject("No credit");
//   return httpService.put("user/", { diff }).then((user) => {
//     _setLoggedinUser(user);
//     return user.score;
//   });
// }

async function logout() {
  try {
    await httpService.post(BASE_URL + "logout");
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
  } catch (err) {
    //   return httpService.post(BASE_URL + "logout").then(() => {
    //     sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
    //   });
    console.log("err:" + err);
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    isAdmin: user.isAdmin,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave));
  return userToSave;
}

function getEmptyCredentials() {
  return {
    username: "",
    password: "",
    fullname: "",
  };
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})

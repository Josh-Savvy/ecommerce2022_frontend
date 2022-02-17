import Cookies from "js-cookie";

// Set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    Cookies.set(key, value, {
      expires: 1,
    });
  }
};
// Remove from Cookies
export const removeCookie = (key) => {
  if (process.browser) {
    Cookies.remove(key);
  }
};
// Get cookies from cookies in the browser
// will be later used to make request to server with auth token
export const getCookieFromBrowser = (key) => {
  return Cookies.get(key);
};
export const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  let token = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!token) {
    return undefined;
  }
  let tokenValue = token.split("=")[1];
  return tokenValue;
};
// getCookie
export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

// Set Token in localstorage
export const setLocalStorage = (key, value, exp) => {
  if (process.browser) {
    const data = {
      value: value,
      expiry: new Date().getTime() + exp,
    };
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
};
// Remove token from localstorage
export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

// Authenticate user by passing into cookies and localstorage
export const authenticate = (response, next) => {
  if (response) {
    setCookie("token", response.data.token);
    setLocalStorage("user", response.data.user, 24 * 60 * 60 * 1000);
  }
  next();
};

// Access user from localStorage
export const isAuth = () => {
  if (process.browser) {
    const cookieCheck = getCookie("token");
    if (cookieCheck) {
      const storageCheck = localStorage.getItem("user");
      if (storageCheck) {
        const item = JSON.parse(storageCheck);
        const now = new Date();
        if (now.getTime() > item.expiry) {
          removeLocalStorage("user");
          return null;
        }
        return item.value;
      } else {
        return false;
      }
    }
  }
};

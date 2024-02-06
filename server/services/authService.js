// AuthService.js
const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };
  
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find((cookie) => cookie.includes(name));
    return cookie ? cookie.split('=')[1].trim() : null;
  };
  
  const removeCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  
  export { setCookie, getCookie, removeCookie };
  
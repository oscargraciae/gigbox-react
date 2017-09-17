import Cookie from 'js-cookie';

export const setToken = (token, user) => {
  if (!process.browser) {
    return;
  }

  window.localStorage.setItem('token', token);
  window.localStorage.setItem('user', user);
  Cookie.set('token', token, { expires: 365 });
  Cookie.set('user', user, { expires: 365 });
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('user');
  Cookie.remove('user');
  Cookie.remove('token');
};

export const getUserFromCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined;
  }

  const user = req.headers.cookie.split(';').find(c => c.trim().startsWith('user='));
  if (!user) {
    return undefined;
  }
  const jwt = user.split('=')[1];
  return JSON.parse(jwt);
};

export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('token='));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split('=')[1];
  return jwt;
};


export const getUserFromLocalStorage = () => {
  const json = window.localStorage.user;
  return json ? JSON.parse(json) : undefined;
};

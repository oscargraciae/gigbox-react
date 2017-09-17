import { setToken } from '../utils/auth';
import api from '../api';

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    payload: user,
  };
}

export function login(email, password) {
  return async (dispatch) => {
    const res = await api.user.authentication(email, password);
    if (res.data.status === 'error') {
      return res;
    }
    const token = res.data.token;
    const user = JSON.stringify(res.data.user);
    setToken(token, user);
    dispatch(setCurrentUser(res.data));

    return res;
  };
}

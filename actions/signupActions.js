import api from '../api';

export function setSignup(user) {
  return {
    type: 'SET_SIGNUP',
    payload: user,
  };
}

export function userSignupRequest(userData) {
  return async (dispatch) => {
    const res = await api.user.create(userData);
    return res;
  };
}

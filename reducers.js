import { fromJS } from 'immutable';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_SERVICE':
      return state.set('service', fromJS(action.payload));
    case 'SET_SIGNUP':
      return state.set('auth', fromJS(action.payload));
    case 'SET_CURRENT_USER':
      return state.set('auth', fromJS(action.payload));
    default:
      return state;
  }
}

export default reducer;

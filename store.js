import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const data = {
  service: {},
  auth: {
    isAuthenticated: false,
    user: {},
    token: '',
  },
};

export const makeStore = (initialState = data) => {
  return createStore(
    reducers,
    fromJS(initialState),
    composeWithDevTools(applyMiddleware(thunk)),
  );
};

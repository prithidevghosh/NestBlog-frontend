import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import blogReducer from './blog';
import quoteReducer from './quote';

const reducers = combineReducers({
    blogReducer,
    quoteReducer
});

const middlewares = applyMiddleware(thunk);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(middlewares),
);

export default store;

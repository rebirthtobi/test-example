import { applyMiddleware, createStore, compose } from "redux";
import thunk from 'redux-thunk';
import reducers from './reducers/index';

const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, composeEnhancers(middleware));

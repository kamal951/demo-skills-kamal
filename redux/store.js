import { createStore, applyMiddleware  } from 'redux';
import rootReducer from './reducers/index';
import {login, watchlist} from './actions/userAction'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(rootReducer, composeWithDevTools( applyMiddleware(thunkMiddleware)));
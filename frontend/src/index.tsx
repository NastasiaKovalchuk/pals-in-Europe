import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import initState from './components/redux/initState';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { rootReducer } from './components/redux/reducers/rootReducer';


const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk))
);

export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


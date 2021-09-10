import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import initState from './components/redux/initState';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import { rootReducer } from './components/redux/reducers/rootReducer';
import { Provider } from 'react-redux';
import  createSagaMiddleware from "redux-saga";
import { categoryWatcher } from "./components/redux/saga/saga"

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(categoryWatcher)

export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


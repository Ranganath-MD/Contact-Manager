import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from "./redux-store/store"

const store = configureStore()

store.subscribe(() => {
  return store.getState()
})



const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(jsx,document.getElementById('root'))

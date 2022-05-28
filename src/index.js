import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureAppStore from './store/configureStore';
//import 'jquery-ui/themes/base/images';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/toastr.min.css';
import './assets/css/style.css';
import 'bootstrap/dist/js/bootstrap';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/resizable';
import './assets/js/script.js';

const store = configureAppStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}> <App /></Provider>
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

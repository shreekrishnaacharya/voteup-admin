import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import App from "./App";
import store from "./redux/store";
import { SnackbarProvider } from 'notistack';
import TokenService from "_services/token.service";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
TokenService.store = store;
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <SnackbarProvider maxSnack={5}>
          <App />
        </SnackbarProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

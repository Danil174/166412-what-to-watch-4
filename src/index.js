import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import reducer from './reducer/reducer.js';
import thunk from 'redux-thunk';
import createAPI from './api.js';
import {ActionCreator} from './reducer/user/user.js';
import {AuthorizationStatus} from "./const.js";
import {Operation as DataOperation} from './reducer/data/data.js';

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadFilms());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

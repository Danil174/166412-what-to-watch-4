import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from "react-redux";
import App from "./components/app/app.connect.js";
import reducer from './reducer/reducer.js';
import thunk from 'redux-thunk';
import createAPI from './api.js';
import {ActionCreator} from './reducer/user/user.js';
import {AuthorizationStatus} from "./const.js";
import {Operation as DataFilms} from './reducer/films/films.js';
import {Operation as DataOperation} from './reducer/data/data.js';
import {Operation as UserOperation} from './reducer/user/user.js';

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

store.dispatch(DataFilms.loadFilms());
store.dispatch(DataOperation.loadPromo());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);

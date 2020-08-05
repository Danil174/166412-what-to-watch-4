import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";
import UserList from "./my-list.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {AuthorizationStatus} from "../../const.js";
import NameSpace from "../../reducer/name-space.js";

const mockStore = configureStore([]);

describe(`UserListTest`, () => {
  it(`render UserList`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {avatarUrl: `test.jpg`},
      },
    });
    const tree = renderer
      .create(
          <Router history={history}>
            <Provider store={store}>
              <UserList />
            </Provider>
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

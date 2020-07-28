import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../const.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

import {UserBlock} from "./user-block.jsx";

const mockStore = configureStore([]);

const userData = {avatarUrl: `test.jpg`};

describe(`UserBlock`, () => {
  it(`render UserBlock`, () => {
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
              <UserBlock
                authorizationStatus={`AUTH`}
                userData={userData}
              />
            </Provider>
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

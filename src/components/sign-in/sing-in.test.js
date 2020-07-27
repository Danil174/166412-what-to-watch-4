import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../const.js";
import {Provider} from "react-redux";

import SignIn from "./sign-in.jsx";

const mockStore = configureStore([]);

describe(`SignInTest`, () => {
  it(`render SignIn`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {avatarUrl: `test.jpg`},
        loginError: false
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <SignIn
              onFormSubmit={()=>{}}
              loginError={false}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

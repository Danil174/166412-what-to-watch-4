import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {AuthorizationStatus} from "../../const.js";

import {UserBlock} from "./user-block.jsx";

const mockStore = configureStore([]);

describe(`UserBlock`, () => {
  it(`render UserBlock`, () => {
    const store = mockStore({
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });
    const tree = renderer
      .create(
          <Provider store={store}>
            <UserBlock
              authorizationStatus={`AUTH`}
            />
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";

import UserBlock from "./user-block.jsx";

const userData = {avatarUrl: `test.jpg`};

describe(`UserBlock`, () => {
  it(`render UserBlock`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <UserBlock
              authorizationStatus={`AUTH`}
              userData={userData}
            />
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

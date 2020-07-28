import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";

import Avatar from "./avatar.jsx";

const url = `test.jpg`;

describe(`Avatar`, () => {
  it(`render Avatar`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Avatar url={url}/>
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";
import Logo from "./logo.jsx";

describe(`LogoTest`, () => {
  it(`render Logo`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Logo isLight={false} />
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

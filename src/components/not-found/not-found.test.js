import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import NotFound from "./not-found.jsx";
import history from "../../history.js";

describe(`NotFound`, () => {
  it(`render NotFound`, () => {
    const tree = renderer
      .create(
          <Router
            history={history}
          >
            <NotFound />
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

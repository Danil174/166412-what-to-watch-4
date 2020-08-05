import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";
import Footer from "./footer.jsx";

describe(`FooterTest`, () => {
  it(`render Footer`, () => {
    const tree = renderer
      .create(
          <Router history={history}>
            <Footer/>
          </Router>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

import React from "react";
import renderer from "react-test-renderer";
import SignIn from "./sign-in.jsx.js";

describe(`SingInTest`, () => {
  it(`render SingIn`, () => {
    const tree = renderer
      .create(
          <SignIn />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

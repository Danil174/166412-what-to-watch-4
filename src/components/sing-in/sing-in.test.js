import React from "react";
import renderer from "react-test-renderer";
import SingIn from "./sing-in.jsx";

describe(`SingInTest`, () => {
  it(`render SingIn`, () => {
    const tree = renderer
      .create(
          <SingIn />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

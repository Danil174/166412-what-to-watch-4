
import React from "react";
import renderer from "react-test-renderer";

import ShowMoreBtn from "./show-more-btn.jsx";

describe(`ShowMoreBtnTest`, () => {
  it(`render ShowMoreBtn`, () => {

    const tree = renderer
      .create(
          <ShowMoreBtn
            onMouseClick={() => {}}
          />
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

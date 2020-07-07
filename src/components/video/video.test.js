import React from "react";
import renderer from "react-test-renderer";
import Video from "./video.jsx";

describe(`TestVideoComponent`, () => {
  it(`render Video component`, () => {
    const tree = renderer
      .create(
          <Video>
            <video></video>
          </Video>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

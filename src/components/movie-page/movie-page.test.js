import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";

describe(`MoviePageTest`, () => {
  it(`render MoviePage`, () => {
    const tree = renderer
      .create(
          <MoviePage />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

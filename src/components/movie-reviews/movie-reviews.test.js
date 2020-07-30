import React from "react";
import renderer from "react-test-renderer";
import MovieReviews from "./movie-reviews.jsx";

describe(`MovieReviewsTest`, () => {
  it(`render MovieReviews`, () => {
    const tree = renderer
      .create(
          <MovieReviews />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

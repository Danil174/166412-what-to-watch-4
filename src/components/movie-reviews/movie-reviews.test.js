import React from "react";
import renderer from "react-test-renderer";
import MovieReviews from "./movie-reviews.jsx";

const fakeComments = [
  {
    commentID: 1,
    date: new Date(),
    rating: 5.5,
    text: `test test`,
    userID: 55,
    userName: `Tom`,
  },
  {
    commentID: 45,
    date: new Date(),
    rating: 8,
    text: `test test`,
    userID: 11,
    userName: `Den`,
  },
];

describe(`MovieReviewsTest`, () => {
  it(`render MovieReviews`, () => {
    const tree = renderer
      .create(
          <MovieReviews
            comments={fakeComments}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

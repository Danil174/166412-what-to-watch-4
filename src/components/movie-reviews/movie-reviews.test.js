import React from "react";
import renderer from "react-test-renderer";
import MovieReviews from "./movie-reviews.jsx";

const fakeComments = [
  {
    commentID: 1,
    date: new Date(`Tue Aug 04 2020 19:44:32 GMT+0500 (Yekaterinburg Standard Time)`),
    rating: 5.5,
    text: `test test`,
    userID: 55,
    userName: `Tom`,
  },
  {
    commentID: 45,
    date: new Date(`Tue Aug 04 2020 19:44:32 GMT+0500 (Yekaterinburg Standard Time)`),
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
            componentMounted={()=>{}}
            componentUnmounted={()=>{}}
            comments={fakeComments}
          />
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

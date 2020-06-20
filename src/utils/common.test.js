import {getTextMovieRating} from "./common.js";
import {TextMovieRatings} from "../const.js";

const testCases = {
  BAD: 0,
  GOOD: 6,
  AWESOME: 10,
};

describe(`getTextMovieRating`, () => {
  it(`accordance text rating and numeric rating`, () => {
    expect(getTextMovieRating(testCases.BAD)).toBe(TextMovieRatings.BAD);
    expect(getTextMovieRating(testCases.GOOD)).toBe(TextMovieRatings.GOOD);
    expect(getTextMovieRating(testCases.AWESOME)).toBe(TextMovieRatings.AWESOME);
  });
});

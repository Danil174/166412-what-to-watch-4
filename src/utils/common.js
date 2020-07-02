import {TextMovieRatings} from "../const.js";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const getTextMovieRating = (raiting) => {
  switch (true) {
    case (raiting < 3):
      return TextMovieRatings.BAD;
    case (raiting < 5):
      return TextMovieRatings.NORMAL;
    case (raiting < 8):
      return TextMovieRatings.GOOD;
    case (raiting < 10):
      return TextMovieRatings.VERY_GOOD;
    default:
      return TextMovieRatings.AWESOME;
  }
};

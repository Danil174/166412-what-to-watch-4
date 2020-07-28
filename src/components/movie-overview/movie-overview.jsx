import React from "react";
import PropTypes from "prop-types";

import {getTextMovieRating} from "../../utils/common.js";

const MovieOverview = (props) => {
  const {film} = props;
  const {
    movieScore,
    ratingCount,
    synopsis,
    director,
    actors,
  } = film;

  const stringRating = (movieScore + ``).split(`.`).join(`,`);
  const actorsString = actors.join(`, `);
  const textRating = getTextMovieRating(movieScore);

  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{stringRating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{textRating}</span>
          <span className="movie-rating__count">{ratingCount} ratings</span>
        </p>
      </div>

      <div className="movie-card__text">
        {synopsis}

        <p className="movie-card__director"><strong>Director: {director}</strong></p>

        <p className="movie-card__starring"><strong>Starring: {actorsString} and other</strong></p>
      </div>
    </>
  );
};

MovieOverview.propTypes = {
  film: PropTypes.shape({
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    ratingCount: PropTypes.number.isRequired,
    synopsis: PropTypes.string.isRequired,
    movieScore: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieOverview;

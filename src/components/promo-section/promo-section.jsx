import React from "react";
import PropTypes from "prop-types";

import AddToList from "../add-to-list/add-to-list.jsx";

const PromoSection = (props) => {
  const {film} = props;
  const {title, genre, releaseDate, poster, isFavorite, id} = film;

  return (
    <div className="movie-card__wrap">
      <div className="movie-card__info">
        <div className="movie-card__poster">
          <img src={poster} alt={`${title} poster`} width="218" height="327" />
        </div>

        <div className="movie-card__desc">
          <h2 className="movie-card__title">{title}</h2>
          <p className="movie-card__meta">
            <span className="movie-card__genre">{genre}</span>
            <span className="movie-card__year">{releaseDate}</span>
          </p>

          <div className="movie-card__buttons">
            <button className="btn btn--play movie-card__button" type="button">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <AddToList
              id={id}
              isFavorite={isFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

PromoSection.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number,
    poster: PropTypes.string,
    title: PropTypes.string,
    genre: PropTypes.string,
    releaseDate: PropTypes.number,
    isFavorite: PropTypes.bool,
  }).isRequired
};

export default PromoSection;

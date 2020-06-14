import React from "react";
import PropTypes from "prop-types";

const Film = ({film, onFilmTitleClick}) => (
  <>
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src="img/aviator.jpg" alt={film} width="280" height="175" />
      </div>
      <h3
        onClick={onFilmTitleClick}
        className="small-movie-card__title"
      >
        <a className="small-movie-card__link" href="movie-page.html">{film}</a>
      </h3>
    </article>
  </>
);

Film.propTypes = {
  film: PropTypes.string.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
};

export default Film;

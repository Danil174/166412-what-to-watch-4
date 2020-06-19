import React from "react";
import PropTypes from "prop-types";

const SmallMovieCard = (props) => {
  const {film, onFilmTitleClick, onCardHoverHandler} = props;
  const {title, src} = film;

  return (
  <>
    <article className="small-movie-card catalog__movies-card" onMouseOver={onCardHoverHandler}>
      <div className="small-movie-card__image">
        <img
          src={src}
          alt={title}
          width="280"
          height="175"
        />
      </div>
      <h3
        onClick={onFilmTitleClick}
        className="small-movie-card__title"
      >
        <a className="small-movie-card__link" href="movie-page.html">{title}</a>
      </h3>
    </article>
  </>
  );
};

SmallMovieCard.propTypes = {
  onCardHoverHandler: PropTypes.func.isRequired,
  onFilmTitleClick: PropTypes.func.isRequired,
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
};

export default SmallMovieCard;

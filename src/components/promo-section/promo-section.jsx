import React from "react";
import PropTypes from "prop-types";
import {AppRoute, LoadErrorsTexts} from "../../const.js";
import history from "../../history.js";

import ErrorMessage from "../error-message/error-message.jsx";

import UserBlock from "../user-block/user-block.jsx";
import AddToList from "../add-to-list/add-to-list.jsx";

const PromoSection = (props) => {
  const {film, loadPromoError} = props;
  const {title, genre, releaseDate, poster, isFavorite, id, cover} = film;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={cover} alt={title} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <a className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="user-block">
          <UserBlock />
        </div>
      </header>
      {
        !loadPromoError && <div className="movie-card__wrap">
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
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => {
                    history.push(`${AppRoute.PLAYER_PAGE}/${id}`);
                  }}
                >
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
      }
      {
        loadPromoError && <ErrorMessage
          errorStatus={loadPromoError}
          errorMessage={LoadErrorsTexts.PROMO_FAIL}
        />
      }
    </section>
  );
};

PromoSection.propTypes = {
  loadPromoError: PropTypes.number,
  film: PropTypes.shape({
    id: PropTypes.number,
    poster: PropTypes.string,
    title: PropTypes.string,
    genre: PropTypes.string,
    releaseDate: PropTypes.number,
    isFavorite: PropTypes.bool,
    cover: PropTypes.string,
  }).isRequired
};

export default PromoSection;

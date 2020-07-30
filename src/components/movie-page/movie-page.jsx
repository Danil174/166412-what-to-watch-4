import React from "react";
import PropTypes from "prop-types";
import history from "../../history.js";
import {connect} from "react-redux";
import {getActiveMovieTab} from "../../reducer/app-state/selectors.js";
import {getFilms} from "../../reducer/data/selectors.js";
import {MovieTabs, MovieTabsMap, AppRoute, SIMILAR_LIST_LENGTH} from "../../const.js";

import UserBlock from "../user-block/user-block.jsx";
import AddToList from "../add-to-list/add-to-list.jsx";
import MovieNav from "../movie-nav/movie-nav.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import MoviesList from "../movies-list/movies-list.jsx";

const getSelectedTab = (tab, film) => {
  switch (tab) {
    case MovieTabsMap.OVERVIEW:
      return <MovieOverview film={film}/>;
    case (MovieTabsMap.DETAILS):
      return <MovieDetails film={film} />;
    case (MovieTabsMap.REVIEWS):
      return <MovieReviews />;
    default:
      return <>error</>;
  }
};

const MoviePage = (props) => {
  const {film, activeTab, films} = props;
  const {
    poster,
    cover,
    title,
    genre,
    releaseDate,
    isFavorite,
    bgColor,
    id,
  } = film;

  const similarFilms = films.filter((it) => it.genre === genre).slice(0, SIMILAR_LIST_LENGTH);

  const posterAlt = `${title} poster`;

  const sectionColor = {backgroundColor: bgColor};

  return (
  <>
    <section
      style={sectionColor}
      className="movie-card movie-card--full"
    >
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img
            src={cover}
            alt={title}
          />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <UserBlock />
          </div>
        </header>

        <div className="movie-card__wrap">
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
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img
              src={poster}
              alt={posterAlt}
              width="218"
              height="327"
            />
          </div>

          <div className="movie-card__desc">

            <MovieNav tabs={MovieTabs} />

            {getSelectedTab(activeTab, film)}
          </div>
        </div>
      </div>
    </section>

    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <MoviesList
          filmsList={similarFilms}
        />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="/" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  </>
  );
};

MoviePage.propTypes = {
  activeTab: PropTypes.string.isRequired,
  films: PropTypes.array.isRequired,
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    bgColor: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  })
};

const mapStateToProps = (state) => ({
  activeTab: getActiveMovieTab(state),
  films: getFilms(state),
});

export {MoviePage};
export default connect(mapStateToProps)(MoviePage);

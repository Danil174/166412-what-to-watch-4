import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getActiveMovieTab} from "../../reducer/app-state/selectors.js";
import {getFilms, getComments} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as DataOperation, ActionCreator} from '../../reducer/data/data.js';
import {MovieTabs, MovieTabsMap, AppRoute, SIMILAR_LIST_LENGTH, AuthorizationStatus} from "../../const.js";

import UserBlock from "../user-block/user-block.jsx";
import AddToList from "../add-to-list/add-to-list.jsx";
import MovieNav from "../movie-nav/movie-nav.jsx";
import MovieOverview from "../movie-overview/movie-overview.jsx";
import MovieDetails from "../movie-details/movie-details.jsx";
import MovieReviews from "../movie-reviews/movie-reviews.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import Footer from "../footer/footer.jsx";

const getSelectedTab = (tab, film, comments) => {
  switch (tab) {
    case MovieTabsMap.OVERVIEW:
      return <MovieOverview film={film}/>;
    case (MovieTabsMap.DETAILS):
      return <MovieDetails film={film} />;
    case (MovieTabsMap.REVIEWS):
      return <MovieReviews comments={comments} />;
    default:
      return <>error</>;
  }
};

class MoviePage extends PureComponent {
  componentDidMount() {
    const {componentMounted, film} = this.props;
    componentMounted(film.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.film.id !== this.props.film.id) {
      const {componentMounted, film} = this.props;
      componentMounted(film.id);
    }
  }

  componentWillUnmount() {
    this.props.componentUnmounted();
  }

  render() {
    const {film, activeTab, films, authorizationStatus, comments} = this.props;
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

    const isAuth = authorizationStatus === AuthorizationStatus.AUTH;

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

                <Link
                  to={`${AppRoute.PLAYER_PAGE}/${id}`}
                  className="btn btn--play movie-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </Link>

                <AddToList
                  id={id}
                  isFavorite={isFavorite}
                />
                {
                  isAuth &&
                  <Link
                    to={`${AppRoute.MOVIE_PAGE}/${id}${AppRoute.REVIEW}`}
                    className="btn movie-card__button"
                  >
                    Add review
                  </Link>
                }
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

              {getSelectedTab(activeTab, film, comments)}
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

        <Footer />
      </div>
    </>
    );
  }
}

MoviePage.propTypes = {
  comments: PropTypes.array.isRequired,
  componentMounted: PropTypes.func.isRequired,
  componentUnmounted: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
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
  comments: getComments(state),
  authorizationStatus: getAuthorizationStatus(state),
  activeTab: getActiveMovieTab(state),
  films: getFilms(state),
});


const mapDispatchToProps = (dispatch) => ({
  componentMounted(id) {
    dispatch(DataOperation.loadComments(id));
  },
  componentUnmounted() {
    dispatch(ActionCreator.deleteComments());
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);

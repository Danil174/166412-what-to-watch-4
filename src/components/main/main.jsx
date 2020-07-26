import React from "react";
import {connect} from "react-redux";
import {getloadFilmsError} from "../../reducer/data/selectors.js";
import PropTypes from "prop-types";

import {LoadErrorsTexts} from "../../const.js";
import ErrorMessage from "../error-message/error-message.jsx";
import PromoSection from "../promo-section/promo-section.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import UserBlock from "../user-block/user-block.jsx";

const Main = (props) => {
  const {filmsList, onGenreItemClick, genres, activeGenre, error, promoFilm, loadPromoError} = props;
  return (
    <>
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={promoFilm.cover} alt={promoFilm.title} />
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
        !loadPromoError && <PromoSection
          film={promoFilm}
        />
      }
      {
        loadPromoError && <ErrorMessage
          errorStatus={loadPromoError}
          errorMessage={LoadErrorsTexts.PROMO_FAIL}
        />
      }
    </section>
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenresList
          onGenreItemClick={onGenreItemClick}
          activeGenre={activeGenre}
          genres={genres}
        />

        <MoviesList
          loadFilmsError={error}
          filmsList={filmsList}
        />

        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
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

Main.propTypes = {
  error: PropTypes.number,
  loadPromoError: PropTypes.number,
  activeGenre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  onGenreItemClick: PropTypes.func.isRequired,
  filmsList: PropTypes.array.isRequired,
  promoFilm: PropTypes.shape({
    poster: PropTypes.string,
    cover: PropTypes.string,
    title: PropTypes.string,
    genre: PropTypes.string,
    releaseDate: PropTypes.number,
  }).isRequired
};

const mapStateToProps = (state) => ({
  error: getloadFilmsError(state)
});

export {Main};
export default connect(mapStateToProps)(Main);

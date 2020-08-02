import React from "react";
import {connect} from "react-redux";
import {getloadFilmsError} from "../../reducer/data/selectors.js";
import PropTypes from "prop-types";

import PromoSection from "../promo-section/promo-section.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import withShowMoreBtn from "../../hocs/with-show-more-btn/with-show-more-btn.js";
import Footer from "../footer/footer.jsx";

const MoviesListWrapper = withShowMoreBtn(MoviesList);

const Main = (props) => {
  const {filmsList, onGenreItemClick, genres, activeGenre, error, promoFilm, loadPromoError} = props;
  return (
    <>
    <PromoSection
      film={promoFilm}
      loadPromoError={loadPromoError}
    />
    <div className="page-content">
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <GenresList
          onGenreItemClick={onGenreItemClick}
          activeGenre={activeGenre}
          genres={genres}
        />

        <MoviesListWrapper
          loadFilmsError={error}
          filmsList={filmsList}
        />
      </section>

      <Footer />
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

import React from "react";
import {connect} from "react-redux";
import {getFilmsByGenre} from "../../reducer/data/selectors.js";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";

import NotFound from "../not-found/not-found.jsx";
import MoviePage from "../movie-page/movie-page.jsx";


const FilmRoot = (props) => {
  const {path, exact, films, computedMatch} = props;
  const filmID = computedMatch.params.id;

  const selectedFilm = films.find((film) => film.id === +filmID);

  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          selectedFilm !== undefined
            ? <MoviePage
              film={selectedFilm}
            />
            : <NotFound />
        );
      }}
    />
  );
};

FilmRoot.propTypes = {
  films: PropTypes.array.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  computedMatch: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  films: getFilmsByGenre(state),
});

export {FilmRoot};
export default connect(mapStateToProps)(FilmRoot);

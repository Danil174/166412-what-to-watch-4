import React from "react";
import {connect} from "react-redux";
import {getFilmsByGenre} from "../../reducer/data/selectors.js";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
import {AppRoute} from "../../const.js";

import NotFound from "../not-found/not-found.jsx";
import MoviePage from "../movie-page/movie-page.connect.js";
import PlayerPage from "../player-page/player-page.jsx";

import withPlayer from "../../hocs/with-player/with-player.js";
const PlayerPageWrapped = withPlayer(PlayerPage);


const renderPlayerOrPage = (path, film) => {
  const globalPath = path.replace(`/:id?`, ``);
  switch (globalPath) {
    case AppRoute.MOVIE_PAGE:
      return <MoviePage film={film} />;
    case AppRoute.PLAYER_PAGE:
      return <PlayerPageWrapped film={film} />;
    default:
      return <>error</>;
  }
};


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
            ? renderPlayerOrPage(path, selectedFilm)
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

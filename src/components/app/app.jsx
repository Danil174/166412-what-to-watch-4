import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/app-state/app-state.js';
import {getGenres, getFilmsByGenre, getPromoFilm, getloadPromoError} from "../../reducer/data/selectors.js";
import {getActiveGenre} from "../../reducer/app-state/selectors.js";
import PropTypes from "prop-types";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

import PrivateRoute from "../private-route/private-route.jsx";
import NotFound from "../not-found/not-found.jsx";
import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import UserList from "../user-list/user-list.jsx";
import FilmRoot from "../film-route/film-route.jsx";

class App extends PureComponent {

  _renderApp() {
    const {films, promoFilm, onGenreItemClick, genres, activeGenre, loadPromoError} = this.props;

    return (
      <Main
        promoFilm={promoFilm}
        loadPromoError={loadPromoError}
        filmsList={films}
        genres={genres}
        activeGenre={activeGenre}
        onGenreItemClick={onGenreItemClick}
      />
    );
  }

  render() {
    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderApp()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <SignIn />
          </Route>
          <FilmRoot
            exact
            path={`${AppRoute.MOVIE_PAGE}/:id?`}
          />
          <PrivateRoute
            exact
            path={AppRoute.FAVORITES}
            render={() => {
              return (
                <UserList />
              );
            }}
          />
          <Route
            render={() => (
              <NotFound />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  onGenreItemClick: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired,
  loadPromoError: PropTypes.number,
  promoFilm: PropTypes.shape({
    poster: PropTypes.string,
    cover: PropTypes.string,
    title: PropTypes.string,
    genre: PropTypes.string,
    releaseDate: PropTypes.number,
  }).isRequired
};

const mapStateToProps = (state) => ({
  activeGenre: getActiveGenre(state),
  films: getFilmsByGenre(state),
  genres: getGenres(state),
  promoFilm: getPromoFilm(state),
  loadPromoError: getloadPromoError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreItemClick(genre) {
    dispatch(ActionCreator.changeFilter(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

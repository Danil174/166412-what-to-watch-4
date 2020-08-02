import React, {PureComponent} from "react";
import {Switch, Route, Router, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/app-state/app-state.js';
import {getGenres, getFilmsByGenre, getPromoFilm, getloadPromoError} from "../../reducer/data/selectors.js";
import {getActiveGenre} from "../../reducer/app-state/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import PropTypes from "prop-types";
import history from "../../history.js";
import {AuthorizationStatus, AppRoute} from "../../const.js";

import PrivateRoute from "../private-route/private-route.jsx";
import NotFound from "../not-found/not-found.jsx";
import Main from "../main/main.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import UserList from "../user-list/user-list.jsx";
import FilmRout from "../film-route/film-route.jsx";
import AddReview from "../add-review/add-review.jsx";

class App extends PureComponent {

  componentDidMount() {
    this.props.loadFilms();
    this.props.loadPromo();
    this.props.checkAuthStatus();
  }

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
    const {authorizationStatus} = this.props;
    const isAuth = authorizationStatus === AuthorizationStatus.AUTH;
    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this._renderApp()}
          </Route>
          <Route
            exact path={AppRoute.LOGIN}
            render = {() => isAuth
              ? <Redirect to={AppRoute.ROOT} />
              : <SignIn />
            }
          />
          <PrivateRoute
            exact
            path={`${AppRoute.REVIEW}/:id?`}
            render={() => {
              return (
                <AddReview />
              );
            }}
          />
          <FilmRout
            exact
            path={`${AppRoute.MOVIE_PAGE}/:id?`}
          />
          <FilmRout
            exact
            path={`${AppRoute.PLAYER_PAGE}/:id?`}
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
  authorizationStatus: PropTypes.string.isRequired,
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
  }).isRequired,
  loadFilms: PropTypes.func.isRequired,
  loadPromo: PropTypes.func.isRequired,
  checkAuthStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeGenre: getActiveGenre(state),
  films: getFilmsByGenre(state),
  genres: getGenres(state),
  promoFilm: getPromoFilm(state),
  loadPromoError: getloadPromoError(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreItemClick(genre) {
    dispatch(ActionCreator.changeFilter(genre));
  },
  loadFilms() {
    dispatch(DataOperation.loadFilms());
  },
  loadPromo() {
    dispatch(DataOperation.loadPromo());
  },
  checkAuthStatus() {
    dispatch(UserOperation.checkAuth());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

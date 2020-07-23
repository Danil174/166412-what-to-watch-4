import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/app-state/app-state.js';
import {getGenres, getFilmsByGenre, getPromoFilm, getloadPromoError} from "../../reducer/data/selectors.js";
import {getActiveGenre, getSelectedFilmID} from "../../reducer/app-state/selectors.js";
import PropTypes from "prop-types";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

import PrivateRoute from "../private-route/private-route.jsx";
import NotFound from "../not-found/not-found.jsx";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import UserList from "../user-list/user-list.jsx";
import FilmRoot from "../film-root/film-root.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: `main`,
    };

    this.changePage = this.changePage.bind(this);
  }

  changePage() {
    this.setState({
      page: `film`,
    });
  }

  _renderApp() {
    const {page} = this.state;
    const {films, promoFilm, selectedFilmID, onGenreItemClick, genres, activeGenre, loadPromoError} = this.props;

    switch (page) {
      case `main`:
        return (
          <Main
            promoFilm={promoFilm}
            loadPromoError={loadPromoError}
            filmsList={films}
            genres={genres}
            activeGenre={activeGenre}
            onTitleOrImgClickHandler={this.changePage}
            onGenreItemClick={onGenreItemClick}
          />
        );
      case `film`:
        const index = films.findIndex((film) => film.id === selectedFilmID);
        const selectedFilm = films[index];

        return (
          <MoviePage
            film={selectedFilm}
          />
        );
    }

    return null;
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
  selectedFilmID: PropTypes.number,
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
  selectedFilmID: getSelectedFilmID(state),
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

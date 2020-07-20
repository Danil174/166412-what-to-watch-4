import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/data/data.js';
import {getFilms, getActiveGenre, getSelectedFilm, getGenres} from "../../reducer/data/selectors.js";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

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
    const {films, selectedFilm, onGenreItemClick, genres, activeGenre} = this.props;

    console.log(films);

    switch (page) {
      case `main`:
        return (
          <Main
            filmsList={films}
            genres={genres}
            activeGenre={activeGenre}
            onTitleOrImgClickHandler={this.changePage}
            onGenreItemClick={onGenreItemClick}
          />
        );
      case `film`:
        return (
          <MoviePage
            film={selectedFilm}
          />
        );
    }

    return null;
  }

  render() {
    const {selectedFilm} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage
              film = {selectedFilm}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  onGenreItemClick: PropTypes.func.isRequired,
  films: PropTypes.array.isRequired,
  selectedFilm: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    synopsis: PropTypes.arrayOf(PropTypes.string).isRequired,
    movieScore: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

const mapStateToProps = (state) => ({
  selectedFilm: getSelectedFilm(state),
  activeGenre: getActiveGenre(state),
  films: getFilms(state),
  genres: getGenres(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreItemClick(genre) {
    dispatch(ActionCreator.getFilmsByGenre(genre));
    dispatch(ActionCreator.changeFilter(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

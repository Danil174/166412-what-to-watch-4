import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from '../../reducer/data/data.js';
import {getActiveGenre, getSelectedFilmID, getGenres, getFilmsByGenre} from "../../reducer/data/selectors.js";
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
    const {films, selectedFilmID, onGenreItemClick, genres, activeGenre} = this.props;

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
        const index = films.findIndex((film) => film.id === selectedFilmID);
        const selectedFilmtest = films[index];

        return (
          <MoviePage
            film={selectedFilmtest}
          />
        );
    }

    return null;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          {/* <Route exact path="/dev-film">
            <MoviePage
              film = {}
            />
          </Route> */}
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
  selectedFilmID: PropTypes.number,
};

const mapStateToProps = (state) => ({
  selectedFilmID: getSelectedFilmID(state),
  activeGenre: getActiveGenre(state),
  films: getFilmsByGenre(state),
  genres: getGenres(state),
});

const mapDispatchToProps = (dispatch) => ({
  onGenreItemClick(genre) {
    dispatch(ActionCreator.changeFilter(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

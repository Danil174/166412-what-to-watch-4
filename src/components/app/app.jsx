import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
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
    const {films, film} = this.props;

    switch (page) {
      case `main`:
        return (
          <Main
            filmsList = {films}
            onTitleOrImgClickHandler={this.changePage}
          />
        );
      case `film`:
        return (
          <MoviePage
            film={film}
          />
        );
    }

    return null;
  }

  render() {
    const {film} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage
              film = {film}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  films: PropTypes.array.isRequired,
  film: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    movieTitle: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    synopsis: PropTypes.arrayOf(PropTypes.string).isRequired,
    movieScore: PropTypes.number.isRequired,
    ratingCount: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  films: state.films,
  film: state.film
});

// const mapDispatchToProps = (dispatch) => ({
//   onWelcomeButtonClick() {
//     dispatch(ActionCreator.incrementStep());
//   },
//   onUserAnswer(question, answer) {
//     dispatch(ActionCreator.incrementMistake(question, answer));
//     dispatch(ActionCreator.incrementStep());
//   },
// });

export {App};
export default connect(mapStateToProps)(App);

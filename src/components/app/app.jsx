import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

  }

  _renderApp() {
    const {releaseDate, filmGenre, films} = this.props;

    return (
      <Main
        date={releaseDate}
        genre={filmGenre}
        filmsList = {films}
      />
    );
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  releaseDate: PropTypes.number.isRequired,
  filmGenre: PropTypes.string.isRequired,
  films: PropTypes.array.isRequired,
};


export default App;

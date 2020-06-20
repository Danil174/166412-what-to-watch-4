import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Main from "../main/main.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

  }

  render() {
    const {releaseDate, filmGenre, films} = this.props;

    return (
      <Main
        date={releaseDate}
        genre={filmGenre}
        filmsList = {films}
      />
    );
  }
}

App.propTypes = {
  releaseDate: PropTypes.number.isRequired,
  filmGenre: PropTypes.string.isRequired,
  films: PropTypes.array.isRequired,
};


export default App;
